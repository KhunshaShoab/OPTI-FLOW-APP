import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Careers", description: "Join OptiFlow Solutions in Lahore — customer support, technical support and team-lead roles." };

const ROLES = [
  { t: "Customer Support Agent", d: "Chat, email & phone support for global brands.", loc: "Lahore · On-site" },
  { t: "Technical Support Specialist", d: "Troubleshooting for hardware & software products.", loc: "Lahore · On-site" },
  { t: "Amazon Support Associate", d: "Returns, A-to-z and seller-rating protection.", loc: "Lahore · On-site" },
  { t: "Team Lead / QA", d: "Coach agents and own quality for a client pod.", loc: "Lahore · On-site" },
];

export default function Page() {
  return (
    <PageShell kicker="Careers" title={<>Build a <span className="grad-text">global career</span> from Lahore.</>} intro="We're growing fast and hiring coachable, ambitious people who love solving problems for customers. Great teammates, real growth, global brands.">
      <div className="grid gap-4">
        {ROLES.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.06}>
            <div className="glass flex flex-wrap items-center justify-between gap-4 p-6 transition hover:border-line2">
              <div><h3 className="font-display text-lg font-semibold">{r.t}</h3><p className="mt-1 text-sm text-muted">{r.d}</p></div>
              <div className="flex items-center gap-5"><span className="font-grotesk text-sm text-faint">{r.loc}</span><MagneticButton href="/contact" variant="ghost">Apply</MagneticButton></div>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
