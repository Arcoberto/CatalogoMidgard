import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const models = await prisma.tableModel.findMany();
    const accessories = await prisma.accessory.findMany();

    return NextResponse.json({ models, accessories });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Update Models
    if (data.models && Array.isArray(data.models)) {
      for (const mod of data.models) {
        await prisma.tableModel.update({
          where: { name: mod.name },
          data: { basePrice: mod.basePrice }
        });
      }
    }
    
    // Update Accessories
    if (data.accessories && Array.isArray(data.accessories)) {
      for (const acc of data.accessories) {
        await prisma.accessory.update({
          where: { key: acc.key },
          data: { 
            unitPrice: acc.unitPrice, 
            packPrice: acc.packPrice !== undefined ? acc.packPrice : null 
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating prices:', error);
    return NextResponse.json({ error: 'Failed to update prices' }, { status: 500 });
  }
}
