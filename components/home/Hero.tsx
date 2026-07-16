"use client";

import { Canvas } from "@react-three/fiber";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import HeroCore from "./HeroCore";
import MagneticButton from "@/components/ui/MagneticButton";

// Apple-style per-element reveal: blur + opacity + rise → sharp focus → lock.
const rise: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(16px)" },
  show: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.15, delay: 0.25 + i * 0.16, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const [is3D, setIs3D] = useState(false);
  useEffect(() => { setIs3D(!window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  const replay = () => {
    try { localStorage.removeItem("optiflow_intro_seen_v1"); } catch {}
    window.dispatchEvent(new Event("optiflow:replay-intro"));
  };

  return (
    <header className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-center" style={{ background: "radial-gradient(120% 90% at 50% 45%, #0a0f22 0%, #050816 60%, #030409 100%)" }}>
      {is3D && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
            <HeroCore />
          </Canvas>
        </div>
      )}

      {/* readability: global veil + a soft focused pool behind the headline so
          moving objects never compete with the type */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(65% 55% at 50% 50%, rgba(5,8,22,.45), rgba(5,8,22,.82) 100%)" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[46vh] w-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[60px]" style={{ background: "radial-gradient(closest-side, rgba(5,8,22,.78), transparent)" }} />

      <div className="relative z-[3] shell px-6 py-32">
        <motion.span variants={rise} initial="hidden" animate="show" custom={0} className="eyebrow justify-center">
          The Operations Engine for global CX
        </motion.span>

        <h1 className="hero-title mx-auto mt-7 max-w-[15ch] font-display font-extrabold leading-[0.95] tracking-[-0.015em] text-[clamp(58px,10vw,132px)]">
          <motion.span variants={rise} initial="hidden" animate="show" custom={1} className="block">Operations,</motion.span>
          <motion.span variants={rise} initial="hidden" animate="show" custom={2} className="block grad-text">Optimized.</motion.span>
        </h1>

        <motion.p variants={rise} initial="hidden" animate="show" custom={3} className="mx-auto mt-7 max-w-xl text-[clamp(15px,1.7vw,19px)] leading-relaxed text-muted">
          OptiFlow orchestrates thousands of customer interactions — chat, phone, email, technical and Amazon support — into one seamless, always-on operation for brands across the US, UK, EU, AU &amp; ME.
        </motion.p>

        <motion.div variants={rise} initial="hidden" animate="show" custom={4} className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/contact">Book a free consultation</MagneticButton>
          <MagneticButton href="/services" variant="ghost">Explore the platform</MagneticButton>
        </motion.div>
      </div>

      <button onClick={replay} className="absolute bottom-6 right-6 z-[4] rounded-full border border-line bg-glass px-4 py-2 font-grotesk text-[12.5px] text-muted backdrop-blur-xl transition hover:text-white">
        ↺ Replay intro
      </button>
      <div className="absolute bottom-6 left-1/2 z-[4] -translate-x-1/2 font-grotesk text-[11px] uppercase tracking-[0.22em] text-faint">Scroll to explore</div>

      <style>{`
        .hero-title{ text-shadow: 0 0 34px rgba(0,212,255,.10); animation: heroGlow 7s ease-in-out infinite; }
        @keyframes heroGlow{
          0%,100%{ text-shadow: 0 2px 40px rgba(0,212,255,.12), 0 0 2px rgba(255,255,255,.10); }
          50%{ text-shadow: 0 2px 54px rgba(236,24,102,.16), 0 0 3px rgba(255,255,255,.14); }
        }
        @media (prefers-reduced-motion: reduce){ .hero-title{ animation: none; } }
      `}</style>
    </header>
  );
}
