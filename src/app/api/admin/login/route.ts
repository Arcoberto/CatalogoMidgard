import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE, getAdminToken } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: 'ADMIN_PASSWORD no está configurada en el servidor' }, { status: 500 });
  }
  if (typeof password !== 'string' || password !== expected) {
    await new Promise((r) => setTimeout(r, 800)); // frena intentos por fuerza bruta
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, (await getAdminToken())!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
