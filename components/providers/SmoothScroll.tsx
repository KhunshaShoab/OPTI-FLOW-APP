"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scroll";

// Buttery smooth scrolling (Lenis) synced with GSAP ScrollTrigger, plus a global
// scroll-progress feed for the 3D Journey Engine. Disabled for reduced-motion.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    if (!reduce) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time * 1000);
        requestAnimationFrame(raf as any);
      };
      gsap.ticker.add(lenis ? (t) => lenis!.raf(t * 1000) : () => {});
      gsap.ticker.lagSmoothing(0);
    }

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      scrollState.y = window.scrollY;
      scrollState.progress = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
