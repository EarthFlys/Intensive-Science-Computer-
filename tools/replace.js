const fs = require('fs');
let content = fs.readFileSync('style.css', 'utf-8');

// Replace dark background colors
content = content.replace(/rgba\(10,\s*10,\s*26,\s*0\.85\)/g, 'var(--bg-card)');
content = content.replace(/rgba\(10,\s*10,\s*26,\s*0\.95\)/g, 'var(--bg-card-hover)');
content = content.replace(/rgba\(10,\s*10,\s*26,\s*0\.9\)/g, 'rgba(18, 18, 23, 0.9)');
content = content.replace(/rgba\(15,\s*15,\s*35,\s*0\.95\)/g, 'rgba(28, 28, 35, 0.95)');

fs.writeFileSync('style.css', content, 'utf-8');
