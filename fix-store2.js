const fs = require('fs');
let content = fs.readFileSync('src/store/useConfiguratorStore.ts', 'utf8');

const target1 = `export const getMaxAccessories = (category: TableCategory): number => {
  if (category === 'Chica') return 4;
  if (category === 'Mediana') return 6;
  return 8; // Grande
};

export interface AccessoriesState {`;

const replacement1 = `export const getMaxAccessories = (category: TableCategory): number => {
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
};

export interface AccessoriesState {`;

content = content.replace(target1, replacement1);

// I also need to make sure the initial state of cupholder is 0
content = content.replace(/cupholder: 6, \/\/ 6 included in Asgard/g, "cupholder: 0,");
content = content.replace(/cupholder: 6,/g, "cupholder: 0,");

fs.writeFileSync('src/store/useConfiguratorStore.ts', content);
