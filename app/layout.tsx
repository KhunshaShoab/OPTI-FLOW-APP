import type { Metadata } from "next";
import { Inter, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ChunkErrorReloader from "@/components/providers/ChunkErrorReloader";
import IntroSequence from "@/components/home/IntroSequence";
import CustomCursor from "@/components/ui/CustomCursor";
import Background from "@/components/ui/Background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-sora", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Customer Support & CX Operations`, template: `%s — ${SITE.name}` },
  description:
    "OptiFlow provides trained customer support and operations teams for growing brands across chat, phone, email, eCommerce, technical support, virtual reception and AI automation.",
  keywords: ["customer support", "CX operations", "Shopify support", "eCommerce support", "virtual receptionist", "AI automation", "technical support", "OptiFlow"],
  openGraph: {
    type: "website",
    title: `${SITE.name} | Customer Support & CX Operations`,
    description: "Trained customer support and operations teams for growing brands — chat, phone, email, eCommerce, technical support, virtual reception and AI automation.",
    url: SITE.url,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} | Customer Support & CX Operations` },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    slogan: SITE.tagline,
    url: SITE.url,
    email: SITE.email,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    areaServed: SITE.markets,
    description: "Trained customer support and operations teams for growing brands — chat, phone, email, eCommerce, technical support, virtual reception and AI automation.",
  };

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${space.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <ChunkErrorReloader />
        <Background />
        <CustomCursor />
        <IntroSequence />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-[1]">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
