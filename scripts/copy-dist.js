import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

// Copy dist/index.html to root index.html
const distHtml = path.join(dist, 'index.html');
const rootHtml = path.join(root, 'index.html');
if (fs.existsSync(distHtml)) {
  fs.copyFileSync(distHtml, rootHtml);
  console.log('✓ Copied dist/index.html -> ./index.html');
}

// Copy dist/assets to root assets
const distAssets = path.join(dist, 'assets');
const rootAssets = path.join(root, 'assets');
if (fs.existsSync(distAssets)) {
  if (!fs.existsSync(rootAssets)) {
    fs.mkdirSync(rootAssets, { recursive: true });
  }
  fs.cpSync(distAssets, rootAssets, { recursive: true });
  console.log('✓ Copied dist/assets -> ./assets');
}

// Copy dist/favicon.svg to root favicon.svg if present
const distFavicon = path.join(dist, 'favicon.svg');
const rootFavicon = path.join(root, 'favicon.svg');
if (fs.existsSync(distFavicon)) {
  fs.copyFileSync(distFavicon, rootFavicon);
}

// Ensure .nojekyll in root
const rootNoJekyll = path.join(root, '.nojekyll');
fs.writeFileSync(rootNoJekyll, '');
console.log('✓ Verified ./.nojekyll');
