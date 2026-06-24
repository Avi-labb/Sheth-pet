import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

console.log('\n========== [CHECK] Uploads Directory ==========');
console.log('Uploads directory path:', uploadsDir);

if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    console.log(`\nFiles in uploads directory:');
    files.forEach((file, i) => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        console.log(`  [${i}] ${file} (${(stats.size / 1024} KB) - ${stats.isDirectory() ? 'directory' : 'file'})`);
    });
    console.log(`\nTotal files count: ${files.length}`);
} else {
    console.log('Uploads directory does NOT exist!');
}
console.log('===========================================\n');

// Test image URL check
console.log('\n========== [CHECK] Product Model Check ==========');
console.log('Checking productModule.js path:', path.join(__dirname, 'models', 'productModule.js'));
console.log('=============================================\n');
