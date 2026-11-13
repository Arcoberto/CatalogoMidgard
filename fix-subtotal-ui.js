const fs = require('fs');
let content = fs.readFileSync('src/app/configurador/page.tsx', 'utf8');

const destructureTarget = `    couponCode, couponDiscountType, couponDiscountValue, couponTarget, applyCoupon, removeCoupon,
    getTotalPrice,`;
const destructureReplacement = `    couponCode, couponDiscountType, couponDiscountValue, couponTarget, applyCoupon, removeCoupon,
    getSubtotal, getTotalPrice,`;
content = content.replace(destructureTarget, destructureReplacement);


const originalSubtotalTarget = `            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-semibold text-midgard-navy mb-2">¿Tienes un cupón?</label>`;
              
const originalSubtotalReplacement = `            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-sm mb-1 text-midgard-gray">
                <span>Subtotal (Mesa y Accesorios)</span>
                <span className="font-bold text-gray-700">$\\{getSubtotal().toLocaleString('en-US')}</span>
              </div>
            </div>
            
            {/* Cupones */}
            <div className="border-t pt-4 mb-4">
              <label className="block text-sm font-semibold text-midgard-navy mb-2">¿Tienes un cupón?</label>`;
              
content = content.replace(originalSubtotalTarget, originalSubtotalReplacement);


const subtotalRegex = /<div className="border-t pt-4 mb-6">\s*<div className="flex justify-between text-sm mb-1 text-midgard-gray">\s*<span>Subtotal \(Con descuentos\)<\/span>\s*<span className="font-bold text-gray-700">\$\{(.*?)\}<\/span>/;

content = content.replace(subtotalRegex, `            <div className="border-t pt-4 mb-6">
              {couponCode && (
                <div className="flex justify-between text-sm mb-1 text-green-600">
                  <span>Descuento aplicado</span>
                  <span className="font-bold text-green-700">-$\\{ (getSubtotal() - getTotalPrice()).toLocaleString('en-US') }</span>
                </div>
              )}`);

fs.writeFileSync('src/app/configurador/page.tsx', content);
console.log('Done UI modification');
