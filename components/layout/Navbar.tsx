"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] flex justify-center">
      <nav
        className={cn(
          "mt-4 flex w-[min(1200px,calc(100%-32px))] items-center justify-between rounded-full border border-line px-3 py-2.5 pl-5 backdrop-blur-xl transition-colors duration-300",
          scrolled ? "bg-[rgba(11,30,63,.82)]" : "bg-[rgba(15,33,69,.5)]"
        )}
      >
        <Link href="/" className="flex items-center gap-3 font-grotesk font-semibold">
          <span className="relative h-7 w-7 flex-none animate-spinSlow rounded-[9px] shadow-[0_0_20px_-4px_#3b82f6]" style={{ background: "conic-gradient(from 200deg,#F97316,#3B82F6,#38BDF8,#F97316)" }}>
            <span className="absolute inset-1.5 rounded-[5px] bg-bg2" />
          </span>
          OptiFlow<span className="font-normal text-faint">Solutions</span>
        </Link>

        <div className="hidden items-center gap-8 font-grotesk text-sm text-muted md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="group relative transition-colors hover:text-white">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-mag to-cyan transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex"><span className="relative z-[2]">Book a call</span></Link>
          <button aria-label="Menu" className="flex flex-col gap-[5px] p-1.5 md:hidden" onClick={() => setOpen((o) => !o)}>
            <span className="h-0.5 w-5 rounded bg-white" /><span className="h-0.5 w-5 rounded bg-white" /><span className="h-0.5 w-5 rounded bg-white" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute top-20 w-[min(1200px,calc(100%-32px))] rounded-2xl border border-line bg-[rgba(11,30,63,.95)] p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 font-grotesk">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-muted hover:bg-white/5 hover:text-white">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-2 justify-center"><span className="relative z-[2]">Book a call</span></Link>
          </div>
        </div>
      )}
    </header>
  );
}
