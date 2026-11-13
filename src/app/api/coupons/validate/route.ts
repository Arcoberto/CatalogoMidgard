import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Cupón fijo del Buen Fin: BF26 = 10% de descuento en todo (sin importar mayúsculas/minúsculas)
    if (String(code).trim().toUpperCase() === 'BF26') {
      return NextResponse.json({ code: 'BF26', discountType: 'percentage', discountValue: 10, target: 'general', isActive: true });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Cupón incorrecto' }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: 'El cupón ya no está activo' }, { status: 400 });
    }

    return NextResponse.json(coupon);
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Error validating coupon' }, { status: 500 });
  }
}
