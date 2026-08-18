import Link from "next/link";
import { SITE } from "@/lib/data";

const COLS = [
  { h: "Services", links: [["Live Chat", "/services"], ["Phone Support", "/services"], ["Email Support", "/services"], ["Shopify DTC Support", "/services"], ["VA Receptionist", "/services"], ["AI Automations", "/services"]] },
  { h: "Company", links: [["Why Us", "/why-optiflow"], ["Case Studies", "/case-studies"], ["How It Works", "/how-it-works"], ["About", "/about"]] },
  { h: "More", links: [["Pricing", "/pricing"], ["Careers", "/careers"], ["Blog", "/blog"], ["Contact", "/contact"]] },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-10 border-t border-transparent bg-[rgba(11,30,63,.5)] py-14 backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-px animate-slide" style={{ background: "linear-gradient(90deg,transparent,#F97316,#3B82F6,#38BDF8,transparent)", backgroundSize: "200% 100%" }} />
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-grotesk font-semibold">
              <span className="relative h-7 w-7 flex-none animate-spinSlow rounded-[9px]" style={{ background: "conic-gradient(from 200deg,#F97316,#3B82F6,#38BDF8,#F97316)" }}>
                <span className="absolute inset-1.5 rounded-[5px] bg-bg2" />
              </span>
              OptiFlow<span className="font-normal text-faint">Solutions</span>
            </Link>
            <p className="mt-4 max-w-[280px] text-sm text-muted">Global, high-volume customer support for ambitious brands. {SITE.tagline}</p>
            <p className="mt-3 text-sm text-faint">📍 {SITE.location} · Serving US · UK · EU · AU · ME</p>
            <div className="mt-4 flex gap-2.5">
              {["in", "✕", "f", "◎"].map((s, i) => (
                <a key={i} href="/contact" className="grid h-9 w-9 place-items-center rounded-[10px] border border-line transition hover:-translate-y-0.5 hover:border-cyan hover:shadow-[0_0_18px_-4px_#3b82f6]">{s}</a>
              ))}
            </div>
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
