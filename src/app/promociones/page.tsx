import Link from 'next/link';
import { ArrowRight, CalendarDays, CheckCircle2, Lightbulb } from 'lucide-react';

export const metadata = { title: 'Promociones | Midgard Mesas de Juego' };

const DESCUENTOS: { pct: string; label: string; href: string; note?: string; alert?: string }[] = [
  { pct: '20%', label: 'en nuestro nuevo Estante', href: '/estantes' },
  { pct: '27%', label: 'en el Escritorio Elevable', href: '/escritorios' },
];

const PAQUETE_ASGARD = [
  { t: '6 Portavasos removibles', d: 'Desmontables y adaptables a cualquier superficie' },
  { t: 'Superficie removible', d: 'Fácil de limpiar y personalizar' },
  { t: 'Línea sujeta cartas', d: 'Ranura perimetral para organizar tus cartas' },
  { t: 'Luz LED RGB de 16 colores', d: 'Crea el ambiente perfecto para cada partida' },
  { t: 'Canaleta difusora de luz', d: 'Iluminación uniforme y elegante' },
  { t: 'Hoja tapizada con paño de lana', d: 'Superficie suave y antideslizante' },
  { t: 'Alfombra de uso rudo en la base', d: 'Mayor estabilidad y protección' },
];

// Black Friday: visible solo del 26 al 29 de noviembre de 2026 (hora de Guadalajara/CDMX)
const BLACK_FRIDAY_START = new Date('2026-11-26T00:00:00-06:00');
const BLACK_FRIDAY_END = new Date('2026-11-30T00:00:00-06:00');

const BLACK_FRIDAY_IMAGES = [
  { src: '/images/promociones/black-friday-mesa-6.webp', alt: 'Promoción Black Friday: mesa 6 personas encino tono chocolate con paño verde esmeralda, de $21,300 a $17,300. Del 26 al 29 de noviembre.' },
  { src: '/images/promociones/black-friday-mesa-8.jpg', alt: 'Promoción Black Friday: mesa 8 personas encino natural con paño tinto, de $23,900 a $19,500. Del 26 al 29 de noviembre.' },
];

// Se evalúa en cada visita para que la promoción aparezca y desaparezca sola según la fecha
export const dynamic = 'force-dynamic';

export default function PromocionesPage() {
  const now = new Date();
  const showBlackFriday = now >= BLACK_FRIDAY_START && now < BLACK_FRIDAY_END;

  return (
    <div className="flex flex-col items-center">
      {/* Black Friday (temporal) */}
      {showBlackFriday && (
        <section className="w-full bg-midgard-black py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-2 uppercase tracking-wide">Black Friday</h2>
            <p className="text-center text-midgard-gray mb-8">Solo del 26 al 29 de noviembre</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {BLACK_FRIDAY_IMAGES.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto rounded-2xl shadow-2xl select-none"
                  draggable={false}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <a
                href="https://wa.me/523314137429?text=%C2%A1Hola!%20Me%20interesa%20la%20promoci%C3%B3n%20de%20Black%20Friday"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#128C7E] transition-colors shadow-lg"
              >
                Aprovechar por WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Hero */}
      <section className="w-full bg-midgard-light-gray flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full flex flex-col items-center text-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/promociones/buen-fin-logo.png" alt="Buen Fin" className="w-40 md:w-52 h-auto drop-shadow-lg select-none" draggable={false} />
          <h1 className="text-4xl md:text-6xl font-bold text-midgard-navy leading-tight">
            ¡PROMOCIÓN ESPECIAL <span className="text-red-600">DE NOVIEMBRE!</span>
          </h1>
          <span className="inline-flex items-center gap-2 bg-midgard-navy text-white px-6 py-2.5 rounded-full font-semibold shadow-lg">
            <CalendarDays className="w-5 h-5" /> Del 13 al 24 de noviembre
          </span>
          <p className="text-lg text-midgard-gray max-w-2xl leading-relaxed">
            ¡Este mes premiamos tu pasión por los juegos de mesa y el buen diseño!
          </p>
        </div>
      </section>

      {/* Descuentos */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {DESCUENTOS.map((d) => (
            <Link key={d.label} href={d.href} className="group rounded-3xl border-2 border-red-100 bg-red-50/40 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
              <p className="text-6xl font-extrabold text-red-600">{d.pct}</p>
              <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-2">de descuento</p>
              <p className="text-lg font-semibold text-midgard-navy">{d.label}</p>
              {d.note && <p className="text-xs text-midgard-gray mt-1">({d.note})</p>}
              {d.alert && (
                <span className="inline-flex items-center gap-2 mt-3 bg-red-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
                  {d.alert}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-sm text-midgard-steel mt-4 group-hover:underline">Ver producto <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Extra Asgard */}
      <section className="w-full bg-midgard-light-gray py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl select-none relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/promociones/buen-fin-2026.jpg" alt="Buen Fin 2026 - 10% adicional con el código BF26" className="w-full h-auto" draggable={false} />
            <div className="absolute inset-0" aria-hidden="true" />
          </div>

          <div className="space-y-6">
            <span className="inline-block bg-midgard-purple text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">Extra exclusivo en Mesas Asgard</span>
            <h2 className="text-4xl font-bold text-midgard-navy flex items-center gap-3">
              <Lightbulb className="w-9 h-9 text-red-600 shrink-0" /> ¡La luz LED RGB va por nuestra cuenta!
            </h2>
            <div>
              <h3 className="text-xl font-bold text-midgard-navy mb-3">El Paquete Asgard incluye:</h3>
              <div className="space-y-3">
                {PAQUETE_ASGARD.map((p) => (
                  <div key={p.t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-midgard-purple shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-midgard-navy">{p.t}</span> <span className="text-midgard-gray">– {p.d}</span></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white border-2 border-midgard-navy/20 p-5 text-center">
              <p className="text-sm text-midgard-gray">10% adicional en toda la tienda con el código</p>
              <p className="text-3xl font-extrabold text-midgard-navy tracking-widest">BF26</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="w-full bg-midgard-navy py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-400 font-bold uppercase tracking-wider mb-3">Solo del 13 al 24 de noviembre</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            ¡No dejes pasar esta oportunidad de llevarte el setup de juegos que siempre soñaste!
          </h2>
          <Link href="/configurador" className="inline-flex items-center gap-2 bg-white text-midgard-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
            Cotizar ahora <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
