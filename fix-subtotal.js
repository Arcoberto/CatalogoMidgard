const fs = require('fs');
let content = fs.readFileSync('src/store/useConfiguratorStore.ts', 'utf8');

// Add getSubtotal to interface
content = content.replace('getTotalPrice: () => number;', 'getSubtotal: () => number;\n  getTotalPrice: () => number;');

// Find the getTotalPrice implementation and split it
const getTotalPriceStr = `  getTotalPrice: () => {
    const state = get();
    let total = 0;

    // Table Pricing
    if (state.activeProducts.table) {
      let tableBasePrice = MODELS[state.model].basePrice;
      const category = getTableCategory(state.customLength, state.customWidth);
      
      if (category === 'Chica') tableBasePrice -= 2000;
      else if (category === 'Grande') tableBasePrice += 3500;
      
      total += tableBasePrice;
      
      const isAsgard = state.model === 'Asgard';

      if (state.woodTexture !== 'Pino') total += MODELS[state.model].premiumWoodPrice;
      
      Object.entries(state.accessories).forEach(([key, count]) => {
        const item = ACCESSORY_PRICES[key as keyof typeof ACCESSORY_PRICES];
        if (typeof item === 'number') {
          total += item * count;
        } else {
          total += (item.unit * count);
        }
      });
    }

    // Independent Products
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
  },`;

const subtotalAndTotalStr = `  getSubtotal: () => {
    const state = get();
    let total = 0;

    // Table Pricing
    if (state.activeProducts.table) {
      let tableBasePrice = MODELS[state.model].basePrice;
      const category = getTableCategory(state.customLength, state.customWidth);
      
      if (category === 'Chica') tableBasePrice -= 2000;
      else if (category === 'Grande') tableBasePrice += 3500;
      
      total += tableBasePrice;
      
      const isAsgard = state.model === 'Asgard';

      if (state.woodTexture !== 'Pino') total += MODELS[state.model].premiumWoodPrice;
      
      Object.entries(state.accessories).forEach(([key, count]) => {
        const item = ACCESSORY_PRICES[key as keyof typeof ACCESSORY_PRICES];
        if (typeof item === 'number') {
          total += item * count;
        } else {
          total += (item.unit * count);
        }
      });
    }

    // Independent Products
    if (state.activeProducts.shelf) total += ACCESSORY_PRICES.shelf;
    if (state.activeProducts.desk) total += ACCESSORY_PRICES.desk;

    return total;
  },
  
  getTotalPrice: () => {
    const state = get();
    let total = state.getSubtotal();

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
  },`;

content = content.replace(getTotalPriceStr, subtotalAndTotalStr);

fs.writeFileSync('src/store/useConfiguratorStore.ts', content);
console.log('Done store modification');
