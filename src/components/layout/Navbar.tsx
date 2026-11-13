"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Caveat } from 'next/font/google';

const handwritten = Caveat({ subsets: ['latin'], weight: ['700'] });

// Promociones aparece tachado con "Buen Fin" escrito a mano encima
function NavLabel({ name }: { name: string }) {
  if (name !== 'Promociones') return <>{name}</>;
  return (
    <span className="relative inline-block">
      <span className="line-through decoration-red-600 decoration-2">{name}</span>
      <span
        className={`${handwritten.className} absolute left-1/2 -top-4 -translate-x-1/2 -rotate-12 text-red-600 text-xl xl:text-2xl normal-case tracking-normal whitespace-nowrap pointer-events-none`}
        aria-hidden="true"
      >
        Buen Fin
      </span>
    </span>
  );
}

const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Mesas', href: '/mesas' },
  { name: 'Sillas', href: '/sillas' },
  { name: 'Estantes', href: '/estantes' },
  { name: 'Escritorios', href: '/escritorios' },
  { name: 'Accesorios', href: '/accesorios' },
  { name: 'Promociones', href: '/promociones' },
  { name: 'Configurador', href: '/configurador' },
  { name: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-midgard-light-gray transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          {/* Logo: la imagen tiene mucho margen transparente y está escalada,
              así que solo la zona visible del logo es clicable */}
          <div className="relative flex-shrink-0 flex items-center justify-center gap-3 ml-4 mr-8 xl:mr-12">
            <img 
              src="/logo-indigo.png" 
              alt="" 
              aria-hidden="true"
              className="h-28 w-auto object-contain scale-[1.7] origin-left pointer-events-none"
            />
            <Link
              href="/"
              aria-label="Midgard Mesas de Juego - Inicio"
              className="absolute left-[60%] top-[21%] w-[50%] h-[60%] rounded-lg"
            />
          </div>

          {/* Desktop Nav */}
          <div className="relative z-10 hidden lg:flex lg:items-center lg:space-x-4 xl:space-x-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="inline-block py-2 text-midgard-steel hover:text-midgard-navy transition-colors font-medium text-xs xl:text-sm uppercase tracking-wide whitespace-nowrap"
              >
                <NavLabel name={link.name} />
              </Link>
            ))}
            <a
              href="https://wa.me/523314137429"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-block bg-midgard-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="relative z-10 flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-midgard-navy hover:text-midgard-steel focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-midgard-light-gray"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-midgard-steel hover:text-midgard-navy uppercase tracking-wide"
                >
                  <NavLabel name={link.name} />
                </Link>
              ))}
              <a
                href="https://wa.me/523314137429"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full text-center bg-midgard-navy text-white px-6 py-3 rounded-full font-semibold"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
