const fs = require('fs');
let content = fs.readFileSync('src/store/useConfiguratorStore.ts', 'utf8');

const replacement = `export const getMaxAccessories = (category: TableCategory): number => {
  if (category === 'Chica') return 4;
  if (category === 'Mediana') return 6;
  return 8; // Grande
};

export const clampAccessories = (accessories: AccessoriesState, category: TableCategory): AccessoriesState => {
  const max = getMaxAccessories(category);
  return {
    ...accessories,
    resourceBox: Math.min(accessories.resourceBox, max),
    tray: Math.min(accessories.tray, max),
    cupholder: Math.min(accessories.cupholder, max),
    extension: Math.min(accessories.extension, max),
  };
};`;

content = content.replace(/export const getMaxAccessories = \(category: TableCategory\): number => \{[\s\S]*?return 8; \/\/ Grande\n\};/m, replacement);

fs.writeFileSync('src/store/useConfiguratorStore.ts', content);
