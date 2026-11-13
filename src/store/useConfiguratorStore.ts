import { create } from 'zustand';

export type TableModel = 'Asgard' | 'Midgard';
export type TableWood = 'Pino' | 'Roble' | 'Chocolate' | 'Nogal' | 'Encino' | 'Tzalam' | 'Parota' | 'Fresno' | 'Haya';
export type TableFelt = 'Rojo' | 'Tinto' | 'Naranja' | 'Amarillo' | 'Verde' | 'Verde Esmeralda' | 'Cyan' | 'Azul' | 'Azul Indigo' | 'Azul Metalico' | 'Morado' | 'Magenta' | 'Rosa' | 'Arena' | 'Gris' | 'Negro';
export type TableFinish = 'Mate' | 'Semi-Mate' | 'Brillante';
export type TableSize = 'standard' | 'custom';
export type StructureStyle = 'Un sólo tono' | 'Bicolor Blanco' | 'Bicolor Negro';

export const MODELS = {
  Asgard: {
    name: 'Asgard',
    basePrice: 21300,
    standardSize: { length: 170, width: 110, height: 75 },
    description: 'Mesa premium para jugadores exigentes que buscan la máxima experiencia de juego.',
    included: ['Juego de portavasos'],
  },
  Midgard: {
    name: 'Midgard',
    basePrice: 17300,
    standardSize: { length: 170, width: 110, height: 75 },
    description: 'Mesa robusta diseñada para grupos grandes y sesiones de juego prolongadas.',
    included: [],
  }
};

export const ACCESSORY_PRICES = {
  led: 2000,
  resourceBox: { unit: 300, pack: 1400 }, // pack is for 6
  tray: { unit: 800, pack: 3500 }, // pack is for 6
  cupholder: { unit: 350, pack: 1700 }, // pack is for 6
  drawer: 3000,
  desk: 8500, // Precio Buen Fin (precio regular $13,000)
  shelf: 4200, // Precio Buen Fin (precio regular $6,000)
  extension: { unit: 800, pack: 4000 }, // pack is for 6
};


export type TableCategory = 'Chica' | 'Estándar' | 'Grande';

export const getTableCategory = (length: number, width: number): TableCategory => {
  if (length <= 120 && width <= 120) return 'Chica';
  if (length >= 121 && length <= 170 && width >= 90 && width <= 110) return 'Estándar';
  return 'Grande';
};

export const getMaxAccessories = (category: TableCategory): number => {
  if (category === 'Chica') return 4;
  if (category === 'Estándar') return 6;
  return 8; // Grande
};

export const clampAccessories = (accessories: AccessoriesState, category: TableCategory): AccessoriesState => {
  const max = getMaxAccessories(category);
  return {
    ...accessories,
    resourceBox: Math.min(accessories.resourceBox, max),
    tray: Math.min(accessories.tray, max),
    cupholder: Math.min(accessories.cupholder, max),
    extension: Math.min(accessories.extension, max),
  };
};




export interface AccessoriesState {
  led: boolean;
  resourceBox: number;
  tray: number;
  cupholder: number;
  drawer: boolean;
  chairs: number;
  extension: number;
}

export type ProductType = 'table' | 'shelf' | 'desk';

interface ConfiguratorState {
  model: TableModel;
  sizeType: TableSize;
  customLength: number;
  customWidth: number;
  finish: TableFinish;
  woodTexture: TableWood;
  shelfWoodTexture: TableWood;
  shelfFinish: TableFinish;
  deskWoodTexture: TableWood;
  deskFinish: TableFinish;
  isCovered: boolean;
  matColor: TableFelt;
  structureStyle: StructureStyle;
  accessories: AccessoriesState;
  shippingState: string;
  shippingCost: number;
  
  // Coupon
  couponCode: string | null;
  couponDiscountType: string | null;
  couponDiscountValue: number | null;
  couponTarget: string | null;
  
  activeProducts: Record<ProductType, boolean>;
  currentMenu: ProductType | null;
  
  // Actions
  setModel: (model: TableModel) => void;
  setSizeType: (type: TableSize) => void;
  setCustomDimensions: (length: number, width: number) => void;
  setFinish: (finish: TableFinish) => void;
  setWoodTexture: (texture: TableWood) => void;
  setShelfWoodTexture: (texture: TableWood) => void;
  setShelfFinish: (finish: TableFinish) => void;
  setDeskWoodTexture: (texture: TableWood) => void;
  setDeskFinish: (finish: TableFinish) => void;
  setIsCovered: (isCovered: boolean) => void;
  setMatColor: (color: TableFelt) => void;
  setStructureStyle: (style: StructureStyle) => void;
  updateAccessory: (key: keyof AccessoriesState, value: boolean | number) => void;
  setShipping: (state: string, cost: number) => void;
  applyCoupon: (coupon: { code: string; discountType: string; discountValue: number; target: string }) => void;
  removeCoupon: () => void;
  
  toggleProduct: (product: ProductType) => void;
  setCurrentMenu: (menu: ProductType | null) => void;
  /** Deja activo solo el producto indicado (según desde dónde se entró al configurador) */
  startWithProduct: (product: ProductType) => void;
  
  // Computed
  getSubtotal: () => number;
  getTotalPrice: () => number;
  
  resetConfigurator: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  model: 'Asgard',
  sizeType: 'standard',
  customLength: 170,
  customWidth: 110,
  finish: 'Mate',
  woodTexture: 'Pino',
  shelfWoodTexture: 'Pino',
  shelfFinish: 'Mate',
  deskWoodTexture: 'Pino',
  deskFinish: 'Mate',
  isCovered: false,
  matColor: 'Azul',
  structureStyle: 'Un sólo tono',
  accessories: {
    led: true, 
    resourceBox: 0,
    tray: 0,
    cupholder: 0,
    drawer: false,
    chairs: 0,
    extension: 0,
  },
  shippingState: '',
  shippingCost: 0,
  couponCode: null,
  couponDiscountType: null,
  couponDiscountValue: null,
  couponTarget: null,

  activeProducts: { table: true, shelf: false, desk: false },
  currentMenu: 'table',

  setModel: (model) => set((state) => {
    const isAsgard = model === 'Asgard';
    const length = MODELS[model].standardSize.length;
    const width = MODELS[model].standardSize.width;
    const category = getTableCategory(length, width);
    
    // Remove the free 6 cupholders logic for Asgard based on user feedback
    const baseAccessories = {
      ...state.accessories,
      led: isAsgard,
      cupholder: state.accessories.cupholder
    };

    return { 
      model, 
      customLength: length, 
      customWidth: width,
      accessories: clampAccessories(baseAccessories, category)
    };
  }),
  setSizeType: (sizeType) => set((state) => {
    const length = sizeType === 'standard' ? MODELS[state.model].standardSize.length : state.customLength;
    const width = sizeType === 'standard' ? MODELS[state.model].standardSize.width : state.customWidth;
    const category = getTableCategory(length, width);
    return { 
      sizeType,
      customLength: length,
      customWidth: width,
      accessories: clampAccessories(state.accessories, category)
    };
  }),
  setCustomDimensions: (length, width) => set((state) => {
    const category = getTableCategory(length, width);
    return { 
      customLength: length, 
      customWidth: width,
      accessories: clampAccessories(state.accessories, category)
    };
  }),
  setFinish: (finish) => set({ finish }),
  setWoodTexture: (woodTexture) => set({ woodTexture }),
  setShelfWoodTexture: (shelfWoodTexture) => set({ shelfWoodTexture }),
  setShelfFinish: (shelfFinish) => set({ shelfFinish }),
  setDeskWoodTexture: (deskWoodTexture) => set({ deskWoodTexture }),
  setDeskFinish: (deskFinish) => set({ deskFinish }),
  setIsCovered: (isCovered) => set({ isCovered }),
  setMatColor: (matColor) => set({ matColor }),
  setStructureStyle: (structureStyle) => set({ structureStyle }),
  updateAccessory: (key, value) => set((state) => ({
    accessories: { ...state.accessories, [key]: value }
  })),
  setShipping: (shippingState, shippingCost) => set({ shippingState, shippingCost }),
  
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
  }),

  setCurrentMenu: (menu) => set({ currentMenu: menu }),
  startWithProduct: (product) => set({
    activeProducts: { table: product === 'table', shelf: product === 'shelf', desk: product === 'desk' },
    currentMenu: product,
  }),
  resetConfigurator: () => set((state) => ({
    model: 'Asgard',
    sizeType: 'standard',
    customLength: 170,
    customWidth: 110,
    finish: 'Mate',
    woodTexture: 'Pino',
    shelfWoodTexture: 'Pino',
    shelfFinish: 'Mate',
    deskWoodTexture: 'Pino',
    deskFinish: 'Mate',
    isCovered: false,
    matColor: 'Azul',
    structureStyle: state.structureStyle, // Keep whatever strange string literal is there
    accessories: {
      led: true, 
      resourceBox: 0,
      tray: 0,
      cupholder: 0,
      drawer: false,
      chairs: 0,
      extension: 0,
    },
    shippingState: '',
    shippingCost: 0,
    couponCode: null,
    couponDiscountType: null,
    couponDiscountValue: null,
    couponTarget: null,
    activeProducts: { table: true, shelf: false, desk: false },
    currentMenu: 'table',
  })),
  toggleProduct: (product) => set((state) => {
    const isNowActive = !state.activeProducts[product];
    
    // If turning on, also switch the menu to it
    if (isNowActive) {
      return {
        activeProducts: { ...state.activeProducts, [product]: true },
        currentMenu: product
      };
    } else {
      // Turning off
      const newActive = { ...state.activeProducts, [product]: false };
      let newMenu = state.currentMenu;
      
      // If we turned off the product whose menu is currently open, switch to another active one
      if (state.currentMenu === product) {
        if (newActive.table) newMenu = 'table';
        else if (newActive.desk) newMenu = 'desk';
        else if (newActive.shelf) newMenu = 'shelf';
        else newMenu = null;
      }
      
      return {
        activeProducts: newActive,
        currentMenu: newMenu
      };
    }
  }),

      getSubtotal: () => {
    const state = get();
    let total = 0;

    if (state.activeProducts.table) {
      let tableBasePrice = MODELS[state.model].basePrice;
      const category = getTableCategory(state.customLength, state.customWidth);
      
      if (category === 'Chica') tableBasePrice -= 2000;
      else if (category === 'Grande') tableBasePrice += 3500;
      
      total += tableBasePrice;
      
      const isAsgard = state.model === 'Asgard';

      // El sistema LED viene incluido en la Asgard, sin costo adicional

      const calculatePackPrice = (quantity: number, unitPrice: number, packPrice: number) => {
        const packs = Math.floor(quantity / 6);
        const units = quantity % 6;
        return (packs * packPrice) + (units * unitPrice);
      };

      total += calculatePackPrice(state.accessories.resourceBox, ACCESSORY_PRICES.resourceBox.unit, ACCESSORY_PRICES.resourceBox.pack);
      total += calculatePackPrice(state.accessories.tray, ACCESSORY_PRICES.tray.unit, ACCESSORY_PRICES.tray.pack);
      
      // Asgard: los primeros 6 portavasos son gratis; solo se cobran los extra
      const freeCupholders = isAsgard ? 6 : 0;
      const cupholdersToCharge = Math.max(0, state.accessories.cupholder - freeCupholders);
      total += calculatePackPrice(cupholdersToCharge, ACCESSORY_PRICES.cupholder.unit, ACCESSORY_PRICES.cupholder.pack);

      if (state.accessories.drawer) total += ACCESSORY_PRICES.drawer;
      // Sillas: $3,200 c/u o $17,500 el paquete de 6
      if (state.accessories.chairs > 0) total += calculatePackPrice(state.accessories.chairs, 3200, 17500);
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
  }
}));
