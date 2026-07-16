"use client";

import { useRef } from "react";
import { SERVICES } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

// Small living "environment" per service instead of a static icon.
function Env({ kind }: { kind: string }) {
  if (kind === "chat")
    return (
      <div className="env">
        <div className="bub left" style={{ animationDelay: "0s" }}>How do I return this?</div>
        <div className="bub right" style={{ animationDelay: ".5s" }}>Happy to help! 👋</div>
        <div className="bub left typing" style={{ animationDelay: "1s" }}><i /><i /><i /></div>
        <span className="badge">3</span>
      </div>
    );
  if (kind === "phone")
    return (
      <div className="env items-center justify-center gap-[3px]">
        {Array.from({ length: 22 }).map((_, i) => <span key={i} className="wave" style={{ animationDelay: `${i * 0.06}s`, height: `${20 + (i % 5) * 12}%` }} />)}
        <span className="tag">● Live call · 00:42</span>
      </div>
    );
  if (kind === "email")
    return (
      <div className="env justify-center">
        {["✉️", "✉️", "✉️"].map((e, i) => <span key={i} className="mail" style={{ animationDelay: `${i * 0.7}s`, left: `${22 + i * 24}%` }}>{e}</span>)}
        <span className="folder">📂 Resolved</span>
      </div>
    );
  if (kind === "tech")
    return (
      <div className="env items-center justify-center">
        <div className="chip"><span /><span /><span /><span /></div>
        <span className="tag">Diagnostics ✓</span>
      </div>
    );
  if (kind === "amazon")
    return (
      <div className="env items-center justify-center gap-3">
        <span className="pkg">📦</span><span className="arrow">↩</span>
        <span className="tag">Refund · A-to-z ✓</span>
      </div>
    );
  return (
    <div className="env items-end justify-center gap-1.5 pb-3">
      {[40, 62, 50, 78, 66, 88, 72].map((h, i) => <span key={i} className="bar" style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />)}
    </div>
  );
}

function Card({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current!, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 7}deg) rotateX(${(0.5 - py) * 7}deg) translateY(-4px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <Reveal delay={(i % 3) * 0.09}>
      <div ref={ref} onPointerMove={move} onPointerLeave={reset} className="group glass relative overflow-hidden p-6 transition-[border-color] duration-300 hover:border-line2" style={{ transformStyle: "preserve-3d" }}>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgba(0,212,255,.12), transparent 45%)" }} />
        <div className="relative" style={{ transform: "translateZ(26px)" }}>
          <div className="env-wrap">
            <Env kind={s.env} />
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
          <p className="mt-2.5 text-[14.5px] text-muted">{s.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {s.tags.map((t) => <span key={t} className="rounded-full border border-line px-2.5 py-1 font-grotesk text-[11.5px] text-faint transition group-hover:border-line2 group-hover:text-muted">{t}</span>)}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative z-[2] py-28">
      <div className="shell">
        <SectionHead kicker="What we do" title={<>Support that feels like <span className="grad-text">your own team</span></>} sub="Every channel your customer chooses reaches a trained agent who represents your brand — and is measured on resolving, not deflecting." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => <Card key={s.title} s={s} i={i} />)}
        </div>
      </div>
      <style>{`
        .env-wrap{position:relative;height:120px;border-radius:14px;border:1px solid var(--line,rgba(255,255,255,.09));overflow:hidden;background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01))}
        .env{position:absolute;inset:0;display:flex;padding:12px}
        .env .bub{position:absolute;max-width:62%;padding:6px 10px;border-radius:12px;font-size:11.5px;background:rgba(255,255,255,.08);animation:floaty 3s ease-in-out infinite}
        .env .bub.left{left:12px;top:16px}
        .env .bub.right{right:12px;top:52px;background:rgba(0,212,255,.18)}
        .env .bub.typing{top:84px;display:inline-flex;gap:3px}
        .env .bub.typing i{width:5px;height:5px;border-radius:50%;background:#00D4FF;animation:blink 1.2s infinite}
        .env .bub.typing i:nth-child(2){animation-delay:.2s}.env .bub.typing i:nth-child(3){animation-delay:.4s}
        .env .badge{position:absolute;top:10px;right:12px;min-width:18px;height:18px;border-radius:9px;background:#EC1866;color:#fff;font-size:10px;display:grid;place-items:center;font-weight:700}
        .env .wave{width:4px;border-radius:3px;background:linear-gradient(#00D4FF,#EC1866);animation:wave 1s ease-in-out infinite;align-self:center}
        .env .tag{position:absolute;bottom:10px;left:12px;font-size:10.5px;color:#AEB5C8;font-family:var(--font-space)}
        .env .mail{position:absolute;bottom:14px;font-size:20px;animation:rise 2.1s ease-in infinite}
        .env .folder{position:absolute;top:14px;right:14px;font-size:11px;color:#00C2A8;font-family:var(--font-space)}
        .env .chip{width:64px;height:44px;border:1px solid rgba(0,212,255,.4);border-radius:8px;position:relative;box-shadow:0 0 18px -6px #00d4ff}
        .env .chip span{position:absolute;width:8px;height:2px;background:#00D4FF;animation:pulseGlow 1.6s infinite}
        .env .chip span:nth-child(1){top:-3px;left:14px}.env .chip span:nth-child(2){bottom:-3px;left:32px}
        .env .chip span:nth-child(3){left:-9px;top:20px;width:2px;height:8px}.env .chip span:nth-child(4){right:-9px;top:12px;width:2px;height:8px}
        .env .pkg{font-size:30px;animation:floaty 3s ease-in-out infinite}
        .env .arrow{font-size:24px;color:#EC1866;animation:spinSlow 4s linear infinite}
        .env .bar{width:9px;border-radius:4px 4px 0 0;background:linear-gradient(180deg,#00D4FF,#EC1866);animation:barp 2s ease-in-out infinite}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes wave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
        @keyframes rise{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-70px);opacity:0}}
        @keyframes barp{0%,100%{transform:scaleY(.85)}50%{transform:scaleY(1.05)}}
      `}</style>
    </section>
  );
}
