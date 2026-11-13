const fs = require('fs');
let content = fs.readFileSync('src/store/useConfiguratorStore.ts', 'utf8');

// 1. Add fields to ConfiguratorState interface
const stateInterfaceTarget = `  shippingCost: number;`;
const stateInterfaceReplacement = `  shippingCost: number;
  
  // Coupon
  couponCode: string | null;
  couponDiscountType: string | null;
  couponDiscountValue: number | null;
  couponTarget: string | null;`;
content = content.replace(stateInterfaceTarget, stateInterfaceReplacement);

// 2. Add actions to ConfiguratorState interface
const actionsInterfaceTarget = `  setShipping: (state: string, cost: number) => void;`;
const actionsInterfaceReplacement = `  setShipping: (state: string, cost: number) => void;
  applyCoupon: (coupon: { code: string; discountType: string; discountValue: number; target: string }) => void;
  removeCoupon: () => void;`;
content = content.replace(actionsInterfaceTarget, actionsInterfaceReplacement);

// 3. Add initial state
const initialStateTarget = `  shippingCost: 0,`;
const initialStateReplacement = `  shippingCost: 0,
  couponCode: null,
  couponDiscountType: null,
  couponDiscountValue: null,
  couponTarget: null,`;
content = content.replace(initialStateTarget, initialStateReplacement);

// 4. Add reset state for coupon in resetConfigurator
const resetStateTarget = `    shippingCost: 0,
    activeProducts: { table: true, shelf: false, desk: false },`;
const resetStateReplacement = `    shippingCost: 0,
    couponCode: null,
    couponDiscountType: null,
    couponDiscountValue: null,
    couponTarget: null,
    activeProducts: { table: true, shelf: false, desk: false },`;
content = content.replace(resetStateTarget, resetStateReplacement);

// 5. Add action implementations
const actionsImplTarget = `  setShipping: (shippingState, shippingCost) => set({ shippingState, shippingCost }),`;
const actionsImplReplacement = `  setShipping: (shippingState, shippingCost) => set({ shippingState, shippingCost }),
  
  applyCoupon: (coupon) => set({
    couponCode: coupon.code,
    couponDiscountType: coupon.discountType,
    couponDiscountValue: coupon.discountValue,
    couponTarget: coupon.target
  }),
  removeCoupon: () => set({
    couponCode: null,
    couponDiscountType: null,
    couponDiscountValue: null,
    couponTarget: null
  }),`;
content = content.replace(actionsImplTarget, actionsImplReplacement);

// 6. Update getTotalPrice logic
const getTotalPriceTarget = `    // Independent Products
    if (state.activeProducts.shelf) total += ACCESSORY_PRICES.shelf;
    if (state.activeProducts.desk) total += ACCESSORY_PRICES.desk;

    return total;
  }`;

const getTotalPriceReplacement = `    // Independent Products
    if (state.activeProducts.shelf) total += ACCESSORY_PRICES.shelf;
    if (state.activeProducts.desk) total += ACCESSORY_PRICES.desk;

    // Apply Coupon
    if (state.couponCode && state.couponDiscountValue) {
      let discountAmount = 0;
      
      const getTargetTotal = () => {
        if (state.couponTarget === 'table_only' && state.activeProducts.table) {
          let tableBase = MODELS[state.model].basePrice;
          const category = getTableCategory(state.customLength, state.customWidth);
          if (category === 'Chica') tableBase -= 2000;
          else if (category === 'Grande') tableBase += 3500;
          return tableBase;
        }
        if (state.couponTarget === 'desk_only' && state.activeProducts.desk) return ACCESSORY_PRICES.desk;
        if (state.couponTarget === 'shelf_only' && state.activeProducts.shelf) return ACCESSORY_PRICES.shelf;
        if (state.couponTarget === 'general') return total; // Apply to everything
        return 0;
      };

      const targetTotal = getTargetTotal();

      if (targetTotal > 0) {
        if (state.couponDiscountType === 'percentage') {
          discountAmount = targetTotal * (state.couponDiscountValue / 100);
        } else if (state.couponDiscountType === 'fixed') {
          // ensure we don't discount more than the target's total
          discountAmount = Math.min(targetTotal, state.couponDiscountValue);
        }
      }

      total -= discountAmount;
    }

    return Math.max(0, total);
  }`;
content = content.replace(getTotalPriceTarget, getTotalPriceReplacement);

fs.writeFileSync('src/store/useConfiguratorStore.ts', content);
console.log('Done replacing store for coupons');
