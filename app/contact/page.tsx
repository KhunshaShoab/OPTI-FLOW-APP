import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import ContactMap from "@/components/home/ContactMap";
import GlobalNetwork from "@/components/ui/GlobalNetwork";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to OptiFlow about your customer support and operations. Based in Lahore, working with brands across the US, UK, EU, Middle East and Australia.",
};

export default function Page() {
  return (
    <PageShell
      kicker="Reach"
      title={<>Lahore. <span className="grad-text">Global connections.</span></>}
      intro="Tell us what you're handling today — your channels, volume, coverage needs and biggest operational bottleneck. We'll show you where OptiFlow can fit."
      visual={<GlobalNetwork />}
      cta={false}
    >
      <ContactMap />
    </PageShell>
  );
}
