import Reveal from "./Reveal";

export default function SectionHead({ kicker, title, sub, center = true }: { kicker: string; title: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto mb-16 max-w-2xl text-center" : "mb-16 max-w-2xl"}>
      <span className={`eyebrow ${center ? "justify-center" : ""}`}>{kicker}</span>
      <h2 className="h-display mt-5 text-[clamp(32px,4.6vw,54px)] leading-tight">{title}</h2>
      {sub && <p className={`mt-5 text-[16.5px] text-muted ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>{sub}</p>}
    </Reveal>
  );
}
