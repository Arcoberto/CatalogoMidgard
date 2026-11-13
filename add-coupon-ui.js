const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

const storeDestructureTarget = `    shippingState, shippingCost, setShipping,
    getTotalPrice,`;
const storeDestructureReplacement = `    shippingState, shippingCost, setShipping,
    couponCode, couponDiscountType, couponDiscountValue, couponTarget, applyCoupon, removeCoupon,
    getTotalPrice,`;
content = content.replace(storeDestructureTarget, storeDestructureReplacement);

const stateTarget = `  const [showMasPedido, setShowMasPedido] = useState(true);`;
const stateReplacement = `  const [showMasPedido, setShowMasPedido] = useState(true);
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    setCouponLoading(true);
    setCouponError('');
    setCouponSuccess('');
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Cupón inválido');
      }
      applyCoupon(data);
      setCouponSuccess('Cupón aplicado');
      setCouponInput('');
    } catch (e: any) {
      setCouponError(e.message);
    } finally {
      setCouponLoading(false);
    }
  };`;
content = content.replace(stateTarget, stateReplacement);

const uiTarget = `            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-sm mb-1 text-midgard-gray">
                <span>Subtotal (Mesa y Accesorios)</span>
                <span className="font-bold text-gray-700">$\\{getTotalPrice().toLocaleString('en-US')}</span>`;

const uiReplacement = `            {/* Cupones */}
            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-semibold text-midgard-navy mb-2">¿Tienes un cupón?</label>
              
              {!couponCode ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Escribe tu código" 
                    className="w-full p-2 border rounded-lg text-sm bg-white"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput}
                    className="bg-midgard-navy text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'Aplicar'}
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-green-700 font-bold text-sm block">Cupón: {couponCode}</span>
                    <span className="text-green-600 text-xs">
                      Descuento activo ({couponDiscountType === 'percentage' ? \`-\${couponDiscountValue}%\` : \`-\$\${couponDiscountValue}\`})
                    </span>
                  </div>
                  <button onClick={removeCoupon} className="text-red-500 text-xs hover:underline font-semibold">
                    Quitar
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-green-600 text-xs mt-1">{couponSuccess}</p>}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-sm mb-1 text-midgard-gray">
                <span>Subtotal (Con descuentos)</span>
                <span className="font-bold text-gray-700">$\\{getTotalPrice().toLocaleString('en-US')}</span>`;

// Note: escaping \$ because of replace in js
const uiTargetRegex = /<div className="border-t pt-4 mb-6">\s*<div className="flex justify-between text-sm mb-1 text-midgard-gray">\s*<span>Subtotal \(Mesa y Accesorios\)<\/span>\s*<span className="font-bold text-gray-700">\$\{(.*?)\}<\/span>/;
content = content.replace(uiTargetRegex, `            {/* Cupones */}
            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-semibold text-midgard-navy mb-2">¿Tienes un cupón?</label>
              
              {!couponCode ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Escribe tu código" 
                    className="w-full p-2 border rounded-lg text-sm bg-white"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponInput}
                    className="bg-midgard-navy text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'Aplicar'}
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-green-700 font-bold text-sm block">Cupón: {couponCode}</span>
                    <span className="text-green-600 text-xs">
                      Descuento activo ({couponDiscountType === 'percentage' ? \`-\${couponDiscountValue}%\` : \`-\$\${couponDiscountValue}\`})
                    </span>
                  </div>
                  <button onClick={removeCoupon} className="text-red-500 text-xs hover:underline font-semibold">
                    Quitar
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-green-600 text-xs mt-1">{couponSuccess}</p>}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-sm mb-1 text-midgard-gray">
                <span>Subtotal (Con descuentos)</span>
                <span className="font-bold text-gray-700">\$\{$1\}</span>`);


fs.writeFileSync('src/app/configurador/page.tsx', content);
console.log('Done replacing page.tsx for coupons');
