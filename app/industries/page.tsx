import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Industries from "@/components/home/Industries";
import IndustryFan from "@/components/ui/IndustryFan";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Specialist customer support for Shopify DTC, eCommerce, SaaS, hardware and subscription businesses — trained around your products, tools and customers.",
};

export default function Page() {
  return (
    <PageShell
      kicker="Industries"
      title={<>Specialists for <span className="grad-text">your world.</span></>}
      intro="Every industry has different customers, workflows and failure points. We train our teams around yours — so support feels native to your business, not outsourced."
      visual={<IndustryFan />}
    >
      <Industries />
    </PageShell>
  );
}
