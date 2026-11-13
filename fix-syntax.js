const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

content = content.replace(/\{showPromocion && m === 'Asgard' && \(\s*\{showPromocion && \(\s*<div className="absolute -top-2 -right-2 bg-\[#50C878\] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\s*<Gift className="w-3 h-3" \/>\s*<\/div>\s*\)\}\s*\)\}/g, 
  `{showPromocion && m === 'Asgard' && (\n  <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n    <Gift className="w-3 h-3" />\n  </div>\n)}`);

content = content.replace(/\{showPromocion && isAsgard && \(\s*\{showPromocion && \(\s*<div className="absolute -top-2 -right-2 bg-\[#50C878\] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\s*<Gift className="w-3 h-3" \/>\s*<\/div>\s*\)\}\s*\)\}/g,
  `{showPromocion && isAsgard && (\n  <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n    <Gift className="w-3 h-3" />\n  </div>\n)}`);

content = content.replace(/\{showMasPedido && t === 'Nogal' && \(\s*\{showMasPedido && \(\s*<div className="absolute -top-2 -right-2 bg-\[#E63946\] text-white p-1 rounded-full shadow-md z-[12]0 pointer-events-none">\s*<Heart className="w-3 h-3 fill-current" \/>\s*<\/div>\s*\)\}\s*\)\}/g,
  `{showMasPedido && t === 'Nogal' && (\n  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">\n    <Heart className="w-3 h-3 fill-current" />\n  </div>\n)}`);

content = content.replace(/\{showMasPedido && est === 'Bicolor Negro' && \(\s*\{showMasPedido && \(\s*<div className="absolute -top-2 -right-2 bg-\[#E63946\] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\s*<Heart className="w-3 h-3 fill-current" \/>\s*<\/div>\s*\)\}\s*\)\}/g,
  `{showMasPedido && est === 'Bicolor Negro' && (\n  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n    <Heart className="w-3 h-3 fill-current" />\n  </div>\n)}`);

content = content.replace(/\{showMasPedido && f === 'Mate' && \(\s*\{showMasPedido && \(\s*<div className="absolute -top-2 -right-2 bg-\[#E63946\] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\s*<Heart className="w-3 h-3 fill-current" \/>\s*<\/div>\s*\)\}\s*\)\}/g,
  `{showMasPedido && f === 'Mate' && (\n  <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n    <Heart className="w-3 h-3 fill-current" />\n  </div>\n)}`);

fs.writeFileSync('src/app/configurador/page.tsx', content);
