import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Process from "@/components/home/Process";

export const metadata: Metadata = { title: "How It Works", description: "Discovery, training, pilot and scale — live in days, not months." };

export default function Page() {
  return (
    <PageShell kicker="How it works" title={<>Live in <span className="grad-text">days</span>, not months.</>} intro="A low-risk path from first call to a support team that feels like your own.">
      <Process />
    </PageShell>
  );
}
