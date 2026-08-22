import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Pricing", description: "Flexible, transparent pricing models — per-agent, per-ticket or dedicated teams." };

const TIERS = [
  { name: "Pilot", price: "From $6/hr", tagline: "Prove the fit", feats: ["Short paid pilot", "1–2 dedicated agents", "One channel", "Shared QA", "No long lock-in"], accent: false },
  { name: "Growth", price: "Custom", tagline: "Most popular", feats: ["Dedicated team", "Omnichannel (chat/email/phone)", "Follow-the-sun coverage", "Dedicated QA & reporting", "CRM & tool integration"], accent: true },
  { name: "Enterprise", price: "Custom", tagline: "High volume", feats: ["Multi-team scale", "24/7 global coverage", "Technical & Amazon specialists", "Custom SLAs & security", "Dedicated account manager"], accent: false },
];

export default function Page() {
  return (
    <PageShell kicker="Pricing" title={<>Pricing that <span className="grad-text">scales with you.</span></>} intro="Per-agent, per-ticket or fully dedicated teams — we'll recommend the model that fits your volume. Always starting with a low-risk pilot." cta={false}>
      <div className="grid gap-5 md:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.09}>
            <div className={`glass relative h-full p-8 ${t.accent ? "border-line2 glow-cyan" : ""}`}>
              {t.accent && <div className="absolute inset-x-0 top-0 h-1 animate-slide" style={{ background: "linear-gradient(90deg,#0EA5E9,#3B82F6,#60A5FA)", backgroundSize: "200% 100%" }} />}
              <div className="font-grotesk text-sm uppercase tracking-wide text-cyan">{t.tagline}</div>
              <h3 className="h-display mt-2 text-2xl">{t.name}</h3>
              <div className="mt-3 font-display text-3xl font-bold">{t.price}</div>
              <ul className="mt-6 space-y-3">
                {t.feats.map((f) => <li key={f} className="flex gap-2.5 text-[14.5px] text-muted"><span className="text-teal">✓</span>{f}</li>)}
              </ul>
              <div className="mt-8"><MagneticButton href="/contact" variant={t.accent ? "primary" : "ghost"}>Get a quote</MagneticButton></div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-faint">Prices are indicative and depend on volume, channels and coverage. Request a tailored quote.</p>
    </PageShell>
  );
}
