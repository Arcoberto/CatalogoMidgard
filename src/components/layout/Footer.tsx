import Link from 'next/link';

// Íconos de marca (Simple Icons, 24x24)
const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/MesasMidgard',
    icon: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mesasmidgard/',
    icon: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.25-3.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/c/5213314137429',
    icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z',
  },
];

export function Footer() {
  return (
    <footer className="bg-midgard-black text-midgard-light-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-sans font-bold text-2xl tracking-tight text-white mb-4 block">
              MIDGARD
            </Link>
            <p className="text-midgard-gray text-sm mb-6 leading-relaxed">
              Mesas premium diseñadas para transformar cada partida en una experiencia inolvidable.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-midgard-purple"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Explorar</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-midgard-gray hover:text-white transition-colors text-sm">Inicio</Link></li>
              <li><Link href="#modelos" className="text-midgard-gray hover:text-white transition-colors text-sm">Modelos</Link></li>
              <li><Link href="/configurador" className="text-midgard-gray hover:text-white transition-colors text-sm">Configurador</Link></li>
              <li><Link href="#galeria" className="text-midgard-gray hover:text-white transition-colors text-sm">Galería</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Soporte</h3>
            <ul className="space-y-3">
              <li><Link href="#faq" className="text-midgard-gray hover:text-white transition-colors text-sm">Preguntas Frecuentes</Link></li>
              <li><Link href="#envios" className="text-midgard-gray hover:text-white transition-colors text-sm">Información de Envíos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-3 text-sm text-midgard-gray">
              <li>Guadalajara, Jalisco, México</li>
              <li>Envíos a toda la República (Paquetería Tres Guerras)</li>
              <li className="pt-2">
                <a href="https://wa.me/523314137429" target="_blank" rel="noopener noreferrer" className="text-white hover:text-midgard-purple transition-colors flex items-center gap-2">
                  <span>WhatsApp: +52 33 1413 7429</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-midgard-steel/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-midgard-gray text-xs">
            © {new Date().getFullYear()} Midgard Mesas de Juego. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-midgard-gray hover:text-white transition-colors text-xs">Términos y Condiciones</a>
            <a href="#" className="text-midgard-gray hover:text-white transition-colors text-xs">Aviso de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
