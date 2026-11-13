const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

// 1. Add useState
content = content.replace(
  /import { Suspense, useEffect } from "react";/,
  `import { Suspense, useEffect, useState } from "react";`
);

// 2. Add state inside component
content = content.replace(
  /export default function ConfiguradorPage\(\) \{/,
  `export default function ConfiguradorPage() {\n  const [showPromocion, setShowPromocion] = useState(true);\n  const [showMasPedido, setShowMasPedido] = useState(true);`
);

// 3. Update pill tags
content = content.replace(
  /<div className="absolute bottom-6 left-6 z-10 flex flex-col items-start gap-3">[\s\S]*?<\/div>\s*<\/div>\s*\{\/\* LEFT SIDE FLOATING UI/,
  `<div className="absolute bottom-6 left-6 z-10 flex flex-col items-start gap-3">
          {/* Promoción */}
          <button 
            onClick={() => setShowPromocion(!showPromocion)}
            className={\`flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#50C878]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-[#50C878] font-medium text-xs tracking-wide uppercase transition-all hover:-translate-y-0.5 \${!showPromocion && 'opacity-50 grayscale'}\`}
          >
            <Gift className="w-4 h-4 stroke-[1.5]" />
            <span>Promoción</span>
          </button>
          
          {/* Más pedido */}
          <button 
            onClick={() => setShowMasPedido(!showMasPedido)}
            className={\`flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#E63946]/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-[#E63946] font-medium text-xs tracking-wide uppercase transition-all hover:-translate-y-0.5 \${!showMasPedido && 'opacity-50 grayscale'}\`}
          >
            <Heart className="w-4 h-4 stroke-[1.5]" />
            <span>Más pedido</span>
          </button>
        </div>

        {/* LEFT SIDE FLOATING UI`
);

// 4. Update Promocion logic
content = content.replace(/\{m === 'Asgard' && \(/g, `{showPromocion && m === 'Asgard' && (`);
content = content.replace(/\{isAsgard && \(\s*<div className="absolute -top-2 -right-2 bg-\[#50C878\]/g, `{showPromocion && isAsgard && (\n                  <div className="absolute -top-2 -right-2 bg-[#50C878]`);
// The one that doesn't have a conditional wrapper yet (Sistema LED)
content = content.replace(
  /<div className="absolute -top-2 -right-2 bg-\[#50C878\] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\s*<Gift className="w-3 h-3" \/>\s*<\/div>/g,
  `{showPromocion && (\n                    <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                      <Gift className="w-3 h-3" />\n                    </div>\n                  )}`
);

// 5. Update Mas Pedido logic
content = content.replace(/\{t === 'Nogal' && \(/g, `{showMasPedido && t === 'Nogal' && (`);
content = content.replace(/\{est === 'Bicolor Negro' && \(/g, `{showMasPedido && est === 'Bicolor Negro' && (`);
content = content.replace(/\{f === 'Mate' && \(/g, `{showMasPedido && f === 'Mate' && (`);
// The one that doesn't have a conditional wrapper yet (Cajon)
content = content.replace(
  /<div className="absolute -top-2 -right-2 bg-\[#E63946\] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\s*<Heart className="w-3 h-3 fill-current" \/>\s*<\/div>/g,
  `{showMasPedido && (\n                <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                  <Heart className="w-3 h-3 fill-current" />\n                </div>\n              )}`
);

fs.writeFileSync('src/app/configurador/page.tsx', content);
