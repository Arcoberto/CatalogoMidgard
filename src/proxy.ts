import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidAdminToken } from '@/lib/adminAuth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // La página de login siempre es accesible
  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  // Lectura pública de precios (la tienda la necesita)
  if (pathname === '/api/prices' && method === 'GET') return NextResponse.next();

  const authorized = await isValidAdminToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (authorized) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/prices', '/api/coupons'],
};
