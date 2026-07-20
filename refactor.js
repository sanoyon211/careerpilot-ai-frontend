const fs = require('fs');
const path = require('path');

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Background and borders
    content = content.replace(/bg-\[#F4F7FE\]/g, 'bg-[#FAFAFA]');
    content = content.replace(/border-\[#E2E8F0\]/g, 'border-[#E5E7EB]');
    
    // Remove shadow classes
    content = content.replace(/\bshadow-(subtle|xs|sm|md|lg|xl|2xl|2xs|none|inner|purple-\d+\/\d+|blue-\d+\/\d+|indigo-\d+\/\d+|emerald-\d+\/\d+|red-\d+\/\d+)\b/g, '');
    
    // Fix double spaces
    content = content.replace(/ +/g, ' ');
    // Fix space before closing quote
    content = content.replace(/ \"/g, '\"');
    // Fix space before closing bracket
    content = content.replace(/ }/g, '}');
    
    fs.writeFileSync(filepath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walkDir(filepath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
            processFile(filepath);
        }
    }
}

walkDir(path.join(__dirname, 'src'));
console.log('Refactoring complete.');
