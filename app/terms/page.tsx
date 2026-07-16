import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Prose from "@/components/ui/Prose";

export const metadata: Metadata = { title: "Terms of Service", description: "The terms governing use of the OptiFlow Solutions website." };

export default function Page() {
  return (
    <PageShell kicker="Legal" title="Terms of Service" cta={false}>
      <Prose sections={[
        { h: "Acceptance", p: "By accessing this website you agree to these terms. If you do not agree, please do not use the site." },
        { h: "Use of the site", p: "This site is provided for informational purposes about OptiFlow Solutions' services. You agree not to misuse it or attempt to disrupt its operation." },
        { h: "Services", p: "Any support services are governed by a separate written services agreement between OptiFlow Solutions and the client. Nothing on this site constitutes a binding offer." },
        { h: "Intellectual property", p: "All content, branding and design on this site are owned by OptiFlow Solutions unless stated otherwise." },
        { h: "Limitation of liability", p: "The site is provided 'as is'. To the fullest extent permitted by law, OptiFlow Solutions is not liable for any damages arising from its use." },
      ]} />
    </PageShell>
  );
}
