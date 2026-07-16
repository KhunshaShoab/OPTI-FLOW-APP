"use client";

import { useEffect, useRef } from "react";

// A small glowing dot that follows instantly + a ring that eases behind it and
// expands over interactive elements. Desktop pointers only.
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.body.classList.add("cursor-none");

    let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-cursor='hover']")) ring.current?.classList.add("on");
    };
    const out = () => ring.current?.classList.remove("on");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan mix-blend-screen shadow-[0_0_12px_#00d4ff]" />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/60 mix-blend-screen transition-[width,height,background,border-color] duration-200"
      />
      <style>{`.cursor-ring.on{width:64px;height:64px;background:rgba(236,24,102,.12);border-color:rgba(236,24,102,.6)}`}</style>
    </>
  );
}
