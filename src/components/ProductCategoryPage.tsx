import Link from 'next/link';
import { ArrowRight, ImageIcon } from 'lucide-react';

type Item = { name: string; description: string };

export default function ProductCategoryPage({
  title,
  subtitle,
  heroImage,
  items,
}: {
  title: string;
  subtitle: string;
  heroImage?: string;
  items: Item[];
}) {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-midgard-light-gray flex justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-midgard-navy leading-tight">{title}</h1>
            <p className="text-lg text-midgard-gray max-w-lg leading-relaxed">{subtitle}</p>
            <Link href="/configurador" className="bg-midgard-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-midgard-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Ir al configurador
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-midgard-steel to-midgard-navy flex items-center justify-center select-none">
            {heroImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImage} alt={title} className="w-full h-full object-cover" draggable={false} />
                <div className="absolute inset-0" aria-hidden="true" />
              </>
            ) : (
              <span className="text-white/60 text-sm font-medium tracking-widest uppercase">[ Foto de portada pendiente ]</span>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.name} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-midgard-light-gray">
              <div className="h-56 bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-2">
                <ImageIcon className="w-10 h-10" />
                <span className="text-xs tracking-widest uppercase">Foto pendiente</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-midgard-navy mb-2">{item.name}</h3>
                <p className="text-midgard-gray text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
