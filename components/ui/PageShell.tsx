import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

// Reusable premium page header + optional CTA for the inner content routes.
export default function PageShell({
  kicker,
  title,
  intro,
  children,
  cta = true,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
  cta?: boolean;
}) {
  return (
    <>
      <section className="relative z-[2] pb-6 pt-28 md:pt-32">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">{kicker}</span>
            <h1 className="h-display mt-5 max-w-4xl text-[clamp(38px,6vw,72px)] leading-[1.03]">{title}</h1>
            {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
          </Reveal>
        </div>
      </section>

      <section className="relative z-[2] py-2">
        <div className="shell">{children}</div>
      </section>

      {cta && (
        <section className="on-light relative z-[2] py-24 text-center">
          <div className="shell">
            <Reveal>
              <div className="glass mx-auto max-w-3xl p-10 md:p-12">
                <h2 className="h-display text-[clamp(26px,4vw,42px)]">Ready to <span className="grad-text">optimize</span> your operations?</h2>
                <p className="mx-auto mt-4 max-w-xl text-muted">Let's identify where support is costing you time, money or customers — then start with a low-risk pilot.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <MagneticButton href="/contact">Book a free consultation</MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
