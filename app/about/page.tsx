import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/data";

export const metadata: Metadata = { title: "About", description: "OptiFlow Solutions — a premium customer-support company proudly based in Lahore, Pakistan." };

const VALUES = [
  { t: "Resolve, don't deflect", d: "Every interaction is a chance to protect a relationship. We solve problems, not close tickets." },
  { t: "Radically transparent", d: "We proudly say where we are — Lahore, Pakistan — because trust is built on honesty." },
  { t: "Coachable by design", d: "Flexible, eager agents who adopt your brand voice and get better every week." },
  { t: "Global by default", d: "Follow-the-sun coverage for the US, UK, EU, Australia and the Middle East." },
];

export default function Page() {
  return (
    <PageShell kicker="About us" title={<>A technology company that happens to run <span className="grad-text">customer support.</span></>} intro={`OptiFlow Solutions is a premium customer-support partner headquartered in ${SITE.location}, serving ambitious brands across five continents.`}>
      <div className="grid gap-5 md:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <div className="glass h-full p-8"><h3 className="font-display text-xl font-semibold">{v.t}</h3><p className="mt-2.5 text-muted">{v.d}</p></div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="glass mt-6 p-8">
          <h3 className="font-display text-xl font-semibold">Proudly from Lahore, serving the world</h3>
          <p className="mt-3 max-w-3xl text-muted">We believe world-class customer experience shouldn't cost a fortune — and that talent is global. From our base in {SITE.location}, our coachable, native-level English agents support brands in the US, UK, Europe, Australia and the Middle East, around the clock. {SITE.tagline}</p>
        </div>
      </Reveal>
    </PageShell>
  );
}
