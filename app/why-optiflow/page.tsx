import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import WhyDashboard from "@/components/home/WhyDashboard";
import GrowthTrajectory from "@/components/ui/GrowthTrajectory";

export const metadata: Metadata = {
  title: "Why OptiFlow",
  description:
    "Why growing brands choose OptiFlow: trained agents, coverage that fits your operation, brand-consistent conversations and transparent global operations.",
};

export default function Page() {
  return (
    <PageShell
      kicker="Why OptiFlow"
      title={<>More than a call centre. <span className="grad-text">A growth partner.</span></>}
      intro="Support done right protects revenue, ratings and retention — it doesn't become another operational bottleneck. Here's what sets us apart."
      visual={<GrowthTrajectory />}
    >
      <WhyDashboard />
    </PageShell>
  );
}
