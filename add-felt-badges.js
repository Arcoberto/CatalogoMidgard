const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

const target = `<button
                    key={felt.id}
                    onClick={() => setMatColor(felt.id as TableFelt)}
                    className={\`relative w-16 h-16 rounded-full transition-all flex items-center justify-center border-4 overflow-hidden bg-cover bg-center \${matColor === felt.id ? 'border-midgard-navy scale-110 shadow-md' : 'border-transparent shadow-sm hover:scale-105 hover:border-gray-300'}\`}
                    style={{ backgroundImage: \`url(\${felt.image})\` }}
                    title={felt.name}
                  >
                    {matColor === felt.id && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Check className="w-6 h-6 text-white drop-shadow-md" /></div>}
                  </button>`;

const replacement = `<div key={felt.id} className="relative">
                  <button
                    onClick={() => setMatColor(felt.id as TableFelt)}
                    className={\`relative w-16 h-16 rounded-full transition-all flex items-center justify-center border-4 overflow-hidden bg-cover bg-center \${matColor === felt.id ? 'border-midgard-navy scale-110 shadow-md' : 'border-transparent shadow-sm hover:scale-105 hover:border-gray-300'}\`}
                    style={{ backgroundImage: \`url(\${felt.image})\` }}
                    title={felt.name}
                  >
                    {matColor === felt.id && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Check className="w-6 h-6 text-white drop-shadow-md" /></div>}
                  </button>
                  {showMasPedido && ['Rojo', 'Verde Esmeralda', 'Azul Metalico'].includes(felt.id) && (
                    <div className="absolute -top-1 -right-1 bg-[#E63946] text-white p-1 rounded-full shadow-md z-10 pointer-events-none">
                      <Heart className="w-3 h-3 fill-current" />
                    </div>
                  )}
                  </div>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/app/configurador/page.tsx', content);
