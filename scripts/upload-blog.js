#!/usr/bin/env node
/**
 * Upload blog posts from TXT files to Sanity via HTTP API.
 * Converts images to WebP and uploads them as cover images.
 *
 * Usage:
 *   node --env-file=.env.local scripts/upload-blog.js content/my-post.txt
 *   node --env-file=.env.local scripts/upload-blog.js --dir content
 *   node --env-file=.env.local scripts/upload-blog.js --dry content/my-post.txt
 *
 * Frontmatter "image:" field:
 *   image: /path/to/cover.jpg           (absolute path)
 *   image: ~/Documents/webp/photo.jpeg  (tilde expanded)
 *   image: cover.png                    (looked up in --imgdir, default ~/Documents/webp)
 *
 * Options:
 *   --dry          Preview JSON, no upload
 *   --dir <path>   Upload all .txt files in a directory
 *   --imgdir <path> Image search directory (default: ~/Documents/webp)
 *
 * Format: See scripts/blog-format.txt
 * Env:    NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

const API_VERSION = "2024-01-01";
const TIMEOUT_MS = 30000;

const PROJECT_ID =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const TOKEN = process.env.SANITY_API_TOKEN;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function die(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

function expandHome(p) {
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

// ─── IMAGE: CONVERT TO WEBP ───

function convertToWebp(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (ext === ".webp") return srcPath;

  const tmpDir = path.join(os.tmpdir(), "soulknower-webp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const outName = path.basename(srcPath, ext) + ".webp";
  const outPath = path.join(tmpDir, outName);

  try {
    execSync(`cwebp -q 82 -resize 1376 768 "${srcPath}" -o "${outPath}"`, {
      stdio: "pipe",
    });
    return outPath;
  } catch {
    try {
      execSync(
        `sips -s format webp -z 768 1376 "${srcPath}" --out "${outPath}"`,
        { stdio: "pipe" }
      );
      return outPath;
    } catch (e) {
      throw new Error(`Image conversion failed. Install cwebp: brew install webp\n${e.message}`);
    }
  }
}

// ─── IMAGE: UPLOAD TO SANITY ───

async function uploadImageToSanity(filePath) {
  const webpPath = convertToWebp(filePath);
  const fileName = path.basename(webpPath);
  const fileBuffer = fs.readFileSync(webpPath);

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}?filename=${encodeURIComponent(fileName)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "image/webp",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: fileBuffer,
      signal: controller.signal,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Image upload HTTP ${res.status}: ${data?.message || JSON.stringify(data)}`);
    }

    const asset = data.document;
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

// ─── RESOLVE IMAGE PATH ───

function resolveImagePath(rawPath, imgDir) {
  if (!rawPath) return null;

  const expanded = expandHome(rawPath.trim());

  if (path.isAbsolute(expanded) && fs.existsSync(expanded)) return expanded;

  const inImgDir = path.join(imgDir, expanded);
  if (fs.existsSync(inImgDir)) return inImgDir;

  const baseName = path.basename(expanded);
  const inImgDirBase = path.join(imgDir, baseName);
  if (fs.existsSync(inImgDirBase)) return inImgDirBase;

  return null;
}

// ─── FRONTMATTER PARSER ───

function parseFrontmatter(lines) {
  const meta = {};
  for (const line of lines) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) meta[m[1].toLowerCase()] = m[2].trim();
  }
  return meta;
}

// ─── BODY PARSER ───

function parseBody(lines) {
  const blocks = [];
  let i = 0;
  let k = 0;
  const key = () => `k${++k}`;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") { i++; continue; }

    if (line.trim() === "---" || line.trim() === "::divider::") {
      blocks.push({ _type: "divider", _key: key(), style: "dots" });
      i++; continue;
    }

    const h4 = line.match(/^####\s+(.+)$/);
    if (h4) {
      blocks.push({ _type: "block", _key: key(), style: "h4",
        children: [{ _type: "span", _key: key(), text: h4[1].trim(), marks: [] }], markDefs: [] });
      i++; continue;
    }
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      blocks.push({ _type: "block", _key: key(), style: "h3",
        children: [{ _type: "span", _key: key(), text: h3[1].trim(), marks: [] }], markDefs: [] });
      i++; continue;
    }
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      blocks.push({ _type: "block", _key: key(), style: "h2",
        children: [{ _type: "span", _key: key(), text: h2[1].trim(), marks: [] }], markDefs: [] });
      i++; continue;
    }

    if (line.startsWith(">")) {
      const quoteLines = [];
      let cite = "";
      while (i < lines.length && lines[i].startsWith(">")) {
        const t = lines[i].slice(1).trim();
        const cm = t.match(/^—\s*(.+)$/);
        if (cm && quoteLines.length > 0) cite = cm[1];
        else if (t) quoteLines.push(t);
        i++;
      }
      blocks.push({ _type: "quote", _key: key(), text: quoteLines.join(" "), ...(cite && { cite }) });
      continue;
    }

    const calloutMatch = line.match(/^::callout\s+icon=["']?([^"'\s]+)["']?\s+title=["']?(.+?)["']?\s*$/);
    if (calloutMatch) {
      const contentLines = [];
      i++;
      while (i < lines.length && !/^::(?:end)?\s*$/.test(lines[i].trim())) {
        contentLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++;
      blocks.push({ _type: "callout", _key: key(), icon: calloutMatch[1], title: calloutMatch[2], text: contentLines.join("\n").trim() });
      continue;
    }

    if (line.match(/^[-*]\s+/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        items.push(lines[i].replace(/^[-*]\s+/, "").trim());
        i++;
      }
      for (const item of items) {
        blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1,
          children: parseInlineMarks(item, key), markDefs: [] });
      }
      continue;
    }

    if (line.match(/^\d+\.\s+/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        items.push(lines[i].replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      for (const item of items) {
        blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "number", level: 1,
          children: parseInlineMarks(item, key), markDefs: [] });
      }
      continue;
    }

    const paraLines = [];
    while (i < lines.length) {
      const l = lines[i];
      if (
        l.trim() === "" || l.startsWith(">") || l.match(/^#{2,4}\s/) ||
        l.trim() === "---" || l.trim().startsWith("::") || l.match(/^[-*]\s+/) || l.match(/^\d+\.\s+/)
      ) break;
      paraLines.push(l);
      i++;
    }
    if (paraLines.length > 0) {
      const text = paraLines.join(" ").trim();
      if (text) {
        const children = parseInlineMarks(text, key);
        blocks.push({ _type: "block", _key: key(), style: "normal", children, markDefs: [] });
      }
    }
  }
  return blocks;
}

function parseInlineMarks(text, keyFn) {
  const children = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last)
      children.push({ _type: "span", _key: keyFn(), text: text.slice(last, match.index), marks: [] });
    if (match[2])
      children.push({ _type: "span", _key: keyFn(), text: match[2], marks: ["strong"] });
    else if (match[3])
      children.push({ _type: "span", _key: keyFn(), text: match[3], marks: ["em"] });
    last = match.index + match[0].length;
  }

  if (last < text.length)
    children.push({ _type: "span", _key: keyFn(), text: text.slice(last), marks: [] });
  if (children.length === 0)
    children.push({ _type: "span", _key: keyFn(), text, marks: [] });
  return children;
}

// ─── FILE → DOCUMENT ───

function txtToDocument(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const parts = content.split(/\n---\n/);
  if (parts.length < 2) throw new Error("Invalid format: need --- frontmatter --- then body");

  const frontLines = parts[0].replace(/^---\n?/, "").split("\n");
  const bodyText = parts.slice(1).join("\n---\n");
  const bodyLines = bodyText.split("\n");

  const meta = parseFrontmatter(frontLines);
  const body = parseBody(bodyLines);
  const slug = meta.slug || slugify(meta.title || path.basename(filePath, ".txt"));

  return {
    meta,
    slug,
    doc: {
      _type: "post",
      _id: `post-${slug}`,
      title: meta.title || slug,
      slug: { _type: "slug", current: slug },
      excerpt: meta.excerpt || "",
      category: meta.category || "Spiritual",
      date: meta.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: meta.readtime || meta.read_time || "8 min read",
      gradient: meta.gradient || "soul",
      icon: meta.icon || "✨",
      heroBg: meta.herobg || meta.hero_bg || "meditation",
      body,
    },
  };
}

// ─── SANITY HTTP API ───

async function sanityMutate(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify({ mutations }),
      signal: controller.signal,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${data?.error?.description || data?.message || JSON.stringify(data)}`);
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

async function sanityPing() {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent("count(*[_type=='post'])")}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, signal: controller.signal });
    if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(`HTTP ${res.status}: ${d?.message || "Auth failed"}`); }
    return (await res.json()).result;
  } finally { clearTimeout(timeout); }
}

// ─── IMAGE MATCHING ENGINE ───

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"];

function listImages(imgDir) {
  if (!fs.existsSync(imgDir)) return [];
  try {
    return fs.readdirSync(imgDir)
      .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
      .map((f) => ({
        file: f,
        fullPath: path.join(imgDir, f),
        name: path.basename(f, path.extname(f)).toLowerCase(),
        mtime: fs.statSync(path.join(imgDir, f)).mtimeMs,
      }))
      .sort((a, b) => a.mtime - b.mtime);
  } catch (err) {
    if (err.code === "EPERM" || err.code === "EACCES") {
      console.log(`  ⚠ Cannot read image folder "${imgDir}" — permission denied. Skipping images.`);
      return [];
    }
    throw err;
  }
}

function findImageForSlug(slug, images) {
  const s = slug.toLowerCase();
  return images.find((img) => img.name === s || img.name.includes(s) || s.includes(img.name)) || null;
}

/**
 * Auto-map unmatched images to unmatched blogs by modification time order.
 * Images sorted oldest→newest are paired with blogs in the order they appear.
 * Matched images are renamed to <slug>.<ext> in the imgdir for future runs.
 */
function autoMapImages(slugs, imgDir) {
  const images = listImages(imgDir);
  const mapping = {}; // slug → fullPath

  const unmatchedSlugs = [];

  for (const slug of slugs) {
    const match = findImageForSlug(slug, images);
    if (match) {
      mapping[slug] = match.fullPath;
      images.splice(images.indexOf(match), 1);
    } else {
      unmatchedSlugs.push(slug);
    }
  }

  if (unmatchedSlugs.length > 0 && images.length > 0) {
    const sortedRemaining = images.sort((a, b) => a.mtime - b.mtime);
    const pairCount = Math.min(unmatchedSlugs.length, sortedRemaining.length);

    console.log(`\n  Auto-mapping ${pairCount} image(s) by modification time:`);

    for (let i = 0; i < pairCount; i++) {
      const slug = unmatchedSlugs[i];
      const img = sortedRemaining[i];
      const ext = path.extname(img.file);
      const newName = `${slug}${ext}`;
      const newPath = path.join(imgDir, newName);

      console.log(`    ${img.file} → ${newName}`);

      fs.renameSync(img.fullPath, newPath);
      mapping[slug] = newPath;
    }
    console.log();
  }

  return mapping;
}

// ─── MAIN ───

async function main() {
  const args = process.argv.slice(2);
  const isDry = args.includes("--dry");

  let imgDir = expandHome("~/Documents/webp");
  const imgDirIdx = args.indexOf("--imgdir");
  if (imgDirIdx !== -1 && args[imgDirIdx + 1]) {
    imgDir = expandHome(args[imgDirIdx + 1]);
  }

  const flagArgs = ["--dry", "--imgdir"];
  const filtered = args.filter((a, i) => !flagArgs.includes(a) && (imgDirIdx === -1 || i !== imgDirIdx + 1));
  let files = [];

  if (filtered[0] === "--dir" && filtered[1]) {
    const dir = path.resolve(process.cwd(), filtered[1]);
    files = fs.readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith(".txt"))
      .map((e) => path.join(dir, e.name));
  } else {
    files = filtered.filter((f) => f.endsWith(".txt")).map((f) => path.resolve(process.cwd(), f));
  }

  if (files.length === 0) {
    console.log(`
  SoulKnower Blog Uploader (with auto image matching)
  ────────────────────────────────────────────────────
  Usage:
    node --env-file=.env.local scripts/upload-blog.js content/post.txt
    node --env-file=.env.local scripts/upload-blog.js --dir content
    node --env-file=.env.local scripts/upload-blog.js --dry content/post.txt
    node --env-file=.env.local scripts/upload-blog.js --imgdir ~/my-images content/post.txt

  Image matching (fully automatic):
    1. Frontmatter "image:" field → exact path
    2. Filename contains blog slug (or vice versa)
    3. Remaining unmatched images are paired with unmatched blogs
       by modification time (oldest image → first blog) and auto-renamed

  Just drop images in ~/Documents/webp with ANY name — the script handles the rest.

  Image conversion:
    Any format (jpg/png/bmp) → WebP (1376x768, quality 82) via cwebp

  Format: See scripts/blog-format.txt
  Env:    NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN
`);
    process.exit(1);
  }

  if (!PROJECT_ID || !TOKEN) die("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN");

  console.log(`  Image folder: ${imgDir}`);
  if (!fs.existsSync(imgDir)) console.log(`  ⚠ Image folder not found — images will be skipped`);

  // Parse all blog files first to get slugs
  const parsed = [];
  for (const f of files) {
    try {
      parsed.push({ filePath: f, ...txtToDocument(f) });
    } catch (err) {
      console.error(`  ✗ Parse error in ${path.basename(f)}: ${err.message}`);
    }
  }

  // Build image map: first from explicit frontmatter, then auto-match the rest
  const explicitMap = {};
  const needsAutoMatch = [];

  for (const p of parsed) {
    if (p.meta.image) {
      const resolved = resolveImagePath(p.meta.image, imgDir);
      if (resolved) { explicitMap[p.slug] = resolved; continue; }
    }
    needsAutoMatch.push(p.slug);
  }

  const autoMap = fs.existsSync(imgDir) ? autoMapImages(needsAutoMatch, imgDir) : {};
  const imageMap = { ...explicitMap, ...autoMap };

  if (isDry) {
    for (const p of parsed) {
      console.log(`\n── ${path.basename(p.filePath)} ──`);
      console.log(`  Title:  ${p.doc.title}`);
      console.log(`  Slug:   ${p.slug}`);
      console.log(`  Blocks: ${p.doc.body.length}`);
      console.log(`  Image:  ${imageMap[p.slug] || "(none)"}`);
    }
    process.exit(0);
  }

  process.stdout.write("  Connecting to Sanity... ");
  try {
    const count = await sanityPing();
    console.log(`✓ (${count} existing posts)`);
  } catch (err) {
    if (err.name === "AbortError") die("Connection timed out.");
    die(`Auth failed: ${err.message}`);
  }

  let success = 0, failed = 0;

  for (const p of parsed) {
    try {
      const imgPath = imageMap[p.slug];

      if (imgPath) {
        process.stdout.write(`  🖼  Converting "${path.basename(imgPath)}" → WebP... `);
        const imageRef = await uploadImageToSanity(imgPath);
        p.doc.image = imageRef;
        console.log("✓");
      } else {
        console.log(`  ⚠  No image for "${p.slug}" — skipping cover`);
      }

      process.stdout.write(`  ↑  "${p.doc.title}" (${p.doc.body.length} blocks)... `);
      await sanityMutate([{ createOrReplace: p.doc }]);
      console.log(`✓ /blog/${p.slug}`);
      success++;
    } catch (err) {
      console.log("✗");
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n  Done: ${success} uploaded, ${failed} failed.\n`);
}

main();
