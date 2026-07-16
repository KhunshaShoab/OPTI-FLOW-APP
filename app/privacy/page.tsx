import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import Prose from "@/components/ui/Prose";

export const metadata: Metadata = { title: "Privacy Policy", description: "How OptiFlow Solutions collects, uses and protects personal data." };

export default function Page() {
  return (
    <PageShell kicker="Legal" title="Privacy Policy" cta={false}>
      <Prose sections={[
        { h: "Overview", p: "OptiFlow Solutions respects your privacy. This policy explains what information we collect through this website and how we use it. We only collect what we need to respond to your enquiries." },
        { h: "Information we collect", p: "When you submit a contact form we collect the details you provide — such as your name, company, email and message. We may also collect anonymous analytics about how the site is used." },
        { h: "How we use it", p: "We use your information solely to respond to your request, provide our services and improve the site. We do not sell your data to third parties." },
        { h: "Client customer data", p: "When we provide support services, we act as a data processor on behalf of our clients and handle end-customer data strictly under contract, with confidentiality and access controls." },
        { h: "Your rights", p: "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@optiflowsolutions.com." },
      ]} />
    </PageShell>
  );
}
