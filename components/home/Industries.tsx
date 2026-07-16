"use client";

import { INDUSTRIES } from "@/lib/data";
import { Icon } from "@/components/ui/icons";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

export default function Industries() {
  return (
    <section id="industries" className="relative z-[2] py-28">
      <div className="shell">
        <SectionHead kicker="Industries" title="Support tuned to your world" sub="Hover a cube to open it — each vertical gets specialists, not generalists." />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.08}>
              <div className="group aspect-square [perspective:900px]" data-cursor="hover">
                <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 [backface-visibility:hidden]">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-line text-cyan" style={{ background: "linear-gradient(150deg,rgba(236,24,102,.14),rgba(0,212,255,.1))" }}>
                      <Icon name={ind.icon} className="h-7 w-7" />
                    </div>
                    <div className="font-grotesk text-sm font-semibold">{ind.name}</div>
                  </div>
                  <div className="glass absolute inset-0 flex items-center justify-center p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ background: "linear-gradient(150deg,rgba(236,24,102,.16),rgba(0,212,255,.12))" }}>
                    <p className="text-[12.5px] text-[#dfe3f0]">{ind.info}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
