import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getProductPrices, PRODUCT_PRICE_KEYS, type ProductPriceKey } from '@/lib/productPrices';

// GET público (lo usa el configurador). POST protegido por src/proxy.ts
export async function GET() {
  return NextResponse.json(await getProductPrices());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    for (const key of PRODUCT_PRICE_KEYS) {
      const item = body?.[key];
      if (!item) continue;
      const price = Number(item.price);
      const regular = item.regularPrice === null || item.regularPrice === '' || item.regularPrice === undefined
        ? null
        : Number(item.regularPrice);
      if (!Number.isFinite(price) || price < 0) {
        return NextResponse.json({ error: `Precio inválido para ${key}` }, { status: 400 });
      }
      const data = { price, regularPrice: regular && regular > 0 ? regular : null };
      await prisma.productPrice.upsert({
        where: { key: key as ProductPriceKey },
        update: data,
        create: { key, ...data },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error guardando precios de productos:', error);
    return NextResponse.json({ error: 'No se pudieron guardar los precios' }, { status: 500 });
  }
}
