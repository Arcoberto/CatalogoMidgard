import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import ProductGallery from '@/components/ProductGallery';

export const metadata = { title: 'Mesas | Midgard Mesas de Juego' };

export default function MesasPage() {
  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full bg-midgard-light-gray flex justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <span className="text-midgard-purple font-semibold tracking-wider uppercase text-sm border border-midgard-purple/30 px-3 py-1 rounded-full bg-midgard-purple/10">
              Nueva Colección
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-midgard-navy leading-tight">
              EL SAVEGAME DE <br/>
              <span className="text-midgard-steel">LOS JUEGOS DE MESA</span>
            </h1>
            <p className="text-lg text-midgard-gray max-w-lg leading-relaxed">
              Mesas de comedor diseñadas para transformar tu espacio en una sala de juegos. Haz de cada partida una experiencia inolvidable. Artesanía, tecnología y diseño en tu sala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/configurador" className="bg-midgard-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-midgard-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Configurar mi mesa
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#modelos" className="bg-white text-midgard-navy border border-midgard-light-gray px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center justify-center">
                Ver modelos
              </Link>
            </div>
          </div>
          <div
            className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl select-none"
            onContextMenu={undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero/mesas-portada.jpg" alt="Mesa de juego Midgard con portavasos" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Stats / Trust section */}
      <section className="w-full bg-white py-16 px-4 border-b border-midgard-light-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-midgard-purple mb-2" />
            <h3 className="text-3xl font-bold text-midgard-navy">Premium</h3>
            <p className="text-midgard-gray text-sm">Madera sólida, durabilidad más de 30 años</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-8 h-8 text-midgard-purple mb-2" />
            <h3 className="text-3xl font-bold text-midgard-navy">RGB</h3>
            <p className="text-midgard-gray text-sm">Iluminación inmersiva</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-midgard-purple mb-2" />
            <h3 className="text-3xl font-bold text-midgard-navy">100%</h3>
            <p className="text-midgard-gray text-sm">Personalizable</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl font-bold text-midgard-navy mb-2">+300</h3>
            <p className="text-midgard-gray text-sm">Mesas creadas</p>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="modelos" className="w-full bg-midgard-light-gray py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-midgard-navy mb-4">Nuestros Modelos</h2>
            <p className="text-midgard-gray max-w-2xl mx-auto">
              Descubre las mesas base que ofrecemos. Ambas pueden ser configuradas con diferentes acabados, tapetes y accesorios para adaptarse a tu estilo de juego.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* ASGARD */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-midgard-purple/20 relative group hover:shadow-2xl transition-all">
              <div className="absolute top-6 right-6 bg-midgard-purple text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full z-10 shadow-md">
                PROMOCIÓN ESPECIAL
              </div>
              <ProductGallery
                className="h-80"
                photos={Array.from({ length: 11 }, (_, i) => ({
                  src: `/images/asgard/asgard-${i + 1}.jpg`,
                  alt: `Mesa Asgard - foto ${i + 1}`,
                }))}
              />
              <div className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-3xl font-bold text-midgard-navy">ASGARD</h3>
                  <div className="text-right">
                    <p className="text-sm text-midgard-gray line-through">$21,300 MXN</p>
                    <p className="text-2xl font-bold text-red-600">$19,170 <span className="text-sm font-normal">MXN</span></p>
                    <p className="text-xs font-bold uppercase tracking-wide text-red-600">o 3 MSI · Buen Fin</p>
                  </div>
                </div>
                <p className="text-midgard-gray mb-6 h-12">
                  Mesa premium para jugadores exigentes que buscan la máxima experiencia de juego.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple" />
                    Medidas: 170 x 110 x 75 cm
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple" />
                    Sistema LED controlado por app (Incluido)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple" />
                    Difusor LED (Incluido)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple" />
                    Juego de 6 portavasos (Incluido)
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple" />
                    Hoja tapizada con paño de lana
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple" />
                    Alfombra de uso rudo en la base
                  </div>
                </div>

                <Link href="/configurador?model=Asgard" className="block w-full py-3 px-4 bg-midgard-navy text-white text-center rounded-xl font-semibold hover:bg-midgard-black transition-colors">
                  Configurar Asgard
                </Link>
              </div>
            </div>

            {/* MIDGARD */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-transparent relative group hover:shadow-2xl transition-all">
              <ProductGallery
                className="h-80"
                photos={[8, 1, 2, 3, 4, 5, 6, 7, 9, 10].map((n) => ({
                  src: `/images/midgard/midgard-${n}.jpg`,
                  alt: `Mesa Midgard - foto ${n}`,
                }))}
              />
              <div className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-3xl font-bold text-midgard-navy">MIDGARD</h3>
                  <p className="text-2xl font-bold text-midgard-steel">$17,300 <span className="text-sm font-normal text-midgard-gray">MXN</span></p>
                </div>
                <p className="text-midgard-gray mb-6 h-12">
                  Mesa robusta diseñada para grupos grandes y sesiones de juego prolongadas.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-gray" />
                    Medidas: 170 x 100 x 75 cm
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-gray" />
                    Accesorios configurables por separado
                  </div>
                  <div className="flex items-center gap-3 text-sm text-midgard-steel">
                    <CheckCircle2 className="w-5 h-5 text-midgard-gray" />
                    Ideal para juegos con figuras altas: área de juego de 8 cm de altura
                  </div>
                  <div className="flex items-center gap-3 text-sm text-transparent select-none">
                    <CheckCircle2 className="w-5 h-5 text-transparent" />
                    Spacer
                  </div>
                </div>

                <Link href="/configurador?model=Midgard" className="block w-full py-3 px-4 border-2 border-midgard-navy text-midgard-navy text-center rounded-xl font-semibold hover:bg-midgard-navy hover:text-white transition-colors">
                  Configurar Midgard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner / Info */}
      <section className="w-full bg-midgard-navy py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Lleva tus partidas al siguiente nivel
          </h2>
          <p className="text-midgard-gray text-lg mb-8">
            Todas nuestras mesas son fabricadas de forma artesanal. Puedes elegir acabados, colores de tapete Mystic y una amplia variedad de accesorios modulares.
          </p>
          <Link href="/configurador" className="inline-block bg-white text-midgard-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
            Ir al Configurador 3D
          </Link>
        </div>
      </section>

    </div>
  );
}
