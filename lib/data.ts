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
  { label: "Case Studies", href: "/case-studies" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

// Benefit-first copy — every service answers "why trust us with your customers?"
export const SERVICES = [
  {
    icon: "MessageSquare", env: "chat", title: "Live Chat",
    desc: "Your customers deserve responses that feel personal, fast, and effortless. We build dedicated teams that represent your brand like they're sitting in your own office.",
    tags: ["Gorgias", "Zendesk", "Intercom"],
  },
  {
    icon: "Headphones", env: "phone", title: "Phone Support",
    desc: "A calm, capable voice on the line the moment your customer needs one — handling inbound and outbound calls with the warmth of an in-house team.",
    tags: ["Inbound", "Outbound", "Escalations"],
  },
  {
    icon: "Mail", env: "email", title: "Email Support",
    desc: "Thoughtful, well-written replies that resolve the issue the first time — consistent tone, tidy tickets, and SLAs your customers can feel.",
    tags: ["Freshdesk", "Help Scout", "Re:amaze"],
  },
  {
    icon: "Wrench", env: "tech", title: "Technical Support",
    desc: "Complex products need knowledgeable support. From troubleshooting hardware to resolving software issues, our specialists handle the conversations generic call centers can't.",
    tags: ["Tier 1", "Tier 2", "Diagnostics"],
  },
  {
    icon: "Package", env: "amazon", title: "Amazon Support",
    desc: "Protect your seller reputation with specialists who understand Amazon's policies, performance metrics, A-to-z claims, returns, and buyer expectations.",
    tags: ["A-to-z", "Reviews", "ODR"],
  },
  {
    icon: "LayoutGrid", env: "ops", title: "Back Office",
    desc: "Order management, data entry and CRM hygiene handled quietly in the background — so your operations stay clean while you focus on growth.",
    tags: ["Shopify", "HubSpot", "Salesforce"],
  },
];

export const FEATURES = [
  { n: "01", title: "We resolve, we don't deflect", desc: "Proven with technical brands like Creality3D, Yarbo and Everwash — real problem-solving, not scripted deflection." },
  { n: "02", title: "Always-on, follow-the-sun coverage", desc: "As one time zone sleeps, another lights up. Someone is always working your queue — nights, weekends, holidays." },
  { n: "03", title: "Calm at 10 or 10,000 tickets", desc: "Launches, viral moments and BFCM absorbed by cross-trained agents — response times hold when volume spikes." },
  { n: "04", title: "Your brand voice, every message", desc: "The same agent speaks luxury, friendly or professional — trained on your tone, macros and SOPs." },
  { n: "05", title: "Transparent & global", desc: "Proudly based in Lahore, Pakistan — supporting brands across the US, UK, EU, AU & ME." },
];

export const INDUSTRIES = [
  { icon: "Package", name: "Amazon", info: "Rating & ODR protection, returns, A-to-z, review response." },
  { icon: "ShoppingCart", name: "eCommerce", info: "Order status, WISMO, exchanges, pre-sale conversion." },
  { icon: "Cloud", name: "SaaS", info: "Onboarding, billing, retention and tier-1 troubleshooting." },
  { icon: "Cpu", name: "Hardware", info: "Setup, firmware, warranty and technical diagnostics." },
  { icon: "Repeat", name: "Subscriptions", info: "Billing, churn-saves and membership support." },
];

export const CASES = [
  { client: "Creality3D", tag: "Consumer 3D Printing", challenge: "A global hardware brand with complex technical tickets and rising escalations.", solution: "Tier 1 + Tier 2 specialists trained on the full product line — real troubleshooting, not scripts.", result: "Faster first response, fewer escalations." },
  { client: "Yarbo", tag: "Outdoor Robotics", challenge: "A sophisticated, high-value connected robot needing genuinely expert help.", solution: "Specialist agents guiding setup, firmware and warranty with patience and precision.", result: "Confident customers, protected reputation." },
  { client: "Everwash", tag: "Subscription SaaS", challenge: "Billing and membership questions quietly threatening retention.", solution: "Dedicated agents owning billing, membership and retention-critical conversations.", result: "Retention issues resolved with care." },
];

export const PROCESS = [
  { icon: "Search", title: "Discovery", desc: "We learn your product, tone, tools and ticket volumes." },
  { icon: "GraduationCap", title: "Training", desc: "Agents trained on your SOPs, macros and systems." },
  { icon: "Rocket", title: "Pilot", desc: "A short, paid pilot proves quality and fit — low risk." },
  { icon: "TrendingUp", title: "Scale", desc: "We ramp capacity as your volume grows." },
];

export const SECURITY = [
  "Signed NDAs & confidentiality",
  "GDPR-aware data handling",
  "Secure, access-controlled systems",
  "Native-level English agents",
  "Dedicated QA & reporting",
  "No long lock-in contracts",
];

export const TESTIMONIALS = [
  { quote: "They didn't just answer tickets — they learned our product and protected our ratings like it was their own business.", who: "Client Brand", role: "Replace with a real quote", av: "CB" },
  { quote: "Response times dropped and our customers noticed. It felt like scaling our own team, overnight.", who: "DTC Brand", role: "Replace with a real quote", av: "DT" },
  { quote: "Coachable, fast and genuinely invested. The pilot made the decision easy.", who: "Amazon Seller", role: "Replace with a real quote", av: "AS" },
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
  { label: "Chat", color: "#00D4FF" },
  { label: "Email", color: "#6E56F0" },
  { label: "Phone", color: "#00C2A8" },
  { label: "Amazon", color: "#EC1866" },
  { label: "Technical", color: "#F5A524" },
  { label: "Billing", color: "#22C55E" },
  { label: "Returns", color: "#38BDF8" },
  { label: "Warranty", color: "#A855F7" },
  { label: "Subscriptions", color: "#F472B6" },
];
