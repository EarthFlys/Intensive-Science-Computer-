const fs = require('fs');
let content = fs.readFileSync('teacher.css', 'utf-8');

// Hero section
content = content.replace(/linear-gradient\(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%\)/g, 'linear-gradient(135deg, var(--bg-deep) 0%, var(--bg-dark) 50%, var(--primary-dark) 100%)');
content = content.replace(/rgba\(218, 165, 32/g, 'rgba(43, 92, 255');
content = content.replace(/var\(--red\)/g, 'var(--accent-warm)');
content = content.replace(/#B8860B/g, 'var(--secondary)');
content = content.replace(/rgba\(139, 69, 19, 0\.1\)/g, 'var(--shadow)');
content = content.replace(/rgba\(139, 69, 19, 0\.2\)/g, 'var(--shadow-hover)');
content = content.replace(/background: white/g, 'background: var(--bg-card);\n    backdrop-filter: blur(10px)');
content = content.replace(/background: var\(--bg\)/g, 'background: var(--bg-deep)');
content = content.replace(/background: linear-gradient\(135deg, #f8f4f0 0%, #fff 100%\)/g, 'background: var(--bg-dark)');

fs.writeFileSync('teacher.css', content, 'utf-8');
