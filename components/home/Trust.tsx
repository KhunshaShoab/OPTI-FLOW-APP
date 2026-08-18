"use client";

const LOGOS = ["Creality3D", "Everwash", "Yarbo", "Top Shopify DTC Brands", "AI-Powered Ops", "SaaS Teams"];

export default function Trust() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="relative z-[2] overflow-hidden border-y border-line bg-white/[0.012] py-7">
      <div className="flex items-center gap-4">
        <span className="flex-none pl-6 font-grotesk text-[11.5px] uppercase tracking-[0.2em] text-faint">Trusted to support</span>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 group-hover:[animation-play-state:paused]">
            {row.map((l, i) => (
              <span key={i} className="whitespace-nowrap font-grotesk text-xl font-semibold text-[#c8cfe4] opacity-55 transition hover:opacity-100 hover:[text-shadow:0_0_20px_rgba(59,130,246,.6)]">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
