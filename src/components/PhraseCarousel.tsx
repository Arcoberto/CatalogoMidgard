'use client';

import { useEffect, useState } from 'react';

// Frases de respaldo (si la base de datos no responde o está vacía)
const DEFAULT_PHRASES = [
  'El savegame de los juegos de mesa',
  'Déjalo armado. La mesa no juzga… y aguanta.',
  'Este entreturno ya mereció su propio DLC. Pónganle tapa y vamos por tacos.',
  'Muy ricos los tacos y así… ¿Quién voy?',
  '“¿Café?” — “No, mejor Azul y Red Cathedral…”',
  'Come. Juega. Repite.',
  'Se acabó la pizza, empiezan las traiciones.',
  'El comedor que se rebeló y decidió ser mesa de juegos.',
  'El que pierda esta ronda de Love Letter invita las heladas.',
  'No me vayan a manchar el juego de Cheetos. Este juego me costó más que la renta.',
  'Eso ya no es analysis paralysis… es planificación a 14 turnos. Respeten.',
  'Amistad y juegos de mesa no se mezclan… y sin embargo aquí seguimos.',
  '“¿Postre?” — “Sí: una partida rápida de Sushi Go.”',
  'No guardamos el juego. Lo dejamos en modo “mañana seguimos”.',
  'De la salsa roja a la Ruta de la Seda en menos de cinco minutos.',
  'Esta mesa ha visto más traiciones que tu grupo de WhatsApp.',
  '¡A ver a qué horas! Si no es ajedrez.',
  'Cambio dos borregos por una piedra.',
  'Toca comer cartón una semanita.',
  'Bueno, ganaste, pero la primera partida no cuenta porque es de calis.',
];

const INTERVAL_MS = 15000;
const FADE_MS = 700;

// Primera mitad de palabras en azul, segunda mitad en el color secundario
function split(phrase: string) {
  const words = phrase.split(' ');
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

function shuffledOrder(count: number) {
  // La frase 1 siempre abre; el resto en orden aleatorio
  const rest = Array.from({ length: Math.max(count - 1, 0) }, (_, i) => i + 1);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [0, ...rest];
}

export default function PhraseCarousel() {
  const [phrases, setPhrases] = useState<string[]>(DEFAULT_PHRASES);
  const [order, setOrder] = useState<number[]>(() => DEFAULT_PHRASES.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setOrder(shuffledOrder(DEFAULT_PHRASES.length));
    // Frases editables desde el panel de administración
    fetch('/api/phrases')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const list = Array.isArray(data) ? data.map((p: { text: string }) => p.text).filter(Boolean) : [];
        if (list.length > 0) {
          setPhrases(list);
          setOrder(shuffledOrder(list.length));
          setPos(0);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPos((p) => {
          const next = p + 1;
          if (next >= order.length) {
            setOrder(shuffledOrder(phrases.length));
            return 0;
          }
          return next;
        });
        setVisible(true);
      }, FADE_MS);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [order.length, phrases.length]);

  const [first, second] = split(phrases[order[pos]] ?? phrases[0] ?? '');

  return (
    <div className="min-h-[9rem] md:min-h-[12rem] flex items-center justify-center max-w-5xl">
      <h1
        className="text-3xl md:text-5xl font-bold uppercase leading-tight text-center transition-all ease-out"
        style={{
          transitionDuration: `${FADE_MS}ms`,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.97)',
          filter: visible ? 'blur(0)' : 'blur(6px)',
        }}
      >
        <span className="text-midgard-navy">{first}</span>{' '}
        <span className="text-midgard-steel">{second}</span>
      </h1>
    </div>
  );
}
