import { prisma } from '@/lib/prisma';

export type ProductPriceKey = 'shelf' | 'desk' | 'chair' | 'chairPack';

export type ProductPrice = {
  key: ProductPriceKey;
  name: string;
  price: number;
  /** Precio anterior (se muestra tachado). null = sin promoción */
  regularPrice: number | null;
};

// Valores por defecto: se usan si la base de datos aún no tiene el precio o no responde
export const DEFAULT_PRODUCT_PRICES: Record<ProductPriceKey, ProductPrice> = {
  shelf: { key: 'shelf', name: 'Estante', price: 4800, regularPrice: 6000 },
  desk: { key: 'desk', name: 'Escritorio Elevable', price: 9490, regularPrice: 13000 },
  chair: { key: 'chair', name: 'Silla individual', price: 3200, regularPrice: null },
  chairPack: { key: 'chairPack', name: 'Paquete de 6 sillas', price: 17500, regularPrice: null },
};

export const PRODUCT_PRICE_KEYS = Object.keys(DEFAULT_PRODUCT_PRICES) as ProductPriceKey[];

/** Lee los precios de la BD (lado servidor) combinándolos con los valores por defecto */
export async function getProductPrices(): Promise<Record<ProductPriceKey, ProductPrice>> {
  const result = { ...DEFAULT_PRODUCT_PRICES };
  try {
    const rows = await prisma.productPrice.findMany();
    for (const row of rows) {
      if (row.key in result) {
        const key = row.key as ProductPriceKey;
        result[key] = { key, name: result[key].name, price: row.price, regularPrice: row.regularPrice };
      }
    }
  } catch (error) {
    console.error('Error leyendo precios de productos, usando valores por defecto:', error);
  }
  return result;
}

export function formatMXN(n: number) {
  return `$${n.toLocaleString('en-US')}`;
}

/** Porcentaje de descuento entero, o null si no hay promoción */
export function discountPct(p: ProductPrice): number | null {
  if (!p.regularPrice || p.regularPrice <= p.price) return null;
  const pct = Math.round((1 - p.price / p.regularPrice) * 100);
  return pct >= 1 ? pct : null;
}
