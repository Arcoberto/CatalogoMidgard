const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

// Asgard
content = content.replace(
  /className={\`border-2 p-4 rounded-xl text-left transition-all \$\{\r?\n\s*model === m \? 'border-midgard-navy bg-midgard-navy\/5' : 'border-gray-200 hover:border-midgard-steel'\r?\n\s*\}\`}\r?\n\s*>/,
  `className={\`relative border-2 p-4 rounded-xl text-left transition-all \${\n                      model === m ? 'border-midgard-navy bg-midgard-navy/5' : 'border-gray-200 hover:border-midgard-steel'\n                    }\`}\n                  >\n                    {m === 'Asgard' && (\n                      <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                        <Gift className="w-3 h-3" />\n                      </div>\n                    )}`
);

// Estandar
content = content.replace(
  /<label className={\`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all \$\{\s*sizeType === 'standard'\s*\?\s*'border-midgard-navy bg-midgard-navy\/5'\s*:\s*'border-gray-200 hover:border-midgard-steel'\s*\}\`}>/,
  `<label className={\`relative flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all \${sizeType === 'standard' ? 'border-midgard-navy bg-midgard-navy/5' : 'border-gray-200 hover:border-midgard-steel'}\`}>\n                {isAsgard && (\n                  <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                    <Gift className="w-3 h-3" />\n                  </div>\n                )}`
);

// Sistema LED
content = content.replace(
  /<label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">\s*<div>\s*<span className="font-semibold block text-sm">Sistema LED<\/span>/,
  `<label className="relative flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">\n                  <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                    <Gift className="w-3 h-3" />\n                  </div>\n                  <div>\n                    <span className="font-semibold block text-sm">Sistema LED</span>`
);

// Portavasos
content = content.replace(
  /<div className="flex items-center justify-between p-3 border rounded-lg">\s*<div>\s*<span className="font-semibold block text-sm">Portavasos Ajustable<\/span>/,
  `<div className="relative flex items-center justify-between p-3 border rounded-lg">\n                <div className="absolute -top-2 -right-2 bg-[#50C878] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                  <Gift className="w-3 h-3" />\n                </div>\n                <div>\n                  <span className="font-semibold block text-sm">Portavasos Ajustable</span>`
);

// Cajon
content = content.replace(
  /<label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">\s*<div>\s*<span className="font-semibold block text-sm">Caj[^n]+n para superficies<\/span>/,
  `<label className="relative flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">\n                <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                  <Heart className="w-3 h-3 fill-current" />\n                </div>\n                <div>\n                  <span className="font-semibold block text-sm">Cajón para superficies</span>`
);

// Nogal (multiple)
content = content.replace(
  /<div className={\`absolute inset-0 transition-colors \$\{/g,
  `{t === 'Nogal' && (\n                        <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">\n                          <Heart className="w-3 h-3 fill-current" />\n                        </div>\n                      )}\n                      <div className={\`absolute inset-0 transition-colors \${`
);

// Bicolor Negro
content = content.replace(
  /className={\`py-2 px-2 rounded-xl border text-\[11px\] font-bold uppercase transition-all \$\{\r?\n\s*structureStyle === est \r?\n\s*\? 'border-midgard-navy bg-midgard-navy\/5 text-midgard-navy' \r?\n\s*: 'border-gray-200 text-gray-600 hover:border-midgard-steel'\r?\n\s*\}\`}\r?\n\s*>\r?\n\s*\{est\}/,
  `className={\`relative py-2 px-2 rounded-xl border text-[11px] font-bold uppercase transition-all \${\n                        structureStyle === est \n                          ? 'border-midgard-navy bg-midgard-navy/5 text-midgard-navy' \n                          : 'border-gray-200 text-gray-600 hover:border-midgard-steel'\n                      }\`}\n                    >\n                      {est === 'Bicolor Negro' && (\n                        <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                          <Heart className="w-3 h-3 fill-current" />\n                        </div>\n                      )}\n                      {est}`
);

// Mate (multiple)
content = content.replace(
  /className={\`py-2 px-4 border-2 rounded-xl text-center text-sm font-medium capitalize transition-all \$\{\r?\n\s*[a-zA-Z]+ === f \? 'border-midgard-navy bg-midgard-navy\/5 text-midgard-navy' : 'border-gray-200 text-gray-600 hover:border-midgard-steel'\r?\n\s*\}\`}\r?\n\s*>\r?\n\s*\{f\}/g,
  (match) => {
    // Add relative and the badge
    let replaced = match.replace('className={`py-2', 'className={`relative py-2');
    replaced = replaced.replace('{f}', `{f === 'Mate' && (\n                        <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">\n                          <Heart className="w-3 h-3 fill-current" />\n                        </div>\n                      )}\n                      {f}`);
    return replaced;
  }
);


fs.writeFileSync('src/app/configurador/page.tsx', content);
