import Hero from "@/components/home/Hero";
import Trust from "@/components/home/Trust";
import Services from "@/components/home/Services";
import WhyDashboard from "@/components/home/WhyDashboard";
import Process from "@/components/home/Process";
import Industries from "@/components/home/Industries";
import Security from "@/components/home/Security";
import Testimonials from "@/components/home/Testimonials";
import ContactMap from "@/components/home/ContactMap";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import SectionHead from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/icons";
import Link from "next/link";

const HOMEPAGE_SERVICES = [
  {
    icon: "PhoneCall",
    title: "VA Receptionist",
    desc: "A poised, dedicated virtual receptionist answering every call, booking appointments and routing messages with a smile in their voice.",
  },
  {
    icon: "Sparkles",
    title: "AI Automations",
    desc: "Custom AI workflows that draft replies, triage tickets and automate repeat ops — freeing your team to focus on customers, not busywork.",
  },
  {
    icon: "Plug",
    title: "AI Integrations",
    desc: "We connect the tools you already use — Shopify, HubSpot, Zendesk, Slack — with intelligent AI layers that speak fluently to each of them.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <WhyDashboard />
      <Process />
      <Industries />
      <Security />
      <Testimonials />

      <section className="on-light relative z-[2] py-32 text-center">
        <div className="shell">
          <Reveal>
            <h2 className="h-display text-[clamp(34px,5.6vw,64px)]">Let's <span className="grad-text">optimize</span> your<br />customer experience</h2>
            <p className="mx-auto mt-5 max-w-md text-muted">Start with a short, low-risk paid pilot and see the difference in weeks.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">Book a free consultation</MagneticButton>
              <MagneticButton href="/services" variant="ghost">Explore services</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="more-services" className="on-light relative z-[2] py-24">
        <div className="shell">
          <SectionHead
            kicker="Services"
            title={<>Explore what else <span className="grad-text">we handle</span></>}
            sub="Beyond frontline support, we run the receptionist desk, ship AI automations, and wire everything into the tools your team already uses."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {HOMEPAGE_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <Link
                  href="/services"
                  className="group glass relative block h-full overflow-hidden p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan/60"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(320px circle at 30% 20%, rgba(59,130,246,.18), transparent 55%)" }}
                  />
                  <div className="relative">
                    <span className="inline-grid h-12 w-12 place-items-center rounded-xl border border-cyan/40 bg-[rgba(59,130,246,0.12)] text-cyan shadow-[0_0_28px_-8px_rgba(59,130,246,.7)]">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-grotesk text-[13px] font-semibold text-cyan transition group-hover:translate-x-1">
                      Learn more <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactMap />
    </>
  );
}
