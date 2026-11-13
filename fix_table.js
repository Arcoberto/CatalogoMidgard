const fs = require('fs');
let content = fs.readFileSync('src/components/3d/TableViewer3D_backup.tsx', 'utf8');

// 1. Fix useGLTF
content = content.replace(
  `const modelPath = model === 'Asgard' ? '/models/Asgard.glb' : '/models/Midgard.glb';\n  const { scene } = useGLTF(modelPath);`,
  `const { scene } = useGLTF('/models/Asgard.glb');`
);
content = content.replace(
  `const modelPath = model === 'Asgard' ? '/models/Asgard.glb' : '/models/Midgard.glb';\r\n  const { scene } = useGLTF(modelPath);`,
  `const { scene } = useGLTF('/models/Asgard.glb');`
);

// 2. Fix Efecto 3
const newEfecto3 = `// Efecto 3: Mostrar/Ocultar cubiertas y Cajón
  useEffect(() => {
    if (!scene) return;
    const hasDrawer = accessories.drawer;

    scene.traverse((child) => {
      const rawName = child.name ? child.name.toLowerCase() : '';
      const cleanName = rawName.replace(/[\\s_]+/g, ''); // Remueve todos los espacios y guiones bajos
      
      // Filtro de modelo (Asgard vs Midgard)
      // Todo lo que sea estructura base tiene que validarse.
      const isTableStructure = cleanName.includes('pata') || cleanName.includes('cubierta') || cleanName.includes('chambrana') || cleanName.includes('reposabrazo') || cleanName.includes('alfombra') || cleanName.includes('superficie');
      
      if (isTableStructure) {
         const isMidgardNode = rawName.includes('#1') || cleanName.includes('midgard');
         if (model === 'Midgard' && !isMidgardNode) {
             child.visible = false;
             child.traverse(c => { c.visible = false; });
             return;
         }
         if (model === 'Asgard' && isMidgardNode) {
             child.visible = false;
             child.traverse(c => { c.visible = false; });
             return;
         }
      }

      // 1. Tapas principales de la mesa
      if (cleanName === 'cubierta' || cleanName.startsWith('cubierta') || cleanName === 'tapasprincipales' || cleanName.includes('superficie-midgard') || cleanName.includes('cubierta#1')) {`;

let split = content.split('// 1. Tapas principales de la mesa');
let part1 = split[0];
part1 = part1.replace(/\/\/ Efecto 3: Mostrar\/Ocultar cubiertas y Cajón[\s\S]+?$/, '');
content = part1 + newEfecto3 + '\n      const v = isCovered;\n        child.visible = v;\n        child.traverse((c) => { c.visible = v; });\n      }' + split[1].substring(split[1].indexOf('else if'));

// 3. Remove AsgardAccessoriesOverlay from return
content = content.replace(
  "{model === 'Midgard' && <AsgardAccessoriesOverlay woodTex={woodTex} />}",
  ""
);

fs.writeFileSync('src/components/3d/TableViewer3D.tsx', content);
console.log('Restored from backup and applied single GLB logic');
