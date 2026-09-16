import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { CASES } from "@/lib/data";

export const metadata = {
  title: "Projects — OptiFlowCX",
  description: "Customer experience operations OptiFlowCX has built, managed and scaled — Silksilky, Yarbo, SwiftX and Creality 3D.",
};

function ScaleRow({ from, to, label }: { from: string; to: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 font-display font-extrabold tracking-[-0.02em] text-[clamp(30px,4vw,54px)]">
      <span className="text-faint">{from}</span>
      <span className="text-muted">→</span>
      <span className="grad-text">{to}</span>
      <span className="ml-2 font-grotesk text-[11.5px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 font-grotesk text-[12px] text-muted">{children}</span>
  );
}

function Case({ c, index }: { c: (typeof CASES)[number]; index: number }) {
  const verified = c.verified;
  return (
    <article
      id={c.slug}
      className={`glass relative overflow-hidden p-8 md:p-12 ${verified ? "" : "opacity-[0.98]"}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(520px circle at 90% 10%, rgba(59,130,246,.10), transparent 55%)",
        }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-grotesk text-[11.5px] uppercase tracking-[0.18em] text-cyan">
            Project · {String(index + 1).padStart(2, "0")} · {c.industry}
          </span>
          <span
            className={`rounded-full px-3 py-1 font-grotesk text-[11px] uppercase tracking-[0.16em] ${
              verified ? "border border-cyan/40 text-cyan/90" : "border border-line text-faint"
            }`}
          >
            {verified ? "Verified engagement" : "Details coming soon"}
          </span>
        </div>

        <h2 className="mt-5 font-display text-[clamp(36px,5.6vw,72px)] font-extrabold leading-[1] tracking-[-0.02em]">
          {c.name}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">{c.tagline}</p>

        {verified && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white/[0.02] p-6">
              <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-faint">Team scale</div>
              <div className="mt-3">
                <ScaleRow from={c.scale.from} to={c.scale.to} label={c.scale.label} />
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white/[0.02] p-6">
              <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-faint">Coverage & channels</div>
              <div className="mt-4 font-display text-[clamp(24px,3vw,36px)] font-extrabold tracking-[-0.02em]">
                <span className="grad-text">{c.coverage}</span>
                <span className="ml-3 font-grotesk text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {c.channels.join(" · ")}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h3 className="font-grotesk text-[12px] uppercase tracking-[0.18em] text-cyan">The journey</h3>
            <ol className="mt-4 space-y-6">
              {c.phases.map((p, i) => (
                <li key={p.title} className="relative pl-8">
                  <span className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border border-cyan/40 bg-[rgba(59,130,246,0.12)] font-grotesk text-[10.5px] font-bold text-cyan">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="font-display text-xl font-semibold">{p.title}</div>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            {c.operations.length > 0 && (
              <div>
                <h3 className="font-grotesk text-[12px] uppercase tracking-[0.18em] text-cyan">Operations</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.operations.map((o) => <Chip key={o}>{o}</Chip>)}
                </div>
              </div>
            )}
            {c.platforms.length > 0 && (
              <div>
                <h3 className="font-grotesk text-[12px] uppercase tracking-[0.18em] text-cyan">Technology</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.platforms.map((p) => <Chip key={p}>{p}</Chip>)}
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-faint">Platforms our team operated inside during the engagement. Not a partnership claim.</p>
              </div>
            )}
            {verified && "volume" in c && (c as any).volume && (
              <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-faint">Support volume</div>
                <div className="mt-2 font-display text-2xl font-extrabold tracking-[-0.02em] text-white">
                  {(c as any).volume}
                </div>
              </div>
            )}
            {verified && "outcome" in c && (c as any).outcome && (
              <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-faint">Customer experience result</div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{(c as any).outcome}</p>
                <p className="mt-2 text-[12px] text-faint">Directional change during the engagement. Not attributed solely to OptiFlowCX.</p>
              </div>
            )}
            {!verified && (
              <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-faint">Journey · Team · Coverage · Channels · Operations · Technology · Outcomes</div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  Verified engagement details will be published as {c.name} approves them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <PageShell
      kicker="Selected work"
      title={<>Work we've built <span className="grad-text">together.</span></>}
      intro="Customer experience operations OptiFlowCX has helped design, deploy and scale. Two verified engagements below; two more publishing as clients approve them."
    >
      <div className="mt-10 space-y-10">
        {CASES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <Case c={c} index={i} />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
