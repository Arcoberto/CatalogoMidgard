const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

// Remove Percent Promocion
content = content.replace(/\s*\{m === 'Asgard' && \(\s*<div className="absolute[^>]+>\s*<Percent className="w-3 h-3" \/> Promoción\s*<\/div>\s*\)\}/g, '');
content = content.replace(/\s*\{isAsgard && \(\s*<div className="absolute[^>]+>\s*<Percent className="w-3 h-3" \/> Promoción\s*<\/div>\s*\)\}/g, '');
content = content.replace(/\s*<div className="absolute[^>]+>\s*<Percent className="w-3 h-3" \/> Promoción\s*<\/div>\s*/g, '');

// Remove Heart Popular/Preferido
content = content.replace(/\s*\{t === 'Nogal' && \(\s*<div className="absolute[^>]+>\s*<Heart className="w-2.5 h-2.5 fill-current" \/> Preferido\s*<\/div>\s*\)\}/g, '');
content = content.replace(/\s*\{est === 'Bicolor Negro' && \(\s*<div className="absolute[^>]+>\s*<Heart className="w-2.5 h-2.5 fill-current" \/> Popular\s*<\/div>\s*\)\}/g, '');
content = content.replace(/\s*\{f === 'Mate' && \(\s*<div className="absolute[^>]+>\s*<Heart className="w-2.5 h-2.5 fill-current" \/> Popular\s*<\/div>\s*\)\}/g, '');
content = content.replace(/\s*<div className="absolute[^>]+>\s*<Heart className="w-3 h-3 fill-current" \/> Popular\s*<\/div>\s*/g, '');

// Remove 'relative' from buttons where we added it
content = content.replace(/className={`relative border-2 p-4/g, 'className={`border-2 p-4');
content = content.replace(/className={`relative flex items-center justify-between p-4 border-2/g, 'className={`flex items-center justify-between p-4 border-2');
content = content.replace(/className="relative flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"/g, 'className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"');
content = content.replace(/className="relative flex items-center justify-between p-3 border rounded-lg"/g, 'className="flex items-center justify-between p-3 border rounded-lg"');
content = content.replace(/className={`relative py-3 px-2 rounded-xl border-2/g, 'className={`py-3 px-2 rounded-xl border-2');
content = content.replace(/className={`relative py-2 px-2 rounded-xl border/g, 'className={`py-2 px-2 rounded-xl border');
content = content.replace(/className={`relative py-2 px-4 border-2/g, 'className={`py-2 px-4 border-2');

fs.writeFileSync('src/app/configurador/page.tsx', content);
