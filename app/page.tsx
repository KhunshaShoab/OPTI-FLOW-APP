import Hero from "@/components/home/Hero";
import Trust from "@/components/home/Trust";
import Services from "@/components/home/Services";
import WhyDashboard from "@/components/home/WhyDashboard";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import Industries from "@/components/home/Industries";
import Security from "@/components/home/Security";
import Testimonials from "@/components/home/Testimonials";
import ContactMap from "@/components/home/ContactMap";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <WhyDashboard />
      <CaseStudies />
      <Process />
      <Industries />
      <Security />
      <Testimonials />

      <section className="relative z-[2] py-32 text-center">
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

      <ContactMap />
    </>
  );
}
