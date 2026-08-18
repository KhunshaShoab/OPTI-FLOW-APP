"use client";

import { useEffect, useRef } from "react";
import { Lock } from "lucide-react";
import { SECURITY } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Security() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const g = c.getContext("2d")!;
    let W = 0, H = 0, raf = 0, started = false;
    const DPR = Math.min(1.6, window.devicePixelRatio || 1);
    let pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const size = () => {
      const r = c.getBoundingClientRect(); W = r.width; H = r.height;
      c.width = W * DPR; c.height = H * DPR; g.setTransform(DPR, 0, 0, DPR, 0, 0);
      pts = Array.from({ length: Math.min(46, Math.floor(W / 22)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() * 2 - 1) * 0.25, vy: (Math.random() * 2 - 1) * 0.25 }));
    };
    const draw = () => {
      g.clearRect(0, 0, W, H);
      pts.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { g.strokeStyle = `rgba(59,130,246,${0.14 * (1 - d / 120)})`; g.lineWidth = 0.6; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      }
      pts.forEach((p) => { g.fillStyle = "rgba(59,130,246,.5)"; g.beginPath(); g.arc(p.x, p.y, 1.4, 0, 6.28); g.fill(); });
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !started) { started = true; size(); draw(); } }));
    io.observe(c);
    const onR = () => { if (W) size(); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", onR); };
  }, []);

  return (
    <section className="relative z-[2] py-16">
      <div className="shell">
        <Reveal>
          <div className="glass relative overflow-hidden">
            <canvas ref={canvas} className="absolute inset-0 h-full w-full opacity-70" />
            <div className="relative grid items-center gap-11 p-8 md:grid-cols-2 md:p-14">
              <div>
                <div className="mb-5 grid h-15 w-15 place-items-center rounded-2xl border border-line2 text-teal glow-cyan" style={{ background: "linear-gradient(150deg,rgba(56,189,248,.2),rgba(59,130,246,.14))", height: 60, width: 60 }}>
                  <Lock className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <span className="eyebrow">Security &amp; trust</span>
                <h2 className="h-display mt-4 text-[clamp(26px,3.6vw,40px)]">Your customers &amp; data, handled with care</h2>
                <p className="mt-4 text-[15.5px] text-muted">We treat your customer data and brand reputation as our own — strict confidentiality, secure access and clear accountability from day one.</p>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {SECURITY.map((s) => (
                  <div key={s} className="flex gap-2.5 text-[14.5px] text-[#dfe3f0] transition hover:translate-x-1 hover:text-white"><span className="font-bold text-teal">✓</span> {s}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
