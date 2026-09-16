export const SITE = {
  name: "OptiFlowCX",
  tagline: "Customer Experience. Optimized.",
  email: "info@optiflowcx.com",
  phone: "+923058910960",
  phoneDisplay: "+92 305 8910960",
  whatsapp: "+923058910960",
  whatsappLink: "https://wa.me/923058910960",
  location: "Lahore, Pakistan",
  markets: ["United States", "United Kingdom", "Europe", "Australia", "Middle East"],
  url: "https://optiflowcx.com",
};

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-it-works" },
  { label: "Projects", href: "/projects" },
  { label: "Technology", href: "/technology" },
  { label: "Contact", href: "/contact" },
];

// The six capabilities, framed as things OptiFlowCX has actually built and operated.
export const SERVICES = [
  {
    icon: "MessageSquare", env: "chat", title: "Customer Support",
    desc: "Omnichannel support built around your brand. Trained agents handling email, chat, phone and ticketing with the tone and knowledge your customers expect from your team.",
    tags: ["Email", "Chat", "Phone", "Ticketing"],
  },
  {
    icon: "ShoppingBag", env: "shopify", title: "E-Commerce CX",
    desc: "Support operations designed for the pace of direct-to-consumer commerce. WISMO, order management, returns, refunds, exchanges and product inquiries — handled inside the tools your team already uses.",
    tags: ["WISMO", "Orders", "Returns", "Exchanges"],
  },
  {
    icon: "Sparkles", env: "ai", title: "Pre-Sales",
    desc: "Turn customer questions into better buying experiences. Product education, pre-bookings, purchase assistance, discount inquiries and product recommendations — the conversation that leads to a sale.",
    tags: ["Inquiries", "Pre-bookings", "Assistance"],
  },
  {
    icon: "Wrench", env: "tech", title: "Technical Support",
    desc: "Product and technical assistance for customers. Troubleshooting, product guidance, technical inquiries and structured escalation into L2 when a case requires specialist attention.",
    tags: ["Tier 1", "Tier 2", "Diagnostics"],
  },
  {
    icon: "Plug", env: "email", title: "CX Operations",
    desc: "We build the systems behind the support team. SOPs, workflows, macros, knowledge processes, escalation structures and L1 / L2 support models — the operational infrastructure that lets a team scale.",
    tags: ["SOPs", "Workflows", "L1 / L2"],
  },
  {
    icon: "Headphones", env: "phone", title: "24/7 Support Operations",
    desc: "Around-the-clock customer support delivered through structured teams and operational coverage. Multi-channel — chat, email, phone — with shift management and continuous coverage.",
    tags: ["Multi-channel", "Shifts", "Continuous"],
  },
];

export const FEATURES = [
  { n: "01", title: "Dedicated teams", desc: "Named, brand-trained agents chosen around your specific operational requirements. Not a pool. Not a queue. Your extended team, living inside your CRM." },
  { n: "02", title: "Operational infrastructure", desc: "We don't just place agents. We build the workflows, SOPs, macros and escalation systems that let a support operation run without leadership having to be in every conversation." },
  { n: "03", title: "Scalable support", desc: "Start with a small team and scale as your customer volume and operational needs grow. Silksilky went from one resource to six. Yarbo went from three to fifteen." },
  { n: "04", title: "24/7 coverage", desc: "Structured operations designed to provide continuous customer support across shifts, time zones and channels — chat, email and phone." },
  { n: "05", title: "Continuous improvement", desc: "QA, feedback, coaching and process refinement built into the operating rhythm. The way support is delivered gets better over time, not just bigger." },
];

// Adjacent industries — logistics and hardware remain the primary verticals.
export const INDUSTRIES = [
  { icon: "ShoppingBag", name: "E-Commerce / DTC", info: "WISMO, order support, returns, refunds, exchanges and product inquiries for direct-to-consumer brands." },
  { icon: "Cpu", name: "Hardware", info: "Setup guidance, firmware conversations, warranty and technical support for connected and consumer hardware." },
  { icon: "ShoppingCart", name: "Logistics", info: "Support and dispatch coordination for last-mile, courier and transportation operators." },
  { icon: "Cloud", name: "SaaS", info: "Product questions, onboarding, account issues and customer retention conversations." },
  { icon: "Repeat", name: "Subscriptions", info: "Billing, cancellations, renewals and retention-focused support across recurring products." },
];

// Five-step operating rhythm — from first conversation to fully operational CX.
export const PROCESS = [
  { icon: "Search", title: "Discover", desc: "Understand your business, customers, products, existing support operation and the moments in your day where things stall." },
  { icon: "GraduationCap", title: "Design", desc: "Build the workflows, SOPs, escalation paths, macros and operational structures the team will run on." },
  { icon: "Rocket", title: "Deploy", desc: "Introduce dedicated resources and train them around your brand voice, product and customer journey." },
  { icon: "TrendingUp", title: "Operate", desc: "Manage day-to-day customer interactions across the required channels — chat, email, phone, ticketing." },
  { icon: "Sparkles", title: "Optimize", desc: "Use QA, feedback, operational data and real customer conversations to continuously improve the operation." },
];

export const SECURITY = [
  "Confidentiality & NDAs",
  "Access-controlled systems",
  "GDPR-aware data handling",
  "Dedicated QA & reporting",
  "Secure operational processes",
  "No unnecessary long-term lock-ins",
];

// Client case studies — Silksilky and Yarbo are verified; SwiftX and Creality 3D are structured placeholders.
export const CASES = [
  {
    slug: "silksilky",
    name: "Silksilky",
    industry: "E-Commerce · DTC",
    tagline: "From a 1-person operation to a 24/7 customer support team.",
    verified: true,
    scale: { from: "1", to: "6", label: "support resources" },
    coverage: "24/7",
    channels: ["Email"],
    platforms: ["Re:amaze", "Shopify Admin"],
    operations: ["WISMO", "Sizing", "Returns", "Refunds", "Exchanges"],
    volume: "100–150 emails per resource / day",
    outcome: "Average Google rating moved from ~3.4 to ~4.4 during the engagement.",
    phases: [
      { title: "Starting point", body: "OptiFlowCX began working with Silksilky with a 1-person support operation." },
      { title: "Building the operation", body: "We developed and improved customer support workflows, SOPs, customer experience processes, resolution procedures and escalation processes." },
      { title: "Scaling", body: "The operation expanded from 1 to 6 resources with 24/7 around-the-clock coverage." },
    ],
  },
  {
    slug: "yarbo",
    name: "Yarbo",
    industry: "Outdoor Robotics · Hardware",
    tagline: "From pre-sales support to a 15-person, 24/7 customer experience operation.",
    verified: true,
    scale: { from: "3", to: "15", label: "support resources" },
    coverage: "24/7",
    channels: ["Chat", "Email", "Phone"],
    platforms: ["Zoho Desk", "Zoho Voice"],
    operations: [
      "Order status",
      "Pre-sales inquiries",
      "Discounts",
      "After-sales technical support",
      "Returns",
      "Refunds",
      "Exchanges",
    ],
    phases: [
      { title: "Phase 01 — Pre-sales", body: "OptiFlowCX initially supported Yarbo's pre-sales operation — pre-bookings, product inquiries, product knowledge and customer assistance." },
      { title: "Phase 02 — After-sales", body: "The operation expanded into after-sales support. Team grew from 3 to 15 resources across chat, email and phone with 24/7 coverage." },
      { title: "Phase 03 — Process development", body: "We developed workflows, SOPs, macros, L1 support processes and escalation workflows to run the operation reliably at scale." },
      { title: "Phase 04 — L2 support", body: "Experienced resources progressed into the L2 support structure based on operational experience and performance." },
    ],
  },
  {
    slug: "swiftx",
    name: "SwiftX",
    industry: "Logistics · Last-Mile",
    tagline: "Case study — details coming soon.",
    verified: false,
    scale: { from: "—", to: "—", label: "support resources" },
    coverage: "—",
    channels: [],
    platforms: [],
    operations: [],
    phases: [
      { title: "Journey", body: "Verified engagement details will be published as the client approves them." },
    ],
  },
  {
    slug: "creality-3d",
    name: "Creality 3D",
    industry: "Consumer 3D Printing · Hardware",
    tagline: "Case study — details coming soon.",
    verified: false,
    scale: { from: "—", to: "—", label: "support resources" },
    coverage: "—",
    channels: [],
    platforms: [],
    operations: [],
    phases: [
      { title: "Journey", body: "Verified engagement details will be published as the client approves them." },
    ],
  },
];

// Platforms OptiFlowCX teams have hands-on operational experience in.
// Never described as a partnership unless independently verified.
export const PLATFORMS = [
  { name: "Shopify", role: "Store admin, order operations, DTC support inside Shopify Admin." },
  { name: "Re:amaze", role: "Customer support inbox, macros, workflows and reporting." },
  { name: "Zoho Desk", role: "Ticketing, SOPs, L1 / L2 routing and escalation flows." },
  { name: "Zoho Voice", role: "Inbound and outbound voice operations inside the Zoho stack." },
];

// The only metrics on the site — all verified and attributed to their specific engagement.
export const RESULTS = [
  { from: "1", to: "6", label: "Silksilky support resources", note: "Team scaled from a single resource." },
  { from: "3", to: "15", label: "Yarbo support resources", note: "Team scaled across pre-sales and after-sales." },
  { value: "24/7", label: "Operational coverage", note: "Structured shift coverage across engagements." },
  { from: "3.4", to: "4.4", label: "Silksilky average Google rating", note: "Rating rose ~3.4 to ~4.4 during the engagement." },
  { value: "100–150", label: "Emails / resource / day", note: "Silksilky email support volume." },
  { value: "3", label: "Yarbo support channels", note: "Chat · Email · Phone." },
];

// Operating principles — how OptiFlowCX thinks about CX.
export const PRINCIPLES = [
  { title: "Ownership", body: "Treat the operation like an extension of the client's team, not a queue to be worked." },
  { title: "Structure", body: "Build repeatable processes so quality doesn't depend on any single agent's judgment." },
  { title: "Scalability", body: "Design systems that can grow with customer volume without breaking the operation." },
  { title: "Continuous improvement", body: "Use QA, feedback and real customer conversations to make the operation better every week." },
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

export const TICKET_TYPES = [
  { label: "Chat", color: "#3B82F6" },
  { label: "Email", color: "#6E56F0" },
  { label: "Phone", color: "#60A5FA" },
  { label: "E-Commerce", color: "#0EA5E9" },
  { label: "Technical", color: "#F5A524" },
  { label: "Pre-Sales", color: "#22C55E" },
  { label: "Returns", color: "#60A5FA" },
  { label: "Warranty", color: "#A855F7" },
  { label: "Subscriptions", color: "#F472B6" },
];
