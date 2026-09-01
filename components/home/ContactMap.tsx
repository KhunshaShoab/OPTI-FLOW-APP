"use client";

import { useEffect, useRef } from "react";
import { ROUTES, SITE } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

// Animated "routes" map: glowing arcs from Lahore to every served region with
// light packets travelling outward. Abstract graticule, not a literal map.
export default function ContactMap() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const g = c.getContext("2d")!;
    const DPR = Math.min(1.6, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0, t = 0;
    const origin = ROUTES.find((r) => r.origin)!;
    const dests = ROUTES.filter((r) => !r.origin);
    const packets = dests.map(() => ({ t: Math.random() }));

    const size = () => { const r = c.getBoundingClientRect(); W = r.width; H = r.height; c.width = W * DPR; c.height = H * DPR; g.setTransform(DPR, 0, 0, DPR, 0, 0); };
    const P = (n: { x: number; y: number }) => ({ x: n.x * W, y: n.y * H });

    const arc = (a: any, b: any, prog: number) => {
      const A = P(a), B = P(b), mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2 - Math.hypot(B.x - A.x, B.y - A.y) * 0.28;
      return { x: (1 - prog) * (1 - prog) * A.x + 2 * (1 - prog) * prog * mx + prog * prog * B.x, y: (1 - prog) * (1 - prog) * A.y + 2 * (1 - prog) * prog * my + prog * prog * B.y, cx: mx, cy: my, A, B };
    };

    const draw = () => {
      t += 1; g.clearRect(0, 0, W, H);
      // graticule
      g.strokeStyle = "rgba(255,255,255,.05)"; g.lineWidth = 1;
      for (let i = 1; i < 8; i++) { g.beginPath(); g.moveTo((i / 8) * W, 0); g.lineTo((i / 8) * W, H); g.stroke(); }
      for (let i = 1; i < 5; i++) { g.beginPath(); g.moveTo(0, (i / 5) * H); g.lineTo(W, (i / 5) * H); g.stroke(); }
      // arcs
      dests.forEach((d) => {
        const s0 = arc(origin, d, 0);
        g.beginPath(); g.moveTo(s0.A.x, s0.A.y); g.quadraticCurveTo(s0.cx, s0.cy, s0.B.x, s0.B.y);
        g.strokeStyle = "rgba(59,130,246,.28)"; g.lineWidth = 1.2; g.stroke();
        const dp = P(d);
        g.fillStyle = "rgba(59,130,246,.9)"; g.beginPath(); g.arc(dp.x, dp.y, 3, 0, 6.28); g.fill();
      });
      // packets
      dests.forEach((d, i) => {
        if (!reduce) { packets[i].t += 0.006; if (packets[i].t > 1) packets[i].t = 0; }
        const pt = arc(origin, d, packets[i].t);
        const grd = g.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 10);
        grd.addColorStop(0, "rgba(14,165,233,1)"); grd.addColorStop(1, "rgba(14,165,233,0)");
        g.fillStyle = grd; g.beginPath(); g.arc(pt.x, pt.y, 10, 0, 6.28); g.fill();
      });
      // origin glow (Lahore)
      const o = P(origin), pulse = 6 + Math.sin(t * 0.06) * 3;
      const og = g.createRadialGradient(o.x, o.y, 0, o.x, o.y, 26);
      og.addColorStop(0, "rgba(14,165,233,.9)"); og.addColorStop(1, "rgba(14,165,233,0)");
      g.fillStyle = og; g.beginPath(); g.arc(o.x, o.y, 26, 0, 6.28); g.fill();
      g.fillStyle = "#fff"; g.beginPath(); g.arc(o.x, o.y, pulse * 0.5, 0, 6.28); g.fill();
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    size(); draw();
    const onR = () => { size(); if (reduce) draw(); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, []);

  return (
    <section id="contact" className="relative z-[2] py-28">
      <div className="shell">
        <Reveal>
          <div className="glass relative mb-10 overflow-hidden p-4">
            <canvas ref={canvas} className="h-[280px] w-full rounded-2xl md:h-[360px]" />
            <div className="pointer-events-none absolute left-6 top-6 font-grotesk text-xs uppercase tracking-[0.2em] text-faint">Live routes · {SITE.location} → the world</div>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">Get in touch</span>
            <h2 className="h-display mt-4 text-[clamp(28px,4vw,44px)]">Let's optimize your customer experience.</h2>
            <p className="mt-4 text-[15.5px] text-muted">Tell us what you're handling today — your channels, volume, coverage needs and biggest operational bottleneck. We'll show you where OptiFlow can fit.</p>
            <ul className="mt-8 space-y-4">
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-[15px] text-[#dfe3f0] transition hover:text-white">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line bg-glass">✉️</span> {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 text-[15px] text-[#dfe3f0] transition hover:text-white">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line bg-glass">📞</span> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[15px] text-[#dfe3f0] transition hover:text-white">
                  <span className="grid h-10 w-10 flex-none animate-pulseGlow place-items-center rounded-xl text-white" style={{ background: "linear-gradient(140deg,#25D366,#128C7E)" }}>💬</span> WhatsApp: {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[15px] text-[#dfe3f0]"><span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line bg-glass">📍</span> {SITE.location} · Serving global brands</li>
              <li className="flex items-center gap-3 text-[15px] text-[#dfe3f0]"><span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line bg-glass">🕑</span> Coverage across multiple time zones</li>
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <form className="glass p-8" onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("[type=submit] span") as HTMLElement).textContent = "Thank you — we'll be in touch"; }}>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <Field label="Full name"><input required placeholder="Your name" className="fld" /></Field>
                <Field label="Company"><input placeholder="Company name" className="fld" /></Field>
              </div>
              <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                <Field label="Work email"><input required type="email" placeholder="you@company.com" className="fld" /></Field>
                <Field label="Monthly support volume">
                  <select className="fld" defaultValue="">
                    <option value="" disabled>Select a range</option>
                    <option>Under 1,000</option>
                    <option>1,000 – 5,000</option>
                    <option>5,000 – 10,000</option>
                    <option>10,000 – 25,000</option>
                    <option>25,000+</option>
                  </select>
                </Field>
              </div>
              <Field label="How can we help?" className="mt-4"><textarea placeholder="Tell us about your current support setup, channels and goals…" className="fld min-h-[110px] resize-y" /></Field>
              <button type="submit" className="btn btn-primary mt-5 w-full justify-center"><span className="relative z-[2]">Request a consultation</span></button>
              <p className="mt-2.5 text-xs text-faint">Demo form — connect to Formspree / HubSpot to receive submissions, and embed your Calendly on the “Book a call” buttons.</p>
              <style>{`.fld{width:100%;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.09);border-radius:12px;padding:12px 14px;color:#fff;font-size:14.5px;font-family:var(--font-inter);transition:.25s}.fld:focus{outline:none;border-color:#3b82f6;background:rgba(255,255,255,.05);box-shadow:0 0 0 3px rgba(59,130,246,.14)}`}</style>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-grotesk text-[12.5px] text-muted">{label}</span>
      {children}
    </label>
  );
}
