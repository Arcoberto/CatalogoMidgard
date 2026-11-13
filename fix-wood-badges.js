const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

const target1 = `<button
                        key={t}
                        onClick={() => setWoodTexture(t as any)}
                        className={\`relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center \${
                          woodTexture === t 
                            ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                            : 'border-transparent hover:border-gray-300'
                        }\`}
                        style={{ 
                          backgroundImage: \`url('/textures/\${t.toLowerCase()}.jpg')\`,
                          textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                        }}
                      >
                        {showMasPedido && t === 'Nogal' && (
                          <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                            <Heart className="w-3 h-3 fill-current" />
                          </div>
                        )}
                        <div className={\`absolute inset-0 transition-colors \${woodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}\`} />
                        <span className="relative z-10">{t}</span>
                        {woodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                      </button>`;

const replacement1 = `<div key={t} className="relative">
                      <button
                        onClick={() => setWoodTexture(t as any)}
                        className={\`w-full h-full relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center \${
                          woodTexture === t 
                            ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                            : 'border-transparent hover:border-gray-300'
                        }\`}
                        style={{ 
                          backgroundImage: \`url('/textures/\${t.toLowerCase()}.jpg')\`,
                          textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                        }}
                      >
                        <div className={\`absolute inset-0 transition-colors \${woodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}\`} />
                        <span className="relative z-10">{t}</span>
                        {woodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                      </button>
                      {showMasPedido && t === 'Nogal' && (
                        <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                          <Heart className="w-3 h-3 fill-current" />
                        </div>
                      )}
                      </div>`;


const target2 = `<button
                            key={t}
                            onClick={() => setShelfWoodTexture(t as any)}
                            className={\`relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center \${
                              shelfWoodTexture === t 
                                ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                                : 'border-transparent hover:border-gray-300'
                            }\`}
                            style={{ 
                              backgroundImage: \`url('/textures/\${t.toLowerCase()}.jpg')\`,
                              textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                            }}
                          >
                            {showMasPedido && t === 'Nogal' && (
                          <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                            <Heart className="w-3 h-3 fill-current" />
                          </div>
                        )}
                        <div className={\`absolute inset-0 transition-colors \${shelfWoodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}\`} />
                            <span className="relative z-10">{t}</span>
                            {shelfWoodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                          </button>`;

const replacement2 = `<div key={t} className="relative">
                          <button
                            onClick={() => setShelfWoodTexture(t as any)}
                            className={\`w-full h-full relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center \${
                              shelfWoodTexture === t 
                                ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                                : 'border-transparent hover:border-gray-300'
                            }\`}
                            style={{ 
                              backgroundImage: \`url('/textures/\${t.toLowerCase()}.jpg')\`,
                              textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                            }}
                          >
                            <div className={\`absolute inset-0 transition-colors \${shelfWoodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}\`} />
                            <span className="relative z-10">{t}</span>
                            {shelfWoodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                          </button>
                          {showMasPedido && t === 'Nogal' && (
                            <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                              <Heart className="w-3 h-3 fill-current" />
                            </div>
                          )}
                          </div>`;

const target3 = `<button
                            key={t}
                            onClick={() => setDeskWoodTexture(t as any)}
                            className={\`relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center \${
                              deskWoodTexture === t 
                                ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                                : 'border-transparent hover:border-gray-300'
                            }\`}
                            style={{ 
                              backgroundImage: \`url('/textures/\${t.toLowerCase()}.jpg')\`,
                              textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                            }}
                          >
                            {showMasPedido && t === 'Nogal' && (
                          <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                            <Heart className="w-3 h-3 fill-current" />
                          </div>
                        )}
                        <div className={\`absolute inset-0 transition-colors \${deskWoodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}\`} />
                            <span className="relative z-10">{t}</span>
                            {deskWoodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                          </button>`;

const replacement3 = `<div key={t} className="relative">
                          <button
                            onClick={() => setDeskWoodTexture(t as any)}
                            className={\`w-full h-full relative py-3 px-2 rounded-xl border-2 text-[11px] font-bold uppercase transition-all overflow-hidden bg-cover bg-center text-white flex items-center justify-center \${
                              deskWoodTexture === t 
                                ? 'border-midgard-navy ring-2 ring-midgard-navy ring-offset-1' 
                                : 'border-transparent hover:border-gray-300'
                            }\`}
                            style={{ 
                              backgroundImage: \`url('/textures/\${t.toLowerCase()}.jpg')\`,
                              textShadow: '0px 1px 3px rgba(0,0,0,0.9)'
                            }}
                          >
                            <div className={\`absolute inset-0 transition-colors \${deskWoodTexture === t ? 'bg-black/20' : 'bg-black/40 hover:bg-black/20'}\`} />
                            <span className="relative z-10">{t}</span>
                            {deskWoodTexture === t && <Check className="absolute top-1 right-1 w-3 h-3 text-white z-10 drop-shadow-md" />}
                          </button>
                          {showMasPedido && t === 'Nogal' && (
                            <div className="absolute -top-2 -right-2 bg-[#E63946] text-white p-1 rounded-full shadow-md z-20 pointer-events-none">
                              <Heart className="w-3 h-3 fill-current" />
                            </div>
                          )}
                          </div>`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
content = content.replace(target3, replacement3);

fs.writeFileSync('src/app/configurador/page.tsx', content);
