'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type MediaItem = { type: 'image' | 'video'; src: string; alt?: string };

export default function MediaCarousel({ items, className = 'h-64' }: { items: MediaItem[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + items.length) % items.length);
  const item = items[index];

  return (
    <div className={`relative w-full overflow-hidden bg-black ${className}`}>
      {item.type === 'video' ? (
        <video
          key={item.src}
          src={item.src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={item.src} src={item.src} alt={item.alt ?? ''} className="w-full h-full object-cover" />
      )}

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-midgard-navy rounded-full p-2 shadow z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-midgard-navy rounded-full p-2 shadow z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-white w-6' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
