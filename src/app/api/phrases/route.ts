import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET es público (lo usa el carrusel de inicio). POST/DELETE están protegidos por src/proxy.ts
export async function GET() {
  try {
    const phrases = await prisma.phrase.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });
    return NextResponse.json(phrases);
  } catch (error) {
    console.error('Error fetching phrases:', error);
    return NextResponse.json({ error: 'Failed to fetch phrases' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const clean = typeof text === 'string' ? text.trim() : '';
    if (!clean) return NextResponse.json({ error: 'La frase no puede estar vacía' }, { status: 400 });

    const last = await prisma.phrase.findFirst({ orderBy: { order: 'desc' } });
    const phrase = await prisma.phrase.create({ data: { text: clean, order: (last?.order ?? -1) + 1 } });
    return NextResponse.json(phrase);
  } catch (error) {
    console.error('Error creating phrase:', error);
    return NextResponse.json({ error: 'No se pudo guardar la frase' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    await prisma.phrase.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting phrase:', error);
    return NextResponse.json({ error: 'No se pudo eliminar la frase' }, { status: 500 });
  }
}
