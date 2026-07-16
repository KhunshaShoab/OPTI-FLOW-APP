import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Prose from "@/components/ui/Prose";
import { SECURITY } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Data Security", description: "How OptiFlow Solutions protects your customer data and brand reputation." };

export default function Page() {
  return (
    <PageShell kicker="Trust" title={<>Your data, <span className="grad-text">protected.</span></>} intro="Western-grade security practices from day one. We treat your customer data and brand reputation as our own.">
      <Reveal>
        <div className="glass mb-6 grid gap-3.5 p-8 sm:grid-cols-2">
          {SECURITY.map((s) => <div key={s} className="flex gap-2.5 text-[15px] text-[#dfe3f0]"><span className="text-teal">✓</span>{s}</div>)}
        </div>
      </Reveal>
      <Prose sections={[
        { h: "Confidentiality", p: "Every agent signs an NDA. Access to client systems and customer data is restricted on a need-to-know basis and revoked immediately when an engagement ends." },
        { h: "Secure access", p: "We use access-controlled systems, strong authentication and secure workstations. We follow your tooling and security requirements." },
        { h: "GDPR-aware handling", p: "We handle personal data in line with GDPR principles and act as a processor under your instructions, with clear accountability." },
        { h: "Quality & oversight", p: "Dedicated QA, monitoring and reporting keep quality high and give you full visibility into how your customers are supported." },
      ]} />
    </PageShell>
  );
}
