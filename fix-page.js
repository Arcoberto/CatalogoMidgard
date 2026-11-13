const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  'import { useConfiguratorStore, TableFinish, StructureStyle, TableFelt } from "@/store/useConfiguratorStore";',
  'import { useConfiguratorStore, TableFinish, StructureStyle, TableFelt, getTableCategory, getMaxAccessories } from "@/store/useConfiguratorStore";'
);

// 2. Add maxAccessories calculation
const hookTarget = `  const searchParams = useSearchParams();`;
const hookReplacement = `  const searchParams = useSearchParams();
  const currentCategory = getTableCategory(customLength, customWidth);
  const maxAccessories = getMaxAccessories(currentCategory);`;
content = content.replace(hookTarget, hookReplacement);

// 3. Update inputs for customLength / customWidth to include onBlur clamping
const inputLengthTarget = `onChange={(e) => setCustomDimensions(Number(e.target.value), customWidth)}`;
const inputLengthReplacement = `onChange={(e) => setCustomDimensions(Number(e.target.value), customWidth)} onBlur={(e) => setCustomDimensions(Math.max(90, Math.min(200, Number(e.target.value))), customWidth)}`;
content = content.replace(inputLengthTarget, inputLengthReplacement);

const inputWidthTarget = `onChange={(e) => setCustomDimensions(customLength, Number(e.target.value))}`;
const inputWidthReplacement = `onChange={(e) => setCustomDimensions(customLength, Number(e.target.value))} onBlur={(e) => setCustomDimensions(customLength, Math.max(90, Math.min(120, Number(e.target.value))))}`;
content = content.replace(inputWidthTarget, inputWidthReplacement);

// 4. Update max values in buttons (cupholder, resourceBox, tray, extension)
content = content.replace(/Math\.min\(6, accessories\.cupholder \+ 1\)/g, "Math.min(maxAccessories, accessories.cupholder + 1)");
content = content.replace(/Math\.min\(6, accessories\.resourceBox \+ 1\)/g, "Math.min(maxAccessories, accessories.resourceBox + 1)");
content = content.replace(/Math\.min\(6, accessories\.tray \+ 1\)/g, "Math.min(maxAccessories, accessories.tray + 1)");
content = content.replace(/Math\.min\(6, accessories\.extension \+ 1\)/g, "Math.min(maxAccessories, accessories.extension + 1)");

fs.writeFileSync('src/app/configurador/page.tsx', content);
console.log('Done replacing page.tsx');
