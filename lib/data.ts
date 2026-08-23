export const SITE = {
  name: "OptiFlow Solutions",
  tagline: "Operations, Optimized.",
  email: "hello@optiflowsolutions.com",
  whatsapp: "+92 3XX XXXXXXX",
  location: "Lahore, Pakistan",
  markets: ["United States", "United Kingdom", "Europe", "Australia", "Middle East"],
  url: "https://optiflowsolutions.com",
};

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Why Us", href: "/why-optiflow" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    icon: "MessageSquare", env: "chat", title: "Live Chat",
    desc: "Fast, thoughtful conversations that help customers get answers without feeling like they're talking to a support script. Our agents work inside your helpdesk, learn your brand voice and handle everyday questions, troubleshooting and escalations.",
    tags: ["Gorgias", "Zendesk", "Intercom"],
  },
  {
    icon: "Headphones", env: "phone", title: "Phone Support",
    desc: "A reliable voice on the line when your customers need one. We handle inbound calls, outbound follow-ups, escalations and customer conversations with the tone and professionalism your brand expects.",
    tags: ["Inbound", "Outbound", "Escalations"],
  },
  {
    icon: "Mail", env: "email", title: "Email Support",
    desc: "Clear, well-written responses that solve the issue instead of creating another ticket. We manage customer emails, follow your SOPs and maintain consistent tone, documentation and response standards.",
    tags: ["Freshdesk", "Help Scout", "Re:amaze"],
  },
  {
    icon: "Wrench", env: "tech", title: "Technical Support",
    desc: "Technical products need more than scripted answers. Our support teams can handle troubleshooting, diagnostics, product questions and structured escalations — helping customers reach a resolution faster.",
    tags: ["Tier 1", "Tier 2", "Diagnostics"],
  },
  {
    icon: "ShoppingBag", env: "shopify", title: "Shopify & eCommerce Support",
    desc: "Give your storefront the support team it deserves. We handle order questions, returns, exchanges, subscriptions, product enquiries and pre-sale conversations across your customer journey.",
    tags: ["Shopify", "Recharge", "Klaviyo"],
  },
  {
    icon: "PhoneCall", env: "receptionist", title: "Virtual Receptionist",
    desc: "A professional first point of contact for your business. We answer calls, qualify enquiries, schedule appointments, route messages and make sure important conversations never disappear into voicemail.",
    tags: ["Live Answer", "Scheduling", "Routing"],
  },
  {
    icon: "Sparkles", env: "ai", title: "AI Automations",
    desc: "Automate the repetitive work around your support operation. We build workflows that draft responses, triage requests, update systems and move routine tasks forward — while your team focuses on customers.",
    tags: ["Automation", "Triage", "Workflows"],
  },
];

export const FEATURES = [
  { n: "01", title: "We resolve, we don't deflect", desc: "Customers should not have to repeat themselves or fight through scripts. Our teams are trained to understand the issue, follow your processes and work toward resolution." },
  { n: "02", title: "Coverage that fits your operation", desc: "Need business-hours support, extended coverage or 24/7 operations? We build coverage around your customers, channels and ticket volume." },
  { n: "03", title: "Built for changing volumes", desc: "Launches, promotions and seasonal spikes can change support volume overnight. Our teams are structured to scale with demand without sacrificing response quality." },
  { n: "04", title: "Your brand voice, every conversation", desc: "Your customers should feel like they are speaking to your team. We learn your tone, SOPs, products and escalation rules before going live." },
  { n: "05", title: "Transparent, global operations", desc: "Based in Lahore, Pakistan and built to support international brands across multiple time zones, channels and customer journeys." },
];

export const INDUSTRIES = [
  { icon: "ShoppingBag", name: "Shopify DTC", info: "Order status, exchanges, subscriptions and pre-sale conversion for DTC brands." },
  { icon: "ShoppingCart", name: "eCommerce", info: "Order status, WISMO, exchanges, pre-sale conversion." },
  { icon: "Cloud", name: "SaaS", info: "Onboarding, billing, retention and tier-1 troubleshooting." },
  { icon: "Cpu", name: "Hardware", info: "Setup, firmware, warranty and technical diagnostics." },
  { icon: "Repeat", name: "Subscriptions", info: "Billing, churn-saves and membership support." },
];

export const PROCESS = [
  { icon: "Search", title: "Discovery", desc: "We learn your products, customers, support channels, tools, SOPs and expected ticket volume." },
  { icon: "GraduationCap", title: "Training", desc: "Your dedicated team learns your brand voice, workflows, systems, macros and escalation process." },
  { icon: "Rocket", title: "Pilot", desc: "Start with a focused pilot to validate quality, workflow and fit before expanding." },
  { icon: "TrendingUp", title: "Scale", desc: "Increase coverage, channels and capacity as your customer volume grows." },
];

export const SECURITY = [
  "Confidentiality & NDAs",
  "Access-controlled systems",
  "GDPR-aware data handling",
  "Dedicated QA & reporting",
  "Secure operational processes",
  "No unnecessary long-term lock-ins",
];

export const TESTIMONIALS = [
  { quote: "They didn't just answer tickets — they learned our product and protected our ratings like it was their own business.", who: "Client Brand", role: "", av: "CB" },
  { quote: "Response times dropped and our customers noticed. It felt like scaling our own team, overnight.", who: "DTC Brand", role: "", av: "DT" },
  { quote: "Coachable, fast and genuinely invested. The pilot made the decision easy.", who: "Shopify DTC Brand", role: "", av: "SD" },
];

// Rough equirectangular coords (x,y in 0..1) for the contact routes map.
export const ROUTES = [
  { name: "Lahore, Pakistan", x: 0.685, y: 0.44, origin: true },
  { name: "United States", x: 0.20, y: 0.40 },
  { name: "United Kingdom", x: 0.47, y: 0.30 },
  { name: "Europe", x: 0.52, y: 0.33 },
  { name: "Australia", x: 0.86, y: 0.74 },
  { name: "Middle East", x: 0.60, y: 0.46 },
];

// Ticket categories used across the story + ops background (colour-coded flows).
export const TICKET_TYPES = [
  { label: "Chat", color: "#3B82F6" },
  { label: "Email", color: "#6E56F0" },
  { label: "Phone", color: "#60A5FA" },
  { label: "Shopify DTC", color: "#0EA5E9" },
  { label: "Technical", color: "#F5A524" },
  { label: "Billing", color: "#22C55E" },
  { label: "Returns", color: "#60A5FA" },
  { label: "Warranty", color: "#A855F7" },
  { label: "Subscriptions", color: "#F472B6" },
];
