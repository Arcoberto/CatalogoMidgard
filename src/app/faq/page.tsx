"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

interface FaqItem {
  question: string;
  /** Ancla para enlazar directo a la pregunta (ej. /faq#diferencia-modelos) */
  anchor?: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  category: string;
  icon: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    category: "El Producto",
    icon: "🪵",
    items: [
      {
        question: "¿Cuál es la diferencia entre los modelos Asgard y Midgard?",
        anchor: "diferencia-modelos",
        answer: (
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-midgard-steel mb-1">Modelo Asgard:</p>
              <ul className="list-disc list-inside space-y-1 text-midgard-gray">
                <li>Tiene una estructura visualmente más elaborada.</li>
                <li>El reposa manos queda al nivel de las tapas.</li>
                <li>Cuenta con un canal de madera alrededor del perímetro de la mesa.</li>
                <li>Su tapete tiene orejas removibles, que permiten cambiar el acabado de paño a alfombra o el tono visible debajo de ellas.</li>
                <li>El marco y los detalles interiores resaltan el área de juego.</li>
                <li>Iluminación perimetral con difusor para evitar desgaste visual.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-midgard-steel mb-1">Modelo Midgard:</p>
              <ul className="list-disc list-inside space-y-1 text-midgard-gray">
                <li>Tiene un diseño de líneas más sencillas y una apariencia sobria.</li>
                <li>Su caja de juego cuenta con una estructura simple y funcional.</li>
                <li>Las tapas forman una superficie continua y se sobreponen al reposa manos, cubriendo toda la parte superior.</li>
              </ul>
            </div>
            <p className="text-midgard-gray">
              <span className="font-semibold text-midgard-steel">En pocas palabras:</span> Asgard destaca por sus detalles y acabados alrededor del área de juego; Midgard ofrece un diseño más sencillo, económico y una cubierta que transforma la mesa en una superficie completa.
            </p>
          </div>
        ),
      },
      {
        question: "¿Se puede personalizar una mesa?",
        answer: (
          <p className="text-midgard-gray leading-relaxed">
            Sí, siempre y cuando la estructura de la mesa no cambie. Puedes modificar el ancho, el largo, la altura total de la mesa, así como los tonos del paño o tapete y los de la madera, incluso el tipo de patas y el tipo de madera misma. ¡Hazla única a tu gusto!
          </p>
        ),
      },
      {
        question: "¿Puedes crear accesorios no incluidos en el catálogo?",
        answer: (
          <p className="text-midgard-gray leading-relaxed">
            Sí, podemos diseñar accesorios adicionales, siempre que puedan colocarse en el canal de aluminio de nuestras mesas. Contáctanos por WhatsApp para platicar tu idea.
          </p>
        ),
      },
      {
        question: "¿Los acabados de la mesa son 100% simétricos y perfectos? ¿La parte de abajo está barnizada?",
        answer: (
          <p className="text-midgard-gray leading-relaxed">
            La mesa tiene acabados simétricos pero no realizados con maquinaria — al ser una mesa artesanal, todo está hecho a mano. Puede que haya pequeños detalles milimétricos que no coincidan, pero estos no afectan ni al funcionamiento ni a la estética de la mesa. La parte de abajo de la mesa y otras partes que no están expuestas a la vista no tienen acabados ni de barniz ni de limpiamiento.
          </p>
        ),
      },
      {
        question: "¿Qué tipos de madera manejan?",
        answer: <p className="text-midgard-gray leading-relaxed">Normalmente usamos un híbrido de pino y encino, pero podemos cotizar con cualquier madera que necesites. Por ejemplo, si requieres que la mesa sea totalmente de parota, con gusto la cotizamos.</p>,
      },
      {
        question: "¿La mesa puede usarse como mesa de comedor normal cuando no estoy jugando?",
        answer: <p className="text-midgard-gray leading-relaxed">Sí, esa es la idea del producto: que sea multifuncional y sirva para ambas cosas. Incluso, en medio de una partida, pueden pausar el juego para comer.</p>,
      },
      {
        question: "¿Qué accesorios están disponibles en el catálogo?",
        answer: <p className="text-midgard-gray leading-relaxed">Por ahora solo manejamos extensores de tablero individuales y portavasos individuales. Estos dos accesorios cubren todas las funciones de los más de 10 accesorios que teníamos antes, así que simplificamos nuestro catálogo para cumplir con todas las expectativas de cada jugador.</p>,
      },
    ],
  },
  {
    category: "Cotización y Pedido",
    icon: "⚙️",
    items: [
      {
        question: "¿Cómo puedo cotizar una mesa?",
        answer: (
          <div className="text-midgard-gray">
            <p className="mb-2">Para obtener una cotización, necesitamos los siguientes datos:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Medidas totales de la mesa.</li>
              <li>Tipo de madera.</li>
              <li>Accesorios específicos que deseas incluir.</li>
            </ul>
          </div>
        ),
      },
      {
        question: "¿Cuál es el proceso de compra?",
        answer: (
          <div className="text-midgard-gray space-y-2">
            <p className="mb-2">El proceso de compra consta de los siguientes pasos:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Cotización del producto.</li>
              <li>Consulta de la agenda de pedidos para confirmar la fecha aproximada de entrega.</li>
              <li>Plan de pago acordado. La mayoría de los pedidos se dividen en dos pagos, pero en casos de montos superiores a $15,000 pesos, se crea un plan personalizado de tres pagos.</li>
              <li>Los pagos pueden tener un periodo de 15 a 20 días entre ellos. Si te encuentras en Guadalajara, el último pago es <strong className="text-midgard-steel">contra entrega</strong>. Si estás fuera de Guadalajara, se efectúa una vez que tengamos evidencia de que la mesa está terminada (videollamada o fotografías).</li>
              <li>Una vez confirmado el pago, procedemos a embalar la mesa. Nuestra paquetería <strong className="text-midgard-steel">"Tres Guerras"</strong> resguarda la mesa hasta confirmar el pago, luego la embarca y genera un número de guía rastreable desde <a href="https://www.tresguerras.com.mx" target="_blank" rel="noopener noreferrer" className="underline hover:text-midgard-navy">tresguerras.com.mx</a>. Este número también sirve como garantía del producto.</li>
            </ol>
          </div>
        ),
      },
      {
        question: "¿Puedo hacer cambios en mi pedido después de confirmarlo?",
        answer: <p className="text-midgard-gray leading-relaxed">Sí, se pueden hacer cambios. Sin embargo, una vez iniciada la estructura, ya no es posible modificar las medidas de la mesa, de las patas, de la superficie ni nada que las involucre. Los tonos sí se pueden cambiar, siempre y cuando no haya comenzado el proceso de entintado o tapizado.</p>,
      },
      {
        question: "¿Puedo cancelar mi pedido?",
        answer: <p className="text-midgard-gray leading-relaxed">No. Una vez realizado el anticipo, lo utilizamos para comprar el material y comenzar la fabricación de tu mesa. Hacemos esta inversión lo antes posible para cumplir con los tiempos de entrega.</p>,
      },
      {
        question: "¿Tienen tienda física donde pueda ver las mesas antes de comprar?",
        answer: <p className="text-midgard-gray leading-relaxed">Siempre puedes ver las mesas en el taller de carpintería donde las fabricamos, en Guadalajara. Además, cuando tenemos mesas en stock, solemos exhibirlas en la mueblería de diseño <strong className="text-midgard-steel">MO GDL Designs</strong>.</p>,
      },
    ],
  },
  {
    category: "Fabricación y Ensamble",
    icon: "🔨",
    items: [
      {
        question: "¿La mesa la recibo armada y lista para jugar?",
        answer: (
          <div className="text-midgard-gray space-y-3">
            <p>Es posible cotizar el envío de una mesa ensamblada. Sin embargo, por cuestiones económicas y logísticas, recomendamos enviar las patas sin ensamblar. Proporcionamos todo lo necesario para ensamblarla fácilmente una vez que recibas el paquete.</p>
            <p>Cada pata está marcada en la parte inferior con un número del 1 al 4, correspondiendo a su posición específica en la mesa. Para un ensamblaje seguro:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Utiliza los 4 tornillos proporcionados para cada pata.</li>
              <li>Si no tienes planes de desarmarla nuevamente, te recomendamos aplicar pegamento blanco para asegurar una unión perfecta.</li>
            </ul>
          </div>
        ),
      },
      {
        question: "¿Cuánto tiempo tarda la fabricación de mi mesa?",
        answer: <p className="text-midgard-gray leading-relaxed">Entre 15 días y 1 mes, dependiendo de la cantidad de pedidos que tengamos en ese momento. Para un tiempo más exacto, habla con uno de nuestros asesores.</p>,
      },
      {
        question: "¿Puedo ver fotos o video del avance de mi mesa durante la fabricación?",
        answer: <p className="text-midgard-gray leading-relaxed">Sí, los fines de semana. Hacerlo mientras la mesa está en proceso entorpece la fabricación y, por lo tanto, los tiempos de entrega. Los sábados podemos mostrarte el avance sin problema, incluso por videollamada.</p>,
      },
    ],
  },
  {
    category: "Envío y Entrega",
    icon: "🚚",
    items: [
      {
        question: "¿Hacen envíos fuera de Guadalajara?",
        answer: (
          <p className="text-midgard-gray leading-relaxed">
            Sí, realizamos envíos a otras ubicaciones. Sin embargo, los gastos de envío corren por cuenta del cliente. Utilizamos la paquetería externa <strong className="text-midgard-steel">"Tres Guerras"</strong>, que ofrece garantía de viaje seguro y entrega a la puerta de tu casa. Para cotizar el envío, necesitamos conocer tu código postal y la colonia de destino.
          </p>
        ),
      },
      {
        question: "¿Cuánto cuesta el envío aproximadamente?",
        answer: <p className="text-midgard-gray leading-relaxed">El costo aproximado va de $1,800 a $2,800 pesos, dependiendo del peso del producto y de la dirección de entrega.</p>,
      },
      {
        question: "¿Cuánto tiempo tarda el envío una vez que mi mesa está lista?",
        answer: <p className="text-midgard-gray leading-relaxed">Depende de la paquetería, pero por lo regular tarda de 2 a 4 días hábiles.</p>,
      },
      {
        question: "¿Qué hago si mi mesa llega dañada?",
        answer: <p className="text-midgard-gray leading-relaxed">Nosotros, junto con la paquetería, iniciamos el proceso de garantía a nombre del cliente. Ten en cuenta que el proceso varía según la paquetería.</p>,
      },
    ],
  },
  {
    category: "Formas de Pago",
    icon: "💳",
    items: [
      {
        question: "¿Qué facilidades de pago manejan?",
        answer: (
          <div className="text-midgard-gray space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-midgard-steel">1. Efectivo (Guadalajara)</p>
                <p className="ml-4">Si te encuentras en Guadalajara, puedes realizar el pago en efectivo directamente en nuestra tienda física.</p>
              </div>
              <div>
                <p className="font-semibold text-midgard-steel">2. Transferencia Bancaria</p>
                <p className="ml-4">Aceptamos pagos mediante transferencia bancaria. Ponte en contacto con nuestro equipo de atención al cliente para obtener los detalles bancarios necesarios.</p>
              </div>
              <div>
                <p className="font-semibold text-midgard-steel">3. Tarjeta de Crédito y Débito <span className="font-normal text-midgard-gray text-xs">(Comisiones de MercadoPago)</span></p>
                <p className="ml-4">Aceptamos pagos con tarjetas Visa, Mastercard, American Express y otras tarjetas válidas.</p>
              </div>
              <div>
                <p className="font-semibold text-midgard-steel">4. Meses sin Intereses <span className="font-normal text-midgard-gray text-xs">(Comisiones de MercadoPago)</span></p>
                <p className="ml-4 mb-3">Si prefieres pagar a plazos, ofrecemos la opción de meses sin intereses a través de MercadoPago.</p>
                <div className="overflow-x-auto rounded-xl border border-midgard-light-gray ml-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-midgard-navy text-white">
                        <th className="px-4 py-2.5 text-left font-semibold">Meses</th>
                        <th className="px-4 py-2.5 text-left font-semibold">Costo de comisión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Hasta 3", "4.69% + IVA"],
                        ["Hasta 6", "7.69% + IVA"],
                        ["Hasta 9", "11.19% + IVA"],
                        ["Hasta 12", "12.89% + IVA"],
                        ["Hasta 18", "19.39% + IVA"],
                        ["Hasta 24", "27.29% + IVA"],
                      ].map(([meses, costo], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-midgard-light-gray"}>
                          <td className="px-4 py-2.5 font-medium text-midgard-steel">{meses}</td>
                          <td className="px-4 py-2.5">{costo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={item.anchor}
      className={`scroll-mt-48 border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-midgard-navy/30 shadow-md bg-white"
          : "border-midgard-light-gray bg-white hover:border-midgard-navy/20 hover:shadow-sm"
      }`}
    >
      <button
        onClick={onToggle}
        id={`faq-btn-${index}`}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span
          className={`font-semibold text-base leading-snug transition-colors ${
            isOpen ? "text-midgard-navy" : "text-midgard-steel"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-midgard-navy text-white rotate-180"
              : "bg-midgard-light-gray text-midgard-gray"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-sm leading-relaxed">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "0-0": true, // Primera pregunta abierta por default
  });

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Si se llega con un ancla (ej. /faq#diferencia-modelos), abre esa pregunta y desplázate a ella
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    FAQ_DATA.forEach((cat, c) =>
      cat.items.forEach((item, i) => {
        if (item.anchor === hash) {
          setOpenItems((prev) => ({ ...prev, [`${c}-${i}`]: true }));
          setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        }
      })
    );
  }, []);

  const globalIndex = { count: 0 };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="w-full bg-midgard-navy py-20 px-4 relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-midgard-purple/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block text-midgard-purple font-semibold tracking-wider uppercase text-xs border border-midgard-purple/40 px-4 py-1.5 rounded-full bg-midgard-purple/10 mb-6">
            Centro de Ayuda
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Preguntas{" "}
            <span className="text-midgard-gray">Frecuentes</span>
          </h1>
          <p className="text-midgard-gray text-lg leading-relaxed max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestras mesas, el proceso de pedido,
            envíos y garantías. ¿No encuentras tu respuesta?{" "}
            <a
              href="https://wa.me/523314137429"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-midgard-purple transition-colors"
            >
              Escríbenos por WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      {/* Category Nav Pills */}
      <div className="sticky top-28 z-30 bg-white/90 backdrop-blur-md border-b border-midgard-light-gray shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {FAQ_DATA.map((cat, i) => (
            <a
              key={i}
              href={`#cat-${i}`}
              id={`nav-cat-${i}`}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-midgard-steel hover:bg-midgard-navy hover:text-white border border-midgard-light-gray hover:border-midgard-navy transition-all"
            >
              <span>{cat.icon}</span>
              <span>{cat.category}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main FAQ Content */}
      <section className="flex-grow w-full bg-midgard-light-gray py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {FAQ_DATA.map((cat, catIdx) => {
            return (
              <div key={catIdx} id={`cat-${catIdx}`} className="scroll-mt-36">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{cat.icon}</span>
                  <h2 className="text-2xl font-bold text-midgard-navy">
                    {cat.category}
                  </h2>
                  <div className="flex-grow h-px bg-midgard-navy/10 ml-2" />
                </div>

                {/* Accordion Items */}
                <div className="space-y-3">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${catIdx}-${itemIdx}`;
                    const idx = globalIndex.count++;
                    return (
                      <AccordionItem
                        key={key}
                        item={item}
                        index={idx}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="w-full bg-white border-t border-midgard-light-gray py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-midgard-navy/10 rounded-2xl mb-5">
            <MessageCircle className="w-7 h-7 text-midgard-navy" />
          </div>
          <h2 className="text-2xl font-bold text-midgard-navy mb-3">
            ¿Tienes más preguntas?
          </h2>
          <p className="text-midgard-gray mb-8 leading-relaxed">
            Nuestro equipo está disponible de lunes a sábado de 9am a 7pm (hora de Guadalajara).
            Respondemos en menos de 2 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/523314137429"
              target="_blank"
              rel="noopener noreferrer"
              id="faq-cta-whatsapp"
              className="inline-flex items-center justify-center gap-2 bg-midgard-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-midgard-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Chatear por WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/configurador"
              id="faq-cta-configurador"
              className="inline-flex items-center justify-center gap-2 border-2 border-midgard-navy text-midgard-navy px-8 py-4 rounded-full font-semibold hover:bg-midgard-navy hover:text-white transition-all"
            >
              Ir al Configurador
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
