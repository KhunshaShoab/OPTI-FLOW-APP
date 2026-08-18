"use client";

import { useEffect, useRef } from "react";

// A calm, always-moving "support ecosystem": faint UI glyphs — tickets, chat
// bubbles, phone waves, mini bar-charts, agent avatars, CSAT stars, workflow
// lines — drifting slowly so visitors subconsciously read "this company runs
// customer operations." Replaces the old galaxy/aurora background.
type Glyph = { x: number; y: number; vx: number; vy: number; r: number; k: number; c: string; ph: number };

const COLORS = ["59,130,246", "56,189,248", "249,115,22", "110,86,240"];

export default function Background() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const g = c.getContext("2d")!;
    const DPR = Math.min(1.5, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0, t = 0;
    let items: Glyph[] = [];

    const size = () => {
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * DPR; c.height = H * DPR; g.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(40, Math.floor((W * H) / 46000));
      items = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() * 2 - 1) * 0.14, vy: (Math.random() * 2 - 1) * 0.14,
        r: 12 + Math.random() * 22, k: Math.floor(Math.random() * 6),
        c: COLORS[Math.floor(Math.random() * COLORS.length)], ph: Math.random() * 6,
      }));
    };

    const glyph = (it: Glyph) => {
      const a = 0.06 + Math.sin(t * 0.02 + it.ph) * 0.02;
      g.strokeStyle = `rgba(${it.c},${a})`;
      g.fillStyle = `rgba(${it.c},${a})`;
      g.lineWidth = 1.2;
      const { x, y, r, k } = it;
      if (k === 0) { // ticket card
        g.strokeRect(x, y, r * 1.6, r); g.beginPath(); g.moveTo(x + 4, y + r * 0.35); g.lineTo(x + r * 1.3, y + r * 0.35); g.moveTo(x + 4, y + r * 0.65); g.lineTo(x + r, y + r * 0.65); g.stroke();
      } else if (k === 1) { // chat bubble
        g.beginPath(); g.roundRect(x, y, r * 1.4, r, 6); g.stroke(); g.beginPath(); g.moveTo(x + 8, y + r); g.lineTo(x + 4, y + r + 6); g.lineTo(x + 16, y + r); g.stroke();
      } else if (k === 2) { // phone wave
        g.beginPath(); for (let i = 0; i <= 20; i++) { const px = x + (i / 20) * r * 1.6, py = y + Math.sin(i * 0.9 + t * 0.06) * (r * 0.28); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
      } else if (k === 3) { // bar chart
        for (let i = 0; i < 4; i++) { const bh = (r * 0.4) + Math.abs(Math.sin(t * 0.03 + i + it.ph)) * r * 0.6; g.fillRect(x + i * (r * 0.36), y + r - bh, r * 0.22, bh); }
      } else if (k === 4) { // avatar
        g.beginPath(); g.arc(x + r * 0.6, y + r * 0.45, r * 0.35, 0, 6.28); g.stroke(); g.beginPath(); g.arc(x + r * 0.6, y + r * 1.25, r * 0.6, Math.PI, 0); g.stroke();
      } else { // CSAT star
        g.beginPath(); for (let i = 0; i < 5; i++) { const ang = -Math.PI / 2 + (i * 4 * Math.PI) / 5, rr = r * 0.5; const px = x + r * 0.6 + Math.cos(ang) * rr, py = y + r * 0.6 + Math.sin(ang) * rr; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke();
      }
    };

    const draw = () => {
      t++; g.clearRect(0, 0, W, H);
      // faint workflow lines between nearby glyphs
      for (let i = 0; i < items.length; i++) {
        const p = items[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < -60) p.x = W + 40; if (p.x > W + 60) p.x = -40;
        if (p.y < -60) p.y = H + 40; if (p.y > H + 60) p.y = -40;
      }
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 150) { g.strokeStyle = `rgba(120,140,180,${0.05 * (1 - d / 150)})`; g.lineWidth = 1; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      }
      items.forEach(glyph);
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    size(); draw();
    const onR = () => { size(); if (reduce) draw(); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep operations-console base, not a nebula */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% -10%, #10162e 0%, #0b1e3f 55%, #070810 100%)" }} />
      <div className="noise-mask absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
