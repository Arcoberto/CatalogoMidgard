const fs = require('fs');
let content = fs.readFileSync('src/store/useConfiguratorStore.ts', 'utf8');

const targetToRemove = `export type TableCategory = 'Chica' | 'Mediana' | 'Grande';

export const getTableCategory = (length: number, width: number): TableCategory => {
  if (length <= 120 && width <= 120) return 'Chica';
  if (length >= 121 && length <= 170 && width >= 90 && width <= 110) return 'Mediana';
  return 'Grande';
};

export const getMaxAccessories = (category: TableCategory): number => {
  if (category === 'Chica') return 4;
  if (category === 'Mediana') return 6;
  return 8; // Grande
};

const clampAccessories = (accessories: AccessoriesState, category: TableCategory): AccessoriesState => {
  const max = getMaxAccessories(category);
  return {
    ...accessories,
    resourceBox: Math.min(accessories.resourceBox, max),
    tray: Math.min(accessories.tray, max),
    cupholder: Math.min(accessories.cupholder, max),
    extension: Math.min(accessories.extension, max),
  };
};`;

content = content.replace(targetToRemove, '');

fs.writeFileSync('src/store/useConfiguratorStore.ts', content);
