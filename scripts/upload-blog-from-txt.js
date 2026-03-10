#!/usr/bin/env node
/**
 * Parse TXT blog files and upload to Sanity
 *
 * Usage:
 *   node scripts/upload-blog-from-txt.js content/meditation.txt
 *   node scripts/upload-blog-from-txt.js content/*.txt
 *   node scripts/upload-blog-from-txt.js --dir content
 *
 * No AI APIs needed. Write or generate TXT in the format (see scripts/blog-format.txt).
 * Images: upload manually in Sanity Studio.
 *
 * Env: SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID), SANITY_DATASET, SANITY_API_TOKEN
 */

const fs = require("fs");
const path = require("path");

// Enable Sanity client debug logs (must be set before @sanity/client is required)
if (process.argv.includes("--debug")) {
  process.env.DEBUG = process.env.DEBUG ? `${process.env.DEBUG},sanity*` : "sanity*";
  console.log("Debug mode: sanity*");
}

function parseFrontmatter(lines) {
  const meta = {};
  for (const line of lines) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) meta[m[1].toLowerCase()] = m[2].trim();
  }
  return meta;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseBody(lines) {
  const blocks = [];
  let i = 0;
  let keyIdx = 0;

  function makeKey() {
    return `b${++keyIdx}`;
  }

  function addBlock(block) {
    if (block) blocks.push(block);
  }

  while (i < lines.length) {
    const line = lines[i];

    // Divider: --- (in body)
    if (line.trim() === "---") {
      addBlock({ _type: "divider", _key: makeKey(), style: "dots" });
      i++;
      continue;
    }

    // Heading ## or ###
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) {
      addBlock({
        _type: "block",
        _key: makeKey(),
        style: "h2",
        children: [{ _type: "span", _key: makeKey(), text: h2[1].trim(), marks: [] }],
        markDefs: [],
      });
      i++;
      continue;
    }
    if (h3) {
      addBlock({
        _type: "block",
        _key: makeKey(),
        style: "h3",
        children: [{ _type: "span", _key: makeKey(), text: h3[1].trim(), marks: [] }],
        markDefs: [],
      });
      i++;
      continue;
    }

    // Quote: > line(s), optional > — Author
    if (line.startsWith(">")) {
      const quoteLines = [];
      let cite = "";
      while (i < lines.length && lines[i].startsWith(">")) {
        const t = lines[i].slice(1).trim();
        const citeMatch = t.match(/^—\s*(.+)$/);
        if (citeMatch && quoteLines.length > 0) {
          cite = citeMatch[1];
        } else if (t) {
          quoteLines.push(t);
        }
        i++;
      }
      addBlock({
        _type: "quote",
        _key: makeKey(),
        text: quoteLines.join(" "),
        cite: cite || undefined,
      });
      continue;
    }

    // Callout: ::callout icon=X title=Y ... ::end
    const calloutStart = line.match(/^::callout\s+icon=["']?([^"'\s]+)["']?\s+title=["']?([^"']*)["']?$/);
    if (calloutStart) {
      const contentLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("::end")) {
        contentLines.push(lines[i]);
        i++;
      }
      if (lines[i]?.trim().startsWith("::end")) i++;
      addBlock({
        _type: "callout",
        _key: makeKey(),
        icon: calloutStart[1],
        title: calloutStart[2],
        text: contentLines.join("\n").trim(),
      });
      continue;
    }

    // Paragraph(s) - collect until blank or special
    const paraLines = [];
    while (i < lines.length) {
      const l = lines[i];
      if (l.trim() === "" || l.startsWith(">") || l.startsWith("##") || l.startsWith("###") || l.trim() === "---" || l.trim().startsWith("::callout")) break;
      paraLines.push(l);
      i++;
    }
    if (paraLines.length > 0) {
      const text = paraLines.join("\n").trim();
      if (text) {
        addBlock({
          _type: "block",
          _key: makeKey(),
          style: "normal",
          children: [{ _type: "span", _key: makeKey(), text, marks: [] }],
          markDefs: [],
        });
      }
    }
  }

  return blocks;
}

function parseTxt(content) {
  const parts = content.split(/\n---\n/);
  if (parts.length < 2) throw new Error("Invalid format: need --- frontmatter --- and body");

  const frontLines = parts[0].replace(/^---\n?/, "").split("\n");
  const bodyLines = parts.slice(1).join("\n---\n").split("\n"); // rejoin in case --- was in body

  const meta = parseFrontmatter(frontLines);
  const body = parseBody(bodyLines);

  return { meta, body };
}

async function main() {
  const args = process.argv.slice(2);
  let files = [];

  // --debug: enable Sanity client logging (DEBUG=sanity*)
  if (args.includes("--debug")) {
    process.env.DEBUG = process.env.DEBUG ? `${process.env.DEBUG},sanity*` : "sanity*";
    console.log("Debug mode: sanity*");
  }
  const filteredArgs = args.filter((a) => a !== "--debug");

  if (filteredArgs[0] === "--dir" && filteredArgs[1]) {
    const dir = path.resolve(process.cwd(), filteredArgs[1]);
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    files = entries
      .filter((e) => e.isFile() && e.name.endsWith(".txt"))
      .map((e) => path.join(dir, e.name));
  } else {
    files = filteredArgs
      .filter((f) => f.endsWith(".txt"))
      .map((f) => path.resolve(process.cwd(), f));
  }

  if (files.length === 0) {
    console.log(`
Usage:
  node scripts/upload-blog-from-txt.js content/meditation.txt
  node scripts/upload-blog-from-txt.js content/*.txt
  node scripts/upload-blog-from-txt.js --dir content
  node scripts/upload-blog-from-txt.js --debug content/meditation.txt   # with Sanity client logs

Format: See scripts/blog-format.txt

Env: SANITY_PROJECT_ID, SANITY_DATASET (default: production), SANITY_API_TOKEN
`);
    process.exit(1);
  }

  const sanityProjectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const sanityDataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const sanityToken = process.env.SANITY_API_TOKEN;

  if (!sanityProjectId || !sanityToken) {
    console.error("Missing: SANITY_PROJECT_ID and SANITY_API_TOKEN");
    process.exit(1);
  }

  const { createClient } = require("@sanity/client");
  const sanity = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: "2024-01-01",
    token: sanityToken,
    useCdn: false,
  });

  // Timeout wrapper — mutations can hang without one
  const MUTATION_TIMEOUT_MS = 30000;
  const withTimeout = (promise, ms, label) =>
    Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`${label || "Request"} timed out after ${ms / 1000}s. Check network and SANITY_API_TOKEN.`)), ms)
      ),
    ]);

  // Pre-flight: verify auth and connectivity (per sanity.io/docs/content-lake/http-auth)
  console.log("Verifying Sanity connection...");
  try {
    await withTimeout(
      sanity.fetch("count(*[_type == 'post'][0...1])"),
      MUTATION_TIMEOUT_MS,
      "Auth check"
    );
    console.log("  ✓ Connected to Sanity");
  } catch (err) {
    if (err.message.includes("timed out")) {
      console.error("  ✗ Connection timed out. Check:");
      console.error("    - SANITY_API_TOKEN is set and valid (Editor/Developer role)");
      console.error("    - Project ID and dataset are correct");
      console.error("    - Network/firewall allows api.sanity.io");
    } else {
      console.error("  ✗ Auth/connection failed:", err.message);
    }
    process.exit(1);
  }

  const GRADIENTS = ["meditation", "third-eye", "kundalini", "soul"];
  const ICONS = ["🧘", "🔮", "🐍", "✨", "💎", "🌟", "🕉️", "🌙", "📿"];

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.error(`  ✗ Not found: ${filePath}`);
      continue;
    }

    console.log(`\nProcessing: ${path.basename(filePath)}`);

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const { meta, body } = parseTxt(content);

      const slug = meta.slug || slugify(meta.title || path.basename(filePath, ".txt"));
      const doc = {
        _type: "post",
        _id: `post-${slug}`,
        title: meta.title || slug,
        slug: { _type: "slug", current: slug },
        excerpt: meta.excerpt || "",
        category: meta.category || "Spiritual",
        date: meta.date || new Date().toISOString().slice(0, 10),
        readTime: meta.readtime || meta.read_time || "8 min read",
        gradient: meta.gradient || GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
        icon: meta.icon || ICONS[Math.floor(Math.random() * ICONS.length)],
        heroBg: meta.herobg || meta.hero_bg || "meditation",
        body,
      };

      await withTimeout(sanity.createOrReplace(doc), MUTATION_TIMEOUT_MS, "Mutation");
      console.log(`  ✓ Uploaded: ${doc.title} → /blog/${slug}`);
    } catch (err) {
      console.error(`  ✗ Failed:`, err.message);
    }
  }

  console.log("\nDone.");
}

main();
