"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { PROCESS } from "@/lib/data";
import { Icon } from "@/components/ui/icons";
import SectionHead from "@/components/ui/SectionHead";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });

  return (
    <section id="process" className="relative z-[2] py-28">
      <div className="shell">
        <SectionHead kicker="How it works" title="A futuristic production line" sub="From first call to a support team that feels like your own — live in days, not months." />
        <div ref={ref} className="relative mt-4">
          {/* animated beam */}
          <div className="absolute left-[6%] right-[6%] top-[34px] hidden h-0.5 overflow-hidden rounded bg-white/10 md:block">
            <div className="h-full transition-[width] duration-[1600ms] ease-out" style={{ width: inView ? "100%" : "0%", background: "linear-gradient(90deg,#0EA5E9,#3B82F6,#60A5FA)", boxShadow: "0 0 14px #3b82f6" }} />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="text-center">
                <div className={`mx-auto mb-5 grid h-[68px] w-[68px] place-items-center rounded-full border text-cyan transition-all duration-700 ${inView ? "border-cyan glow-cyan" : "border-line"}`} style={{ transitionDelay: `${i * 300 + 300}ms`, background: inView ? "linear-gradient(150deg,rgba(59,130,246,.18),rgba(14,165,233,.12))" : "rgba(255,255,255,.03)" }}>
                  <Icon name={p.icon} className="h-7 w-7" />
                </div>
                <h4 className={`font-display text-lg font-semibold transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-50"}`} style={{ transitionDelay: `${i * 300 + 300}ms` }}>{p.title}</h4>
                <p className="mx-auto mt-1.5 max-w-[210px] text-[13.5px] text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
