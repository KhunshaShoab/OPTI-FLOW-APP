import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";
import { PLATFORMS } from "@/lib/data";

export const metadata = {
  title: "Technology — OptiFlowCX",
  description: "Platforms OptiFlowCX teams have hands-on operational experience inside — Shopify, Re:amaze, Zoho Desk and Zoho Voice.",
};

const CATEGORIES = [
  {
    title: "Support helpdesks",
    body: "Ticketing, inbox management, macros, workflows and reporting inside the tools that keep a support team organized.",
    items: ["Re:amaze", "Zoho Desk"],
  },
  {
    title: "Voice operations",
    body: "Inbound and outbound voice handled inside the operational stack the business already runs.",
    items: ["Zoho Voice"],
  },
  {
    title: "Commerce",
    body: "Order operations, DTC support, WISMO and post-purchase workflows executed inside store admin.",
    items: ["Shopify Admin"],
  },
];

export default function Technology() {
  return (
    <PageShell
      kicker="Operational experience"
      title={<>We work inside <span className="grad-text">your ecosystem.</span></>}
      intro="OptiFlowCX teams operate inside the tools your business already uses. This page lists platforms our resources have hands-on operational experience in — never claimed as a partnership unless independently verified."
    >
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {PLATFORMS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.08}>
            <div className="group glass relative overflow-hidden p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan/60">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(340px circle at 25% 15%, rgba(59,130,246,.14), transparent 55%)" }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="font-grotesk text-[11.5px] uppercase tracking-[0.18em] text-cyan">Platform · {String(i + 1).padStart(2, "0")}</div>
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-grotesk text-[10.5px] uppercase tracking-[0.16em] text-faint">Operational experience</span>
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.01em]">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-grotesk text-[11.5px] uppercase tracking-[0.18em] text-cyan">How we use them</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.08}>
              <div className="glass h-full p-7">
                <h4 className="font-display text-xl font-semibold">{cat.title}</h4>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{cat.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <span key={it} className="rounded-full border border-line px-2.5 py-1 font-grotesk text-[11.5px] text-faint">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-white/[0.02] p-6">
        <div className="font-grotesk text-[11px] uppercase tracking-[0.18em] text-faint">Note on partnerships</div>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-muted">
          OptiFlowCX is not described as an official partner of these companies unless the partnership has been independently verified. Where a partnership exists, it will be identified explicitly with the associated tier or program.
        </p>
      </div>
    </PageShell>
  );
}
