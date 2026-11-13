const fs = require('fs');

const originalFile = fs.readFileSync('src/store/useConfiguratorStore.ts', 'utf8');

const replacement = `  getSubtotal: () => {
    const state = get();
    let total = 0;

    if (state.activeProducts.table) {
      let tableBasePrice = MODELS[state.model].basePrice;
      const category = getTableCategory(state.customLength, state.customWidth);
      
      if (category === 'Chica') tableBasePrice -= 2000;
      else if (category === 'Grande') tableBasePrice += 3500;
      
      total += tableBasePrice;
      
      if (state.woodTexture !== 'Pino') total += MODELS[state.model].premiumWoodPrice;
      
      Object.entries(state.accessories).forEach(([key, count]) => {
        const item = ACCESSORY_PRICES[key];
        if (typeof item === 'number') {
          total += item * count;
        } else if (item) {
          total += (item.unit * count);
        }
      });
    }

    if (state.activeProducts.shelf) total += ACCESSORY_PRICES.shelf;
    if (state.activeProducts.desk) total += ACCESSORY_PRICES.desk;

    return total;
  },

  getTotalPrice: () => {
    const state = get();
    let total = state.getSubtotal();

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
        if (state.couponTarget === 'general') return total;
        return 0;
      };

      const targetTotal = getTargetTotal();

      if (targetTotal > 0) {
        if (state.couponDiscountType === 'percentage') {
          discountAmount = targetTotal * (state.couponDiscountValue / 100);
        } else if (state.couponDiscountType === 'fixed') {
          discountAmount = Math.min(targetTotal, state.couponDiscountValue);
        }
      }

      total -= discountAmount;
    }

    return Math.max(0, total);
  }`;

const regex = /getSubtotal: \(\) => \{\s*const state = get\(\);[\s\S]*?return Math\.max\(0, total\);\s*\}/m;

const newFile = originalFile.replace(regex, replacement);

fs.writeFileSync('src/store/useConfiguratorStore.ts', newFile);
console.log('Fixed Store');
