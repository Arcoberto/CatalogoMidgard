"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
          <div className="relative flex-shrink-0 flex items-center justify-center gap-3 ml-4">
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
          <div className="relative z-10 hidden md:flex md:items-center md:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="inline-block py-2 text-midgard-steel hover:text-midgard-navy transition-colors font-medium text-sm uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/523314137429"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-midgard-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="relative z-10 flex items-center md:hidden">
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
            className="md:hidden bg-white border-b border-midgard-light-gray"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-midgard-steel hover:text-midgard-navy uppercase tracking-wide"
                >
                  {link.name}
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
