import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://catalogo-midgard.vercel.app"),
  title: "Midgard Mesas de Juego | El Savegame de los Juegos de Mesa",
  description: "Mesas premium diseñadas para transformar cada partida en una experiencia inolvidable. Configurador interactivo 3D.",
  // Vista previa al compartir el enlace (WhatsApp, Facebook, Instagram...). La imagen es src/app/opengraph-image.jpg
  openGraph: {
    title: "Midgard Mesas de Juego",
    description: "El savegame de los juegos de mesa. Mesas premium desde Guadalajara, con configurador 3D.",
    siteName: "Midgard Mesas de Juego",
    locale: "es_MX",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-midgard-light-gray text-midgard-black font-sans selection:bg-midgard-navy selection:text-white pt-28">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
