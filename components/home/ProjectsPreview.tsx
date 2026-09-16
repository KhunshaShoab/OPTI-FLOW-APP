"use client";

import Link from "next/link";
import { CASES } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";

export default function ProjectsPreview() {
  return (
    <section id="projects-preview" className="on-light relative z-[2] py-28">
      <div className="shell">
        <SectionHead
          kicker="Selected work"
          title={<>Real operations. <span className="grad-text">Real teams.</span></>}
          sub="Customer experience operations OptiFlowCX has helped build, manage and scale. Two verified engagements below; two more publishing as clients approve them."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.09}>
              <Link
                href={`/projects#${c.slug}`}
                className="group glass relative block h-full overflow-hidden p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan/60"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(360px circle at 30% 20%, rgba(59,130,246,.18), transparent 55%)" }}
                />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-grotesk text-[11.5px] uppercase tracking-[0.18em] text-cyan">
                      {c.industry}
                    </span>
                    {c.verified ? (
                      <span className="rounded-full border border-cyan/40 px-2.5 py-0.5 font-grotesk text-[10.5px] uppercase tracking-[0.16em] text-cyan/90">Verified</span>
                    ) : (
                      <span className="rounded-full border border-line px-2.5 py-0.5 font-grotesk text-[10.5px] uppercase tracking-[0.16em] text-faint">Coming soon</span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-tight">{c.name}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{c.tagline}</p>

                  {c.verified && (
                    <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-3">
                      <div className="flex items-baseline gap-2 font-display text-[26px] font-extrabold tracking-[-0.02em]">
                        <span className="text-faint">{c.scale.from}</span>
                        <span className="text-muted">→</span>
                        <span className="grad-text">{c.scale.to}</span>
                        <span className="ml-1 font-grotesk text-[11px] uppercase tracking-[0.18em] text-muted">{c.scale.label}</span>
                      </div>
                      <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-muted">
                        {c.coverage} · {c.channels.join(" · ")}
                      </div>
                    </div>
                  )}

                  <span className="mt-auto pt-8 font-grotesk text-[13px] font-semibold text-cyan transition group-hover:translate-x-1">
                    Explore project →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
