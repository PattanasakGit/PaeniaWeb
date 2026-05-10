#!/usr/bin/env node
/**
 * Generates WebP screenshots (max width 1920) and PNG favicons / touch icons from app-icon.png.
 * Run from repo root: node scripts/optimize-assets.mjs
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const paeniaDir = path.join(root, "public", "images", "paenia");
const webpDir = path.join(paeniaDir, "webp");
const iconsDir = path.join(root, "public", "icons");

const MAX_SCREENSHOT_W = 1920;
const WEBP_QUALITY = 86;

async function main() {
  await mkdir(webpDir, { recursive: true });
  await mkdir(iconsDir, { recursive: true });

  const files = await readdir(paeniaDir);
  const pngScreens = files.filter((f) => f.startsWith("screenshot-") && f.endsWith(".png"));

  for (const name of pngScreens) {
    const inPath = path.join(paeniaDir, name);
    const base = name.replace(/\.png$/i, "");
    const outPath = path.join(webpDir, `${base}.webp`);
    const img = sharp(inPath);
    const meta = await img.metadata();
    const w = meta.width ?? MAX_SCREENSHOT_W;
    const pipeline =
      w > MAX_SCREENSHOT_W
        ? img.resize({ width: MAX_SCREENSHOT_W, fit: "inside", withoutEnlargement: true })
        : img;
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outPath);
    const outMeta = await sharp(outPath).metadata();
    console.log("webp", path.relative(root, outPath), `${outMeta.width}x${outMeta.height}`);
  }

  const appIcon = path.join(paeniaDir, "app-icon.png");
  if (files.includes("app-icon.png")) {
    await sharp(appIcon)
      .resize(72, 72, { fit: "cover" })
      .webp({ quality: 90 })
      .toFile(path.join(webpDir, "app-icon-72.webp"));

    await sharp(appIcon).resize(16, 16).png().toFile(path.join(iconsDir, "favicon-16.png"));
    await sharp(appIcon).resize(32, 32).png().toFile(path.join(iconsDir, "favicon-32.png"));
    await sharp(appIcon).resize(180, 180, { fit: "cover" }).png().toFile(path.join(iconsDir, "apple-touch-icon.png"));
    await sharp(appIcon).resize(192, 192, { fit: "cover" }).png().toFile(path.join(iconsDir, "icon-192.png"));
    console.log("icons + app-icon-72.webp OK");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
