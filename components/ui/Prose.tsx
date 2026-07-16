export default function Prose({ sections }: { sections: { h: string; p: string }[] }) {
  return (
    <div className="glass mx-auto max-w-3xl space-y-8 p-8 md:p-12">
      {sections.map((s) => (
        <section key={s.h}>
          <h2 className="font-display text-xl font-semibold">{s.h}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.p}</p>
        </section>
      ))}
      <p className="text-xs text-faint">This is a template. Have it reviewed by legal counsel before publishing.</p>
    </div>
  );
}
