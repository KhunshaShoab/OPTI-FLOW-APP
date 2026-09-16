"use client";

import { useEffect, useRef, useState } from "react";
import { RESULTS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

// Counts a numeric string from → to, respecting decimals in `to`.
function useCountUp(target: string, active: boolean, ms = 1400) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!active) return;
    const n = parseFloat(target);
    if (Number.isNaN(n)) { setDisplay(target); return; }
    const decimals = (target.split(".")[1] || "").length;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((n * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, ms]);
  return display;
}

function MetricCard({ m, active }: { m: (typeof RESULTS)[number]; active: boolean }) {
  const to = useCountUp(m.to ?? "", active && !!m.to);
  const value = useCountUp(m.value ?? "", active && !!m.value && /^\d/.test(m.value));
  return (
    <div className="glass relative flex h-full flex-col overflow-hidden p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(340px circle at 20% 0%, rgba(59,130,246,.10), transparent 55%)" }}
      />
      <div className="relative flex-1">
        <div className="flex items-baseline gap-3 font-display text-[clamp(38px,5vw,64px)] font-extrabold tracking-[-0.02em]">
          {m.from && (
            <>
              <span className="text-faint">{m.from}</span>
              <span className="text-muted">→</span>
              <span className="grad-text">{to || m.to}</span>
            </>
          )}
          {!m.from && m.value && (
            <span className="grad-text">
              {/^\d/.test(m.value) ? value || m.value : m.value}
            </span>
          )}
        </div>
        <div className="mt-4 font-grotesk text-[13.5px] uppercase tracking-[0.14em] text-cyan">{m.label}</div>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{m.note}</p>
      </div>
    </div>
  );
}

export default function Results() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="results" className="relative z-[2] py-28">
      <div className="shell">
        <SectionHead
          kicker="Growth you can see"
          title={<>The numbers behind <span className="grad-text">the work.</span></>}
          sub="Only verified metrics — attributed to their specific engagement. No inflated benchmarks, no invented percentages."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((m, i) => (
            <Reveal key={m.label} delay={(i % 3) * 0.08}>
              <MetricCard m={m} active={active} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-faint">
          The Silksilky Google-rating movement is reported as a directional change during the engagement. OptiFlowCX contributed to the customer experience during that period alongside the brand's own product, marketing and fulfillment work.
        </p>
      </div>
    </section>
  );
}
