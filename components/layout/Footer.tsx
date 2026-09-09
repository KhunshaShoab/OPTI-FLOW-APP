import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";

const COLS = [
  { h: "Services", links: [["Live Chat", "/services"], ["Phone Support", "/services"], ["Email Support", "/services"], ["Technical Support", "/services"], ["Shopify DTC Support", "/services"], ["VA Receptionist", "/services"], ["AI Automations", "/services"]] },
  { h: "Company", links: [["Why OptiFlow", "/why-optiflow"], ["How It Works", "/how-it-works"], ["About", "/about"]] },
  { h: "More", links: [["Careers", "/careers"], ["Contact", "/contact"]] },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-10 border-t border-transparent bg-[rgba(11,30,63,.5)] py-14 backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-px animate-slide" style={{ background: "linear-gradient(90deg,transparent,#0EA5E9,#3B82F6,#60A5FA,transparent)", backgroundSize: "200% 100%" }} />
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-grotesk font-semibold">
              <span className="relative h-10 w-10 flex-none overflow-hidden rounded-full ring-1 ring-white/10">
                <Image src="/logo.svg" alt="OptiFlow CX" fill sizes="40px" className="object-cover" />
              </span>
              <span>OptiFlow<span className="font-normal text-faint"> CX</span></span>
            </Link>
            <p className="mt-4 max-w-[280px] text-sm text-muted">Global, high-volume customer support for ambitious brands. {SITE.tagline}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-muted transition hover:text-white">
                  <span className="text-cyan">✉</span> {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 text-muted transition hover:text-white">
                  <span className="text-cyan">📞</span> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition hover:text-white">
                  <span className="text-teal">💬</span> WhatsApp
                </a>
              </li>
              <li className="text-faint">📍 {SITE.location} · Serving US · UK · EU · AU · ME</li>
            </ul>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h5 className="mb-4 font-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-faint">{c.h}</h5>
              {c.links.map(([l, h]) => (
                <Link key={l} href={h} className="mb-2.5 block text-sm text-muted transition hover:translate-x-1 hover:text-white">{l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-6 font-grotesk text-[13px] text-faint">
          <span>© {new Date().getFullYear()} OptiFlow Solutions. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/data-security" className="hover:text-white">Data Security</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
