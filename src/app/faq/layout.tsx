import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Midgard Mesas de Juego",
  description:
    "Resuelve tus dudas sobre nuestras mesas de juego de mesa: materiales, envíos, configuración, garantías y más.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
