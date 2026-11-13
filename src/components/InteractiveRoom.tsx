'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProductId = 'mesa' | 'sillas' | 'cajon' | 'estante' | 'escritorio';

// Coordenadas sobre la imagen original (1024 x 571). El orden importa: lo último queda encima.
const HOTSPOTS: { id: ProductId; label: string; href: string; points: string }[] = [
  { id: 'escritorio', label: 'Escritorio', href: '/escritorios', points: '355,205 692,205 692,288 555,288 555,330 498,330 498,385 355,385' },
  { id: 'estante', label: 'Estante', href: '/estantes', points: '100,20 352,55 352,468 125,468 100,200' },
  { id: 'cajon', label: 'Accesorios', href: '/accesorios', points: '40,282 140,282 215,350 215,532 40,532' },
  { id: 'mesa', label: 'Mesa de juego', href: '/mesas', points: '555,286 892,286 892,450 838,450 838,556 790,556 790,400 640,400 640,505 555,505' },
  { id: 'sillas', label: 'Sillas', href: '/sillas', points: '496,262 612,258 645,330 645,510 496,510' },
  { id: 'sillas', label: 'Sillas', href: '/sillas', points: '832,300 900,268 958,275 958,556 768,556 768,400 832,380' },
];

const IMAGES: Record<ProductId | 'base', string> = {
  base: '/images/hero/sala1.jpg',
  mesa: '/images/hero/mesa.jpg',
  sillas: '/images/hero/sillas.jpg',
  cajon: '/images/hero/cajon.jpg',
  estante: '/images/hero/estante.jpg',
  escritorio: '/images/hero/escritorio.jpg',
};

const LEGEND: { id: ProductId; label: string }[] = [
  { id: 'mesa', label: 'Mesa' },
  { id: 'sillas', label: 'Sillas' },
  { id: 'cajon', label: 'Accesorios' },
  { id: 'estante', label: 'Estante' },
  { id: 'escritorio', label: 'Escritorio' },
];

const ARTICLE: Record<ProductId, string> = {
  mesa: 'la', sillas: 'las', cajon: 'los', estante: 'el', escritorio: 'el',
};

export default function InteractiveRoom() {
  const [active, setActive] = useState<ProductId | null>(null);
  const router = useRouter();
  const current = active ? LEGEND.find((l) => l.id === active)?.label : null;

  return (
    <div className="w-full max-w-[1024px] mx-auto select-none" onContextMenu={(e) => e.preventDefault()}>
      {/* Máximo 1024px (tamaño original de la imagen) para no perder calidad */}
      <div className="relative w-full aspect-[1024/571] rounded-3xl overflow-hidden shadow-2xl bg-midgard-black">
        {/* Todas las imágenes apiladas; se hace fundido entre ellas */}
        {(Object.keys(IMAGES) as (ProductId | 'base')[]).map((key) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={IMAGES[key]}
            alt={key === 'base' ? 'Sala con los productos Midgard' : `Producto destacado: ${key}`}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out"
            style={{ opacity: (active ?? 'base') === key ? 1 : 0 }}
          />
        ))}

        {/* Zonas interactivas: "slice" recorta igual que object-cover, así las zonas siguen alineadas */}
        <svg viewBox="0 0 1024 571" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10" onMouseLeave={() => setActive(null)}>
          {HOTSPOTS.map((h, i) => (
            <polygon
              key={i}
              points={h.points}
              fill="transparent"
              className="cursor-pointer"
              aria-label={h.label}
              onMouseEnter={() => setActive(h.id)}
              onClick={() => router.push(h.href)}
            />
          ))}
        </svg>

        {/* Etiqueta del producto activo */}
        <div
          className={`absolute top-5 left-5 z-20 pointer-events-none transition-all duration-300 ${current ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        >
          <span className="bg-midgard-purple text-white text-sm font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
            {current}
          </span>
        </div>
        <span className="absolute bottom-4 right-4 z-20 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none hidden md:block">
          Pasa el mouse sobre los muebles
        </span>
      </div>

      {/* Leyenda: solo resalta el producto en la imagen; para ir a la página hay que tocar la imagen */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {LEGEND.map((l) => (
          <button
            key={l.id}
            type="button"
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(l.id); }}
            onPointerLeave={(e) => { if (e.pointerType === 'mouse') setActive(null); }}
            onClick={() => setActive((prev) => (prev === l.id ? null : l.id))}
            aria-pressed={active === l.id}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${active === l.id ? 'bg-midgard-navy text-white border-midgard-navy' : 'bg-white text-midgard-navy border-midgard-light-gray hover:border-midgard-navy'}`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-midgard-gray mt-2 md:hidden">
        {active ? `Toca ${ARTICLE[active]} ${current?.toLowerCase()} en la imagen para ver más` : 'Elige un mueble y tócalo en la imagen para ver más'}
      </p>
    </div>
  );
}
