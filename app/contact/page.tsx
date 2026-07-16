import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import ContactMap from "@/components/home/ContactMap";

export const metadata: Metadata = { title: "Contact", description: "Book a free consultation with OptiFlow Solutions. Based in Lahore, serving the world." };

export default function Page() {
  return (
    <PageShell kicker="Contact" title={<>Let's <span className="grad-text">talk.</span></>} intro="Tell us your channels, volume and coverage needs — we'll map out how OptiFlow takes support off your plate." cta={false}>
      <ContactMap />
    </PageShell>
  );
}
