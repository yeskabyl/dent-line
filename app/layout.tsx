import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { clinic, getSiteUrl } from "@/lib/clinic";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const title = "Стоматология в Астане — Dent Line Astana";
const description =
  "Стоматологическая клиника Dent Line Astana в районе Есиль: приём ежедневно с 09:00 до 00:00. Запишитесь на консультацию онлайн.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: "%s | Dent Line Astana" },
  description,
  keywords: [
    "стоматология Астана",
    "стоматологическая клиника Астана",
    "стоматология Есильский район",
    "Dent Line Astana",
    "стоматолог рядом",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    siteName: clinic.name,
    title,
    description,
    url: "/",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 1067,
        alt: "Приём в стоматологической клинике",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0b2a4a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
