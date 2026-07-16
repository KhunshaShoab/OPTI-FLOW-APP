import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Services from "@/components/home/Services";

export const metadata: Metadata = { title: "Services", description: "Live chat, phone, email, technical, Amazon and back-office support for global brands." };

export default function Page() {
  return (
    <PageShell kicker="Services" title={<>Everything your customers need, <span className="grad-text">handled.</span></>} intro="Omnichannel customer support under one quality standard — trained on your product, your tone and your tools.">
      <Services />
    </PageShell>
  );
}
