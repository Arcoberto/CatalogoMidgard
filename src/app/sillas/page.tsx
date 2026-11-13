import Link from 'next/link';
import { ArrowRight, CheckCircle2, Ruler } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';

export const metadata = { title: 'Sillas | Midgard Mesas de Juego' };

const MEDIDAS = [
  { label: 'Altura total', value: '76 – 91 cm' },
  { label: 'Altura del asiento', value: '43 – 51 cm' },
  { label: 'Ancho del asiento', value: '41 – 51 cm' },
  { label: 'Profundidad del asiento', value: '41 – 46 cm' },
];

const PERSONALIZABLE = ['Tipo de madera', 'Acabado', 'Tono de la madera', 'Tono del tapiz (azul, gris, tinto/rojo y más opciones)'];

export default function SillasPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full bg-midgard-light-gray flex justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-midgard-navy leading-tight">SILLAS</h1>
            <p className="text-lg text-midgard-gray max-w-lg leading-relaxed">
              Silla de comedor personalizada de madera sólida, diseñada para ofrecer comodidad y durabilidad a largo plazo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/configurador" className="bg-midgard-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-midgard-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Cotizar sillas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sillas/silla-tinto.jpg" alt="Silla de madera sólida con tapiz tinto" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Detalle del producto */}
      <section id="detalle" className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-midgard-light-gray">
            <ProductGallery
              className="h-[28rem]"
              photos={[
                { src: '/images/sillas/silla-medidas.jpg', alt: 'Medidas de la silla' },
                { src: '/images/sillas/silla-azul.jpg', alt: 'Silla con tapiz azul' },
                { src: '/images/sillas/silla-gris.jpg', alt: 'Silla con tapiz gris' },
                { src: '/images/sillas/silla-tinto.jpg', alt: 'Silla con tapiz tinto' },
              ]}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-midgard-navy mb-4">Silla de comedor</h2>
              <p className="text-midgard-gray leading-relaxed">
                Su estructura de madera maciza garantiza resistencia y estabilidad, mientras que el asiento y el respaldo tapizados brindan un soporte cómodo y agradable al tacto. El diseño limpio y elegante, con líneas suaves y un respaldo vertical, se adapta perfectamente tanto a espacios modernos como a ambientes más clásicos.
              </p>
            </div>

            {/* Precios */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-midgard-light-gray p-5">
                <p className="text-sm text-midgard-gray mb-1">Silla individual</p>
                <p className="text-3xl font-bold text-midgard-steel">$3,200 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
              <div className="rounded-2xl border-2 border-midgard-purple/40 bg-midgard-purple/5 p-5">
                <p className="text-sm text-midgard-gray mb-1">Paquete de 6 sillas</p>
                <p className="text-3xl font-bold text-midgard-steel">$17,500 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
            </div>

            {/* Características */}
            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3">Características principales</h3>
              <div className="space-y-2">
                {['Material: madera sólida', 'Cómodas y muy resistentes', 'Ideales para uso diario'].map((c) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple shrink-0" /> {c}
                  </div>
                ))}
              </div>
              <p className="font-semibold text-midgard-navy text-sm mt-4 mb-2">Personalizable:</p>
              <div className="space-y-2">
                {PERSONALIZABLE.map((c) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Medidas */}
            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3 flex items-center gap-2"><Ruler className="w-5 h-5" /> Medidas</h3>
              <div className="overflow-hidden rounded-xl border border-midgard-light-gray">
                <table className="w-full text-sm">
                  <tbody>
                    {MEDIDAS.map((m, i) => (
                      <tr key={m.label} className={i % 2 === 0 ? 'bg-white' : 'bg-midgard-light-gray'}>
                        <td className="px-4 py-2.5 font-medium text-midgard-steel">{m.label}</td>
                        <td className="px-4 py-2.5 text-right">{m.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-midgard-gray text-sm leading-relaxed italic">
              Cada silla se fabrica a medida según tus preferencias de madera, acabado y color de tapiz, para que combine perfectamente con tu comedor.
            </p>

            <Link href="/configurador" className="block w-full py-3 px-4 bg-midgard-navy text-white text-center rounded-xl font-semibold hover:bg-midgard-black transition-colors">
              Cotizar sillas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
