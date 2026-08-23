import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Process from "@/components/home/Process";
import WorkflowHub from "@/components/ui/WorkflowHub";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How OptiFlow gets your support operation live — from discovery and training to a low-risk pilot and full scale.",
};

export default function Page() {
  return (
    <PageShell
      kicker="Process"
      title={<>Live in <span className="grad-text">days</span>, not months.</>}
      intro="A low-risk path from first call to a support team that runs like your own — discovery, training, pilot, scale."
      visual={<WorkflowHub />}
    >
      <Process />
    </PageShell>
  );
}
