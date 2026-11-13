import InteractiveRoom from '@/components/InteractiveRoom';
import PhraseCarousel from '@/components/PhraseCarousel';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-midgard-light-gray flex justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full flex flex-col items-center gap-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="text-midgard-purple font-semibold tracking-wider uppercase text-sm border border-midgard-purple/30 px-3 py-1 rounded-full bg-midgard-purple/10">
              Nueva Colección
            </span>
            <PhraseCarousel />
            <div className="text-lg text-midgard-gray max-w-2xl leading-relaxed space-y-2">
              <p>Personaliza el ambiente de tu casa con un diseño industrial, minimalista y moderno.</p>
              <p>Nuestras mesas de comedor están pensadas para transformarse en mesa de juegos y hacer de cada partida una experiencia inolvidable.</p>
              <p className="font-semibold text-midgard-navy">Artesanía + diseño + funcionalidad. Simple, elegante y hecha para durar.</p>
              <p>Madera de encino de calidad, para que la puedas heredar.</p>
            </div>
          </div>
          <InteractiveRoom />
        </div>
      </section>

      {/* Nosotros */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-midgard-navy">Somos ebanistas de toda la vida</h2>
          <div className="space-y-4 text-lg text-midgard-gray leading-relaxed">
            <p>
              Hace diez años, por casualidad, el hobby de los juegos de mesa entró en nuestra vida y, sin pretenderlo, lo cambió todo para bien.
            </p>
            <p>
              Desde entonces unimos la destreza de la ebanistería artesanal con principios de arquitectura y diseño industrial. Creamos piezas a mano pensadas para espacios reales: pequeños, exigentes y que necesitan ser funcionales sin renunciar a la estética ni a los acabados de calidad.
            </p>
            <p>
              Trabajamos con madera sólida y con la misma dedicación de siempre, solo que ahora con una mirada más abierta e innovadora. Cada silla, cada mueble, nace del oficio, de la experiencia y del deseo constante de hacer bien las cosas e ir mejorando.
            </p>
            <p className="text-midgard-navy font-medium">
              Nuestro objetivo es llenar todos los espacios de tu hogar con un tono moderno e industrial, sin perder nunca la calidez de lo hecho a mano.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
