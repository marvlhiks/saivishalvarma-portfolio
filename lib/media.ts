import fs from "node:fs";
import path from "node:path";

export type MediaFile = { src: string; caption: string };

const ROOT = path.join(process.cwd(), "public", "media");
const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Optional captions, keyed by filename. Anything not listed falls back to a
 * title made from the filename, so dropping a file in is enough on its own.
 */
const captions: Record<string, string> = {
  "01-clermont-ferrand.jpg": "Clermont-Ferrand at dusk, cathedral in volcanic stone",
  "02-lyon-saint-jean.jpg": "Saint-Jean, Vieux Lyon",
  "03-sncf-yard.jpg": "SNCF Réseau yard",
};

function titleFromFilename(file: string): string {
  return path
    .basename(file, path.extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function readDir(folder: string): string[] {
  try {
    return fs.readdirSync(path.join(ROOT, folder));
  } catch {
    // A missing folder is a normal state, not an error.
    return [];
  }
}

/**
 * Everything sitting in public/media/<folder> at build time.
 * Drop files in, they appear. No manifest to keep in sync.
 */
export function getMedia(folder: string): MediaFile[] {
  return readDir(folder)
    .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => ({
      src: `/media/${folder}/${f}`,
      caption: captions[f] ?? titleFromFilename(f),
    }));
}

/**
 * Lets a real image stand in for the drawn artwork: name the file after the
 * entry's key (rdr2.jpg, onepiece.png) and it wins over the SVG.
 */
export function getOverrides(folder: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const file of readDir(folder)) {
    const ext = path.extname(file).toLowerCase();
    if (!ALLOWED.has(ext)) continue;
    map[path.basename(file, ext).toLowerCase()] = `/media/${folder}/${file}`;
  }
  return map;
}

export const getPhotos = () => getMedia("photography");
