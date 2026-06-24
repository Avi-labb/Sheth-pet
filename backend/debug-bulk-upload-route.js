import fs from 'fs';
import path from 'path';

// Debug middleware to log all incoming files and fields
export const debugBulkUpload = (req, res, next) => {
    console.log('\n========== [DEBUG] Bulk Upload Request Received ==========');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    if (req.files) {
        console.log('Files (req.files):');
        if (Array.isArray(req.files)) {
            console.log(`  - Array of ${req.files.length} files:`);
            req.files.forEach((file, i) => {
                console.log(`    [${i}]`, JSON.stringify({
                    fieldname: file.fieldname,
                    originalname: file.originalname,
                    encoding: file.encoding,
                    mimetype: file.mimetype,
                    size: file.size,
                    destination: file.destination,
                    filename: file.filename,
                    path: file.path
                }, null, 4));
            });
        } else {
            Object.keys(req.files).forEach(key => {
                const files = req.files[key];
                console.log(`  - ${key}: ${files.length} files`);
                files.forEach((file, i) => {
                    console.log(`    [${i}]`, JSON.stringify({
                        fieldname: file.fieldname,
                        originalname: file.originalname,
                        encoding: file.encoding,
                        mimetype: file.mimetype,
                        size: file.size,
                        destination: file.destination,
                        filename: file.filename,
                        path: file.path
                    }, null, 4));
                });
            });
        }
    } else {
        console.log('Files: none');
    }
    console.log('==========================================================\n');
    
    next();
};
