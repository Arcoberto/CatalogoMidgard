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
      
      const isAsgard = state.model === 'Asgard';

      if (isAsgard && state.accessories.led) total += ACCESSORY_PRICES.led;

      const calculatePackPrice = (quantity, unitPrice, packPrice) => {
        const packs = Math.floor(quantity / 6);
        const units = quantity % 6;
        return (packs * packPrice) + (units * unitPrice);
      };

      total += calculatePackPrice(state.accessories.resourceBox, ACCESSORY_PRICES.resourceBox.unit, ACCESSORY_PRICES.resourceBox.pack);
      total += calculatePackPrice(state.accessories.tray, ACCESSORY_PRICES.tray.unit, ACCESSORY_PRICES.tray.pack);
      
      const cupholdersToCharge = state.accessories.cupholder;
      total += cupholdersToCharge * ACCESSORY_PRICES.cupholder.unit;

      if (state.accessories.drawer) total += ACCESSORY_PRICES.drawer;
      if (state.accessories.chairs > 0) total += state.accessories.chairs * 2500;
      total += calculatePackPrice(state.accessories.extension, ACCESSORY_PRICES.extension.unit, ACCESSORY_PRICES.extension.pack);
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
console.log('Fixed Store for Real');
