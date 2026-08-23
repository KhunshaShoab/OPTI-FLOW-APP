import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Customer Support & BPO Services",
  description:
    "Explore OptiFlow Solutions' customer support and operational services — live chat, phone and email support, technical support, Shopify DTC support, virtual reception and AI-assisted automation.",
};

export default function Page() {
  return (
    <div className="services-page">
      <PageShell
        kicker="Services"
        title={
          <>
            Everything your customers need, <span className="grad-text">handled.</span>
          </>
        }
        intro="Omnichannel customer support under one quality standard — trained on your product, your tone and your tools."
        cta={false}
      >
        <Services />
        <Testimonials />

        <section className="on-light relative z-[2] py-24 text-center">
          <div className="shell">
            <Reveal>
              <div className="glass mx-auto max-w-3xl p-10 md:p-12">
                <h2 className="h-display text-[clamp(26px,4vw,42px)]">
                  Ready to <span className="grad-text">optimize</span> your operations?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted">
                  Tell us where your customer support or operational workload is slowing you down. We'll help you identify the right support model for your business.
                </p>
                <div className="mt-8 flex justify-center">
                  <MagneticButton href="/contact">Book a free consultation</MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </PageShell>
    </div>
  );
}
