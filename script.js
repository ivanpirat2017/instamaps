import fs from 'fs';
import path from 'path';

function getFiles(dir, formats, baseDir = dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(baseDir, filePath);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath, formats, baseDir));
        } else {
            if (formats.includes(path.extname(file))) {
                results.push({ relativePath, content: fs.readFileSync(filePath, 'utf8') });
            }
        }
    });
    return results;
}

function mergeFiles(directory, formats, outputFile) {
    const filesData = getFiles(directory, formats);
    const outputContent = filesData.map(file => `${file.relativePath}\n${file.content}\n`).join('\n');
    fs.writeFileSync(outputFile, outputContent, 'utf8');
    console.log(`Merged content written to ${outputFile}`);
}

// Example usage
const inputDir = process.argv[2]; // Path to directory passed as a command line argument
const formats = process.argv[3] ? process.argv[3].split(',') : ['.txt', '.js']; // File formats separated by comma
const outputFile = process.argv[4] || 'output.txt'; // Output file name

if (!inputDir) {
    console.log('Usage: node script.js <directory> <formats> <outputFile>');
    process.exit(1);
}

mergeFiles(inputDir, formats, outputFile);
