"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { CASES } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";

function StackCard({ c, i, total }: { c: (typeof CASES)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end start"] });
  // front card shrinks as the next one scrolls up over it (Apple-style stack)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.5]);

  return (
    <div ref={ref} className="sticky" style={{ top: `${96 + i * 26}px` }}>
      <motion.div style={{ scale, opacity }} className="glass group relative overflow-hidden p-9 transition-[border-color] hover:border-line2 hover:glow-cyan">
        <div className="absolute inset-x-0 top-0 h-1 animate-slide" style={{ background: "linear-gradient(90deg,#F97316,#3B82F6,#38BDF8)", backgroundSize: "200% 100%" }} />
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <div className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">{c.tag}</div>
            <h3 className="h-display mt-3 text-3xl">{c.client}</h3>
            <dl className="mt-6 space-y-4">
              <div><dt className="font-grotesk text-xs uppercase tracking-wide text-faint">Challenge</dt><dd className="mt-1 text-[15px] text-muted">{c.challenge}</dd></div>
              <div><dt className="font-grotesk text-xs uppercase tracking-wide text-faint">Solution</dt><dd className="mt-1 text-[15px] text-muted">{c.solution}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-line bg-white/[0.03] px-6 py-5">
            <div className="font-grotesk text-xs uppercase tracking-wide text-faint">Result</div>
            <div className="mt-2 max-w-[200px] font-display text-lg">{c.result}</div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-6 top-6 font-grotesk text-sm tabular-nums text-faint">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section id="clients" className="relative z-[2] py-28">
      <div className="shell">
        <SectionHead kicker="Case studies" title="Trusted by brands that can't afford bad support" sub="Scroll through real engagements — hardware, subscription and marketplace brands." />
        <div className="space-y-6">
          {CASES.map((c, i) => <StackCard key={c.client} c={c} i={i} total={CASES.length} />)}
        </div>
        <p className="mt-12 text-center text-[15px] text-muted">…plus a roster of top-rated Shopify DTC brands who trust us to resolve their buyers' concerns.</p>
      </div>
    </section>
  );
}
