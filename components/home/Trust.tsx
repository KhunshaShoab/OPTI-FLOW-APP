"use client";

const LOGOS = ["Shopify DTC brands", "eCommerce operators", "SaaS teams", "Hardware makers", "Subscription businesses", "Growing service brands"];

export default function Trust() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="relative z-[2] overflow-hidden border-y border-[#E5EAF2] bg-white/70 py-7">
      <div className="flex items-center gap-4">
        <span className="flex-none pl-6 font-grotesk text-[11.5px] uppercase tracking-[0.2em] text-faint">Built to support</span>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 group-hover:[animation-play-state:paused]">
            {row.map((l, i) => (
              <span key={i} className="whitespace-nowrap font-grotesk text-xl font-semibold text-[#52627A] opacity-70 transition hover:opacity-100 hover:[text-shadow:0_0_20px_rgba(37,99,235,.35)]">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
