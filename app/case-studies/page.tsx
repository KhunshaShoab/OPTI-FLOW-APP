import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import CaseStudies from "@/components/home/CaseStudies";

export const metadata: Metadata = { title: "Case Studies", description: "How OptiFlow supports Creality3D, Everwash, Yarbo and top Amazon sellers." };

export default function Page() {
  return (
    <PageShell kicker="Case studies" title={<>Brands that <span className="grad-text">trust us</span> with their customers.</>}>
      <CaseStudies />
    </PageShell>
  );
}
