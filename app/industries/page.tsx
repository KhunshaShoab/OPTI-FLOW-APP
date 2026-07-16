import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Industries from "@/components/home/Industries";

export const metadata: Metadata = { title: "Industries", description: "Specialist support for Amazon, eCommerce, SaaS, electronics and subscription brands." };

export default function Page() {
  return (
    <PageShell kicker="Industries" title={<>Specialists for <span className="grad-text">your world.</span></>} intro="We don't do one-size-fits-all. Each vertical gets agents trained on its products, tools and edge cases.">
      <Industries />
    </PageShell>
  );
}
