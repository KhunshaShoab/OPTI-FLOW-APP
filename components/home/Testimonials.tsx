"use client";

import { TESTIMONIALS } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";

export default function Testimonials() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative z-[2] overflow-hidden py-28">
      <div className="shell">
        <SectionHead kicker="In their words" title="What partners say" />
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex w-max gap-5 px-6 [animation:marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <div key={i} className="glass w-[380px] flex-none p-7 animate-float" style={{ animationDelay: `${(i % 3) * -2.3}s` }}>
              <p className="text-[15px] leading-relaxed text-[#e7eaf4]">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full font-display font-bold text-white" style={{ background: "linear-gradient(140deg,#0EA5E9,#3B82F6)" }}>{t.av}</span>
                <div><b className="block font-grotesk text-sm">{t.who}</b>{t.role && <span className="text-[12.5px] text-faint">{t.role}</span>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
