'use client';

import { useEffect, useState, MouseEvent } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

type Photo = { src: string; alt?: string };

const ZOOM = 2.5;

export default function ProductGallery({ photos, className = 'h-80' }: { photos: Photo[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const [lbZoom, setLbZoom] = useState<{ x: number; y: number } | null>(null);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + photos.length) % photos.length);
    setZoom(null);
    setLbZoom(null);
  };

  const pos = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  const photo = photos[index];

  const Arrows = ({ dark = false }: { dark?: boolean }) => {
    const circle = `flex items-center justify-center rounded-full p-2 shadow pointer-events-none transition ${dark ? 'bg-white/20 text-white group-hover/arrow:bg-white/30' : 'bg-white/90 text-midgard-navy group-hover/arrow:bg-white'}`;
    // Área clicable grande e invisible (w-16 h-24) con el círculo visual del mismo tamaño de siempre
    const hit = 'group/arrow absolute top-1/2 -translate-y-1/2 z-30 w-16 h-24 flex items-center justify-center cursor-pointer';
    return (
      <>
        <button type="button" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); go(-1); }}
          onMouseMove={(e) => { e.stopPropagation(); if (!dark) setZoom(null); }} className={`${hit} left-0`}>
          <span className={circle}><ChevronLeft className="w-5 h-5" /></span>
        </button>
        <button type="button" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); go(1); }}
          onMouseMove={(e) => { e.stopPropagation(); if (!dark) setZoom(null); }} className={`${hit} right-0`}>
          <span className={circle}><ChevronRight className="w-5 h-5" /></span>
        </button>
      </>
    );
  };

  return (
    <div
      className="w-full bg-white select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Imagen principal: centrada, zoom al pasar el mouse, clic para pantalla completa */}
      <div
        className={`relative w-full overflow-hidden bg-gray-50 cursor-zoom-in ${className}`}
        onMouseMove={(e) => setZoom(pos(e))}
        onMouseLeave={() => setZoom(null)}
        onClick={() => setLightbox(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt ?? ''}
          className="w-full h-full object-contain object-center transition-transform duration-100 ease-out select-none"
          style={zoom ? { transform: `scale(${ZOOM})`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          draggable={false}
        />
        {/* Capa transparente: evita "Guardar imagen como" sobre la foto */}
        <div className="absolute inset-0 z-10" aria-hidden="true" />
        <span className="absolute bottom-3 right-3 z-20 flex items-center gap-1 text-xs bg-black/50 text-white px-2 py-1 rounded-full pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" /> {index + 1}/{photos.length}
        </span>
        {photos.length > 1 && <Arrows />}
      </div>


      {/* Pantalla completa */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button type="button" aria-label="Cerrar" onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
            <X className="w-6 h-6" />
          </button>
          <div
            className={`relative w-[92vw] h-[85vh] overflow-hidden ${lbZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={(e) => { e.stopPropagation(); setLbZoom(lbZoom ? null : pos(e)); }}
            onMouseMove={(e) => lbZoom && setLbZoom(pos(e))}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt ?? ''}
              className="w-full h-full object-contain select-none transition-transform duration-100"
              style={lbZoom ? { transform: `scale(${ZOOM})`, transformOrigin: `${lbZoom.x}% ${lbZoom.y}%` } : undefined}
              draggable={false}
            />
            <div className="absolute inset-0 z-10" aria-hidden="true" />
            {photos.length > 1 && <Arrows dark />}
          </div>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">{index + 1} / {photos.length}</span>
        </div>
      )}
    </div>
  );
}
