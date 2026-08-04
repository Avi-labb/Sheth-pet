import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '../client/dist');
const dest = path.resolve(__dirname, './dist');

if (!fs.existsSync(src)) {
  console.error('❌ client/dist not found. Run "npm run build:client" first.');
  process.exit(1);
}

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true });
}

fs.cpSync(src, dest, { recursive: true });
console.log('✅ dist copied to backend/dist successfully!');
