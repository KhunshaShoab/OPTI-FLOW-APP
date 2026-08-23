import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import ContactMap from "@/components/home/ContactMap";

export const metadata: Metadata = { title: "Contact", description: "Book a free consultation with OptiFlow Solutions. Based in Lahore, serving the world." };

export default function Page() {
  return (
    <PageShell kicker="Contact" title={<>Let's <span className="grad-text">talk.</span></>} intro="Tell us what you're handling today — your channels, volume, coverage needs and biggest operational bottleneck. We'll show you where OptiFlow can fit." cta={false}>
      <ContactMap />
    </PageShell>
  );
}
