import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

fs.copyFileSync(path.join(root, 'index.source.html'), path.join(root, 'index.html'));
console.log('✓ Synced index.source.html -> index.html');
