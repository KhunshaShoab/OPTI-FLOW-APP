"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function MagneticButton({ href, children, variant = "primary", className }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)}
    >
      {variant === "primary" && (
        <span className="h-[7px] w-[7px] rounded-full bg-cyan shadow-[0_0_10px_#00d4ff] animate-pulseGlow" />
      )}
      <span className="relative z-[2]">{children}</span>
    </Link>
  );
}
