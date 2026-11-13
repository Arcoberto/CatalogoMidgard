import { prisma } from '@/lib/prisma';
import { MODELS, ACCESSORY_PRICES } from '@/store/useConfiguratorStore';

export type PackPrice = { unit: number; pack: number };

export type CatalogPrices = {
  models: { Asgard: number; Midgard: number };
  resourceBox: PackPrice;
  tray: PackPrice;
  cupholder: PackPrice;
  extension: PackPrice;
  drawer: number;
};

// Valores por defecto (los del código) por si la BD no responde
export const DEFAULT_CATALOG_PRICES: CatalogPrices = {
  models: { Asgard: MODELS.Asgard.basePrice, Midgard: MODELS.Midgard.basePrice },
  resourceBox: ACCESSORY_PRICES.resourceBox,
  tray: ACCESSORY_PRICES.tray,
  cupholder: ACCESSORY_PRICES.cupholder,
  extension: ACCESSORY_PRICES.extension,
  drawer: ACCESSORY_PRICES.drawer,
};

type RawPrices = {
  models?: { name: string; basePrice: number }[];
  accessories?: { key: string; unitPrice: number; packPrice: number | null }[];
};

/** Convierte la respuesta de /api/prices (mesas + accesorios del admin) a la estructura del sitio */
export function toCatalogPrices(raw: RawPrices | null | undefined): CatalogPrices {
  const out: CatalogPrices = JSON.parse(JSON.stringify(DEFAULT_CATALOG_PRICES));
  for (const m of raw?.models ?? []) {
    if (m.name === 'Asgard' || m.name === 'Midgard') out.models[m.name] = m.basePrice;
  }
  for (const a of raw?.accessories ?? []) {
    if (a.key === 'drawer') out.drawer = a.unitPrice;
    if (a.key === 'resourceBox' || a.key === 'tray' || a.key === 'cupholder' || a.key === 'extension') {
      out[a.key] = { unit: a.unitPrice, pack: a.packPrice ?? out[a.key].pack };
    }
  }
  return out;
}

/** Lado servidor: lee mesas y accesorios de la BD */
export async function getCatalogPrices(): Promise<CatalogPrices> {
  try {
    const [models, accessories] = await Promise.all([prisma.tableModel.findMany(), prisma.accessory.findMany()]);
    return toCatalogPrices({ models, accessories });
  } catch (error) {
    console.error('Error leyendo precios de mesas/accesorios, usando valores por defecto:', error);
    return DEFAULT_CATALOG_PRICES;
  }
}
