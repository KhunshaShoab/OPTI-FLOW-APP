import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Blog", description: "Insights on customer experience, outsourcing and support operations." };

const POSTS = [
  { t: "In-house vs outsourced support: the real cost", tag: "Operations", d: "A clear-eyed breakdown of what an in-house support team actually costs." },
  { t: "How to protect your Amazon ODR at scale", tag: "Amazon", d: "Practical tactics to keep your seller metrics healthy during growth." },
  { t: "CX response-time benchmarks for 2026", tag: "Benchmarks", d: "What 'fast' really means across chat, email and phone today." },
];

export default function Page() {
  return (
    <PageShell kicker="Blog" title={<>Ideas on <span className="grad-text">customer experience.</span></>} intro="Insights on support operations, outsourcing and building CX that customers remember.">
      <div className="grid gap-5 md:grid-cols-3">
        {POSTS.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08}>
            <article className="glass h-full p-7 transition hover:border-line2 hover:-translate-y-1">
              <span className="font-grotesk text-[11px] uppercase tracking-wide text-cyan">{p.tag}</span>
              <h3 className="font-display mt-3 text-lg font-semibold">{p.t}</h3>
              <p className="mt-2.5 text-sm text-muted">{p.d}</p>
              <span className="mt-4 inline-block text-sm text-cyan">Read more →</span>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-faint">Articles coming soon — connect a CMS (Sanity, Contentlayer or MDX) to publish.</p>
    </PageShell>
  );
}
