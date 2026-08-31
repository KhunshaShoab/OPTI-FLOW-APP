import Link from "next/link";
import { SITE } from "@/lib/data";

const COLS = [
  { h: "Services", links: [["Live Chat", "/services"], ["Phone Support", "/services"], ["Email Support", "/services"], ["Technical Support", "/services"], ["Shopify DTC Support", "/services"], ["VA Receptionist", "/services"], ["AI Automations", "/services"]] },
  { h: "Company", links: [["Why OptiFlow", "/why-optiflow"], ["How It Works", "/how-it-works"], ["About", "/about"]] },
  { h: "More", links: [["Pricing", "/pricing"], ["Careers", "/careers"], ["Contact", "/contact"]] },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-10 border-t border-[#E5EAF2] bg-white/85 py-14 backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-px animate-slide" style={{ background: "linear-gradient(90deg,transparent,#06B6D4,#2563EB,#10B981,transparent)", backgroundSize: "200% 100%" }} />
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-grotesk font-semibold text-[#0F1F3F]">
              <span className="relative h-7 w-7 flex-none animate-spinSlow rounded-[9px]" style={{ background: "conic-gradient(from 200deg,#06B6D4,#2563EB,#10B981,#06B6D4)" }}>
                <span className="absolute inset-1.5 rounded-[5px] bg-white" />
              </span>
              OptiFlow<span className="font-normal text-faint">Solutions</span>
            </Link>
            <p className="mt-4 max-w-[280px] text-sm text-muted">Global, high-volume customer support for ambitious brands. {SITE.tagline}</p>
            <p className="mt-3 text-sm text-faint">📍 {SITE.location} · Serving US · UK · EU · AU · ME</p>
            <div className="mt-4 flex gap-2.5">
              {["in", "✕", "f", "◎"].map((s, i) => (
                <a key={i} href="/contact" className="grid h-9 w-9 place-items-center rounded-[10px] border border-[#E5EAF2] text-[#52627A] transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_0_18px_-4px_rgba(37,99,235,.45)]">{s}</a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h5 className="mb-4 font-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-faint">{c.h}</h5>
              {c.links.map(([l, h]) => (
                <Link key={l} href={h} className="mb-2.5 block text-sm text-muted transition hover:translate-x-1 hover:text-[#0F1F3F]">{l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[#E5EAF2] pt-6 font-grotesk text-[13px] text-faint">
          <span>© {new Date().getFullYear()} OptiFlow Solutions. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#0F1F3F]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#0F1F3F]">Terms</Link>
            <Link href="/data-security" className="hover:text-[#0F1F3F]">Data Security</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
