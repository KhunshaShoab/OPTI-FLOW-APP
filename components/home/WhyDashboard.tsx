"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { FEATURES } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const BARS = [38, 52, 45, 66, 58, 74, 69, 82, 76, 90, 84, 96];

export default function WhyDashboard() {
  const chart = useRef<HTMLDivElement>(null);
  const inView = useInView(chart, { once: true, margin: "-20%" });

  return (
    <section id="why" className="relative z-[2] py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <span className="eyebrow">Why OptiFlow</span>
          <h2 className="h-display mt-5 text-[clamp(30px,4.4vw,50px)]">Everything flows around one thing — <span className="grad-text">your growth</span></h2>
          <p className="mt-5 max-w-lg text-muted">Customer support should protect revenue, retention and reputation — not become another operational bottleneck.</p>
          <div className="mt-2">
            {FEATURES.map((f) => (
              <div key={f.n} className="group flex gap-4 border-t border-line py-5 transition-all last:border-b hover:pl-2.5 hover:[background:linear-gradient(90deg,rgba(37,99,235,.06),transparent)]">
                <div className="pt-0.5 font-grotesk text-sm tabular-nums text-faint transition group-hover:text-cyan">{f.n}</div>
                <div>
                  <h4 className="font-display text-[17px] font-semibold">{f.title}</h4>
                  <p className="mt-1 text-sm text-muted">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass relative overflow-hidden p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-50 blur-[50px]" style={{ background: "radial-gradient(circle,#3b82f6,transparent 65%)" }} />
            <div className="relative mb-5 flex items-center justify-between">
              <span className="font-grotesk text-[13px] text-muted">Operations Overview</span>
              <span className="flex items-center gap-2 font-grotesk text-[11px] text-teal"><span className="h-[7px] w-[7px] animate-pulseGlow rounded-full bg-teal" />Live</span>
            </div>
            <div className="relative grid grid-cols-2 gap-3.5">
              {[
                { head: "24/7", sub: "Coverage options" },
                { head: "MULTI-CHANNEL", sub: "Chat · Phone · Email" },
                { head: "SCALE-READY", sub: "Flexible capacity" },
                { head: "GLOBAL", sub: "Multi-time-zone support" },
              ].map((tile) => (
                <div key={tile.head} className="rounded-[14px] border border-line bg-[#F8FAFC] px-[18px] py-4">
                  <div className="font-display text-[18px] font-bold leading-tight tracking-wide text-cyan">{tile.head}</div>
                  <div className="mt-1.5 font-grotesk text-[12px] tracking-wide text-muted">{tile.sub}</div>
                </div>
              ))}
            </div>
            <div ref={chart} className="relative mt-5 flex h-24 items-end gap-2 rounded-[14px] border border-line bg-[#F8FAFC] p-3.5">
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-[5px] transition-[height] duration-1000 ease-out" style={{ height: inView ? `${h}%` : "0%", transitionDelay: `${i * 70}ms`, background: "linear-gradient(180deg,#3b82f6,#0ea5e9)" }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
