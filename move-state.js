const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

// Remove from ConfiguradorPage
content = content.replace(
  /export default function ConfiguradorPage\(\) \{\r?\n\s*const \[showPromocion, setShowPromocion\] = useState\(true\);\r?\n\s*const \[showMasPedido, setShowMasPedido\] = useState\(true\);/,
  `export default function ConfiguradorPage() {`
);

// Add to ConfiguradorContent
content = content.replace(
  /function ConfiguradorContent\(\) \{\r?\n\s*const searchParams = useSearchParams\(\);/,
  `function ConfiguradorContent() {\n  const [showPromocion, setShowPromocion] = useState(true);\n  const [showMasPedido, setShowMasPedido] = useState(true);\n  const searchParams = useSearchParams();`
);

fs.writeFileSync('src/app/configurador/page.tsx', content);
