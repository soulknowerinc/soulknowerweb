#!/usr/bin/env node
/**
 * Convert images to WebP format.
 *
 * Usage:
 *   node scripts/convert-to-webp.js image.jpg
 *   node scripts/convert-to-webp.js image1.png image2.jpg
 *   node scripts/convert-to-webp.js --dir ~/Photos
 *   node scripts/convert-to-webp.js --dir ./images --quality 90 --width 1920 --height 1080
 *   node scripts/convert-to-webp.js --dir ./images --outdir ./webp
 *
 * Options:
 *   --dir <path>      Convert all images in a directory
 *   --outdir <path>   Output directory (default: same folder as source, or ./webp for --dir)
 *   --quality <n>     WebP quality 1-100 (default: 82)
 *   --width <n>       Resize width in pixels (default: no resize)
 *   --height <n>      Resize height in pixels (default: no resize)
 *   --replace         Replace original files after conversion
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".tif", ".gif"];

function expandHome(p) {
  if (p.startsWith("~/")) return path.join(os.homedir(), p.slice(2));
  return p;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { files: [], quality: 82, width: null, height: null, outdir: null, dir: null, replace: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--quality": case "-q": opts.quality = parseInt(args[++i], 10); break;
      case "--width":  case "-w": opts.width = parseInt(args[++i], 10); break;
      case "--height": case "-h": opts.height = parseInt(args[++i], 10); break;
      case "--outdir": case "-o": opts.outdir = expandHome(args[++i]); break;
      case "--dir":    case "-d": opts.dir = expandHome(args[++i]); break;
      case "--replace": case "-r": opts.replace = true; break;
      case "--help":
        console.log(USAGE);
        process.exit(0);
      default:
        if (!args[i].startsWith("-")) opts.files.push(expandHome(args[i]));
    }
  }

  // Collect files from --dir
  if (opts.dir) {
    const dirPath = path.resolve(opts.dir);
    if (!fs.existsSync(dirPath)) {
      console.error(`  ✗ Directory not found: ${dirPath}`);
      process.exit(1);
    }
    const dirFiles = fs.readdirSync(dirPath)
      .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
      .map((f) => path.join(dirPath, f));
    opts.files.push(...dirFiles);

    // Default outdir for --dir mode
    if (!opts.outdir) opts.outdir = path.join(dirPath, "webp");
  }

  return opts;
}

function convertToWebp(srcPath, outDir, quality, width, height) {
  const ext = path.extname(srcPath).toLowerCase();
  if (ext === ".webp") {
    // Already webp — just copy if outDir is different
    if (outDir) {
      const dest = path.join(outDir, path.basename(srcPath));
      fs.copyFileSync(srcPath, dest);
      return dest;
    }
    return srcPath;
  }

  const outName = path.basename(srcPath, ext) + ".webp";
  const outPath = outDir
    ? path.join(outDir, outName)
    : path.join(path.dirname(srcPath), outName);

  // Try cwebp first (better quality), fall back to macOS sips
  const resizeFlag = width && height ? `-resize ${width} ${height}` : "";

  try {
    execSync(`cwebp -q ${quality} ${resizeFlag} "${srcPath}" -o "${outPath}"`, { stdio: "pipe" });
    return outPath;
  } catch {
    // Fallback: macOS sips
    try {
      const sipsResize = width && height ? `-z ${height} ${width}` : "";
      execSync(`sips -s format webp ${sipsResize} "${srcPath}" --out "${outPath}"`, { stdio: "pipe" });
      return outPath;
    } catch (e) {
      throw new Error(
        `Conversion failed for "${path.basename(srcPath)}".\n` +
        `  Install cwebp for best results: brew install webp\n` +
        `  Error: ${e.message}`
      );
    }
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const USAGE = `
  WebP Image Converter
  ────────────────────

  Usage:
    node scripts/convert-to-webp.js <image> [<image2> ...]
    node scripts/convert-to-webp.js --dir <folder>

  Options:
    --dir, -d <path>     Convert all images in a directory
    --outdir, -o <path>  Output directory (default: same as source)
    --quality, -q <n>    Quality 1–100 (default: 82)
    --width, -w <n>      Resize width (requires --height)
    --height, -h <n>     Resize height (requires --width)
    --replace, -r        Delete original files after conversion
    --help               Show this help

  Supported formats: ${IMAGE_EXTS.join(", ")}

  Examples:
    node scripts/convert-to-webp.js photo.jpg
    node scripts/convert-to-webp.js --dir ~/Photos --quality 90
    node scripts/convert-to-webp.js --dir ./images --outdir ./webp --width 1376 --height 768
`;

function main() {
  const opts = parseArgs();

  if (opts.files.length === 0) {
    console.log(USAGE);
    process.exit(1);
  }

  // Validate resize options
  if ((opts.width && !opts.height) || (!opts.width && opts.height)) {
    console.error("  ✗ Both --width and --height must be specified together.");
    process.exit(1);
  }

  // Create output directory
  if (opts.outdir && !fs.existsSync(opts.outdir)) {
    fs.mkdirSync(opts.outdir, { recursive: true });
  }

  const resizeLabel = opts.width && opts.height ? ` → ${opts.width}×${opts.height}` : "";
  console.log(`\n  WebP Converter — quality: ${opts.quality}${resizeLabel}`);
  console.log(`  ${"─".repeat(44)}`);

  let converted = 0;
  let failed = 0;
  let totalSaved = 0;

  for (const file of opts.files) {
    const basename = path.basename(file);

    if (!fs.existsSync(file)) {
      console.log(`  ✗ Not found: ${basename}`);
      failed++;
      continue;
    }

    try {
      const srcSize = fs.statSync(file).size;
      process.stdout.write(`  ⟳ ${basename} (${formatSize(srcSize)})... `);

      const outPath = convertToWebp(file, opts.outdir, opts.quality, opts.width, opts.height);
      const outSize = fs.statSync(outPath).size;
      const saved = srcSize - outSize;
      const pct = srcSize > 0 ? ((saved / srcSize) * 100).toFixed(0) : 0;

      totalSaved += Math.max(saved, 0);

      if (opts.replace && path.extname(file).toLowerCase() !== ".webp") {
        fs.unlinkSync(file);
        console.log(`✓ ${formatSize(outSize)} (${pct}% smaller) — original deleted`);
      } else {
        console.log(`✓ ${formatSize(outSize)} (${pct}% smaller)`);
      }

      converted++;
    } catch (err) {
      console.log("✗");
      console.error(`     ${err.message}`);
      failed++;
    }
  }

  console.log(`\n  Done: ${converted} converted, ${failed} failed.`);
  if (totalSaved > 0) console.log(`  Total space saved: ${formatSize(totalSaved)}`);
  if (opts.outdir) console.log(`  Output: ${opts.outdir}`);
  console.log();
}

main();
