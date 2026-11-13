// Autenticación simple del panel de administración.
// La contraseña se define en la variable de entorno ADMIN_PASSWORD (nunca en el código).

export const ADMIN_COOKIE = 'midgard_admin';
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

async function sha256(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Token que se guarda en la cookie de sesión. null si no hay contraseña configurada. */
export async function getAdminToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256(`midgard-admin:${password}`);
}

export async function isValidAdminToken(token: string | undefined): Promise<boolean> {
  const expected = await getAdminToken();
  return !!expected && !!token && token === expected;
}
