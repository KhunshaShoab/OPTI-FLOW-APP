import Hero from "@/components/home/Hero";
import Trust from "@/components/home/Trust";
import Services from "@/components/home/Services";
import WhyDashboard from "@/components/home/WhyDashboard";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Results from "@/components/home/Results";
import Industries from "@/components/home/Industries";
import Security from "@/components/home/Security";
import ContactMap from "@/components/home/ContactMap";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <ProjectsPreview />
      <Results />
      <WhyDashboard />
      <Process />
      <Industries />
      <Security />

      <section className="on-light relative z-[2] py-32 text-center">
        <div className="shell">
          <Reveal>
            <span className="eyebrow justify-center">Ready when you are</span>
            <h2 className="h-display mt-6 text-[clamp(34px,5.6vw,64px)]">
              Ready to build a <span className="grad-text">better customer experience?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">
              Tell us what your customers need — your channels, volume, coverage requirements and biggest operational bottleneck. We'll help you design the operation behind it.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">Let's talk →</MagneticButton>
              <MagneticButton href="/projects" variant="ghost">Explore our work</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactMap />
    </>
  );
}
