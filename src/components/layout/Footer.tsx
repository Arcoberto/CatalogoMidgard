import Link from 'next/link';

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
              <li><Link href="#garantia" className="text-midgard-gray hover:text-white transition-colors text-sm">Garantía</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contacto</h3>
            <ul className="space-y-3 text-sm text-midgard-gray">
              <li>Guadalajara, Jalisco, México</li>
              <li>Envíos a toda la República (Transportes Castores)</li>
              <li className="pt-2">
                <a href="https://wa.me/523314137429" className="text-white hover:text-midgard-purple transition-colors flex items-center gap-2">
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
