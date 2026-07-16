import type { Metadata } from "next";
import { Inter, Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";
import SmoothScroll from "@/components/providers/SmoothScroll";
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
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description:
    "Premium global customer-support outsourcing — live chat, phone, email, technical and Amazon support — for US, UK, EU, AU & ME brands. Proudly based in Lahore, Pakistan.",
  keywords: ["customer support outsourcing", "BPO", "Amazon seller support", "technical support", "live chat", "OptiFlow"],
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: "Premium global customer-support outsourcing for ambitious brands.",
    url: SITE.url,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} — ${SITE.tagline}` },
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
    description: "Customer-support outsourcing: live chat, phone, email, technical and Amazon seller support.",
  };

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${space.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
