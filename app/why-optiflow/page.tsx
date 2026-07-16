import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import WhyDashboard from "@/components/home/WhyDashboard";

export const metadata: Metadata = { title: "Why OptiFlow", description: "Why brands choose OptiFlow: technical depth, follow-the-sun coverage and coachable agents." };

export default function Page() {
  return (
    <PageShell kicker="Why OptiFlow" title={<>More than a call centre. <span className="grad-text">A growth partner.</span></>} intro="Support done right protects revenue, ratings and retention. Here's what sets us apart.">
      <WhyDashboard />
    </PageShell>
  );
}
