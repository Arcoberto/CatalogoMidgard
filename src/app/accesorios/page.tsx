import Link from 'next/link';
import { ArrowRight, CheckCircle2, Ruler } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';

export const metadata = { title: 'Accesorios | Midgard Mesas de Juego' };

export default function AccesoriosPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full bg-midgard-light-gray flex justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-midgard-navy leading-tight">ACCESORIOS</h1>
            <p className="text-lg text-midgard-gray max-w-lg leading-relaxed">
              Complementos para tu mesa de juego: cajón para superficies, portavasos y extensores de tablero.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { href: '#cajon', label: 'Cajón para superficies' },
                { href: '#portavasos', label: 'Portavasos' },
                { href: '#extensores', label: 'Extensores de tablero' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="bg-white text-midgard-navy border border-midgard-light-gray px-5 py-2.5 rounded-full text-sm font-semibold hover:border-midgard-navy transition-all">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/accesorios/cajon-1.jpg" alt="Cajón para superficies de mesa" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 1. Cajón para superficies */}
      <section id="cajon" className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-midgard-light-gray">
            <ProductGallery
              className="h-[28rem]"
              photos={[2, 3, 4, 5].map((n) => ({
                src: `/images/accesorios/cajon-${n}.jpg`,
                alt: `Cajón para superficies - foto ${n}`,
              }))}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-midgard-navy mb-4">Cajón para superficies de mesa</h2>
              <p className="text-midgard-gray leading-relaxed">
                Un espacio práctico para guardar y mantener organizadas las superficies cuando no están montadas en la mesa. Disponible en colores y acabados personalizables.
              </p>
            </div>

            <div className="rounded-2xl border border-midgard-light-gray p-5">
              <p className="text-sm text-midgard-gray mb-1">Precio</p>
              <p className="text-4xl font-bold text-midgard-steel">$3,000 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3">Características principales</h3>
              <div className="space-y-2">
                {['Guarda las superficies cuando no están montadas', 'Medidas ajustables según el tamaño de tu mesa', 'Colores y acabados personalizables'].map((c) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3 flex items-center gap-2"><Ruler className="w-5 h-5" /> Medidas aproximadas</h3>
              <div className="overflow-hidden rounded-xl border border-midgard-light-gray">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2.5 font-medium text-midgard-steel">Medidas</td>
                      <td className="px-4 py-2.5 text-right">55 × 35 × 45 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-midgard-gray mt-2">Pueden ajustarse según el tamaño de la mesa.</p>
            </div>

            <Link href="/configurador" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-midgard-navy text-white text-center rounded-xl font-semibold hover:bg-midgard-black transition-colors">
              Cotizar cajón <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Portavasos */}
      <section id="portavasos" className="w-full bg-midgard-light-gray py-24 px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-midgard-light-gray bg-white">
            <ProductGallery
              className="h-[28rem]"
              photos={[1, 2, 3, 4].map((n) => ({
                src: `/images/accesorios/portavasos-${n}.jpg`,
                alt: `Portavasos exterior - foto ${n}`,
              }))}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-midgard-navy mb-4">Portavasos Exteriores para Mesa de Juegos</h2>
              <div className="space-y-3 text-midgard-gray leading-relaxed">
                <p>
                  Portavasos exteriores diseñados especialmente para mesas de juegos. Permiten colocar tazas y vasos de diferentes tamaños de forma segura.
                </p>
                <p>
                  Gracias a su sistema de rotación y giro, puedes orientar el vaso en la posición más cómoda. Nuestro diseño incluye un canal especial que evita que los líquidos salpiquen el área de juego y protege la mesa de daños a largo plazo.
                </p>
                <p>
                  Son duraderos, muy fáciles de colocar y quitar, y sencillos de reemplazar cuando sea necesario.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-midgard-light-gray bg-white p-5">
                <p className="text-sm text-midgard-gray mb-1">Individual</p>
                <p className="text-3xl font-bold text-midgard-steel">$350 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
              <div className="rounded-2xl border-2 border-midgard-purple/40 bg-midgard-purple/5 p-5">
                <p className="text-sm text-midgard-gray mb-1">Set de 6</p>
                <p className="text-3xl font-bold text-midgard-steel">$1,700 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3">Características principales</h3>
              <div className="space-y-2">
                {['Para tazas y vasos de diferentes tamaños', 'Sistema de rotación y giro', 'Canal que evita salpicaduras sobre el área de juego', 'Fáciles de colocar, quitar y reemplazar'].map((c) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/configurador" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-midgard-navy text-white text-center rounded-xl font-semibold hover:bg-midgard-black transition-colors">
              Cotizar portavasos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Extensores de tablero */}
      <section id="extensores" className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-midgard-light-gray">
            <ProductGallery
              className="h-[28rem]"
              photos={[1, 2, 3, 4].map((n) => ({
                src: `/images/accesorios/extensor-${n}.jpg`,
                alt: `Extensor de tablero individual - foto ${n}`,
              }))}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-midgard-navy mb-4">Extensor de Tablero Individual 33 × 40 cm</h2>
              <div className="space-y-3 text-midgard-gray leading-relaxed">
                <p>
                  Extensor de tablero individual de 33 × 40 cm, ideal para juegos euro donde cada jugador maneja su propio tablero personal, recursos individuales y mecánicas únicas.
                </p>
                <p>
                  También es perfecto para hojas de personaje de rol, miniaturas y sets de dados, manteniendo todo organizado y a la mano durante la partida.
                </p>
                <p>
                  Se coloca sobre el marco de la mesa mediante topes tapizados que protegen la superficie y evitan cualquier daño.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-midgard-light-gray p-5">
                <p className="text-sm text-midgard-gray mb-1">Individual</p>
                <p className="text-3xl font-bold text-midgard-steel">$800 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
              <div className="rounded-2xl border-2 border-midgard-purple/40 bg-midgard-purple/5 p-5">
                <p className="text-sm text-midgard-gray mb-1">Set de 6</p>
                <p className="text-3xl font-bold text-midgard-steel">$4,000 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3">Características principales</h3>
              <div className="space-y-2">
                {['Medidas: 33 × 40 cm', 'Ideal para juegos euro, rol, miniaturas y dados', 'Topes tapizados que protegen el marco de la mesa'].map((c) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/configurador" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-midgard-navy text-white text-center rounded-xl font-semibold hover:bg-midgard-black transition-colors">
              Cotizar extensores <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
