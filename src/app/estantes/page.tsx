import Link from 'next/link';
import { ArrowRight, CheckCircle2, Ruler } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';
import { getProductPrices, formatMXN, discountPct } from '@/lib/productPrices';

// Los precios se editan desde el panel de administración
export const dynamic = 'force-dynamic';


export const metadata = { title: 'Estantes | Midgard Mesas de Juego' };

const MEDIDAS = [
  { label: 'Alto', value: '180 cm' },
  { label: 'Ancho', value: '120 cm' },
  { label: 'Fondo', value: '24 cm' },
];

const CARACTERISTICAS = [
  'Estructura metálica negra',
  'Madera 100% natural y sólida',
  'Soporta aproximadamente 80 kg',
  'Niveles a diferentes alturas para cajas de juegos pequeñas y grandes',
];

const PERSONALIZABLE = ['Tono de la madera', 'Tipo de barniz (mate o brillante)'];

export default async function EstantesPage() {
  const price = (await getProductPrices()).shelf;
  const pct = discountPct(price);
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full bg-midgard-light-gray flex justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-midgard-navy leading-tight">ESTANTES</h1>
            <p className="text-lg text-midgard-gray max-w-lg leading-relaxed">
              Diseño industrial y acabado minimalista que combina a la perfección con cualquier decoración moderna.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/configurador?product=shelf" className="bg-midgard-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-midgard-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Cotizar estante
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/estantes/estante-nogal.jpg" alt="Estantería industrial en tono nogal" className="w-full h-full object-cover object-center" draggable={false} />
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
                { src: '/images/estantes/estante-medidas.jpg', alt: 'Medidas del estante' },
                { src: '/images/estantes/estante-juegos.jpg', alt: 'Estante con juegos de mesa' },
                { src: '/images/estantes/estante-nogal.jpg', alt: 'Estante en tono nogal' },
                { src: '/images/estantes/estante-negro.jpg', alt: 'Estante en tono negro' },
                { src: '/images/estantes/estante-uso.jpg', alt: 'Estante en uso' },
                { src: '/images/estantes/estante-detalles.jpg', alt: 'Detalles del estante' },
              ]}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-midgard-navy mb-4">Estantería Industrial Minimalista en Madera Natural</h2>
              <div className="space-y-3 text-midgard-gray leading-relaxed">
                <p>
                  Sus diferentes alturas y niveles están pensados para acomodar todo tipo de cajas de juegos de mesa, desde las más pequeñas hasta las más grandes, manteniendo todo organizado y a la vista. La estructura metálica negra, junto con la madera natural, sólida y personalizable, le da gran estabilidad, soportando aproximadamente 80 kg de peso.
                </p>
                <p>
                  Fabricada con madera 100% natural, esta estantería no solo es funcional, sino que también eleva el aspecto de tu espacio con un estilo limpio, moderno y atemporal.
                </p>
              </div>
            </div>

            {/* Precio */}
            <div className="rounded-2xl border-2 border-midgard-purple/40 bg-midgard-purple/5 p-5 flex items-center justify-between gap-4">
              <div>
                {pct && <span className="inline-block bg-midgard-purple text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">Buen Fin</span>}
                {pct && <p className="text-sm text-midgard-gray line-through">{formatMXN(price.regularPrice!)} MXN</p>}
                <p className="text-4xl font-bold text-midgard-steel">{formatMXN(price.price)} <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
              {pct && <span className="text-2xl font-bold text-[#50C878]">-{pct}%</span>}
            </div>

            {/* Características */}
            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3">Características principales</h3>
              <div className="space-y-2">
                {CARACTERISTICAS.map((c) => (
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
              <h3 className="text-xl font-bold text-midgard-navy mb-3 flex items-center gap-2"><Ruler className="w-5 h-5" /> Medidas generales</h3>
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
              Ideal para coleccionistas de juegos de mesa que buscan orden, estilo y durabilidad en un solo mueble.
            </p>

            <Link href="/configurador?product=shelf" className="block w-full py-3 px-4 bg-midgard-navy text-white text-center rounded-xl font-semibold hover:bg-midgard-black transition-colors">
              Cotizar estante
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
