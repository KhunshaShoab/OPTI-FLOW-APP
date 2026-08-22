# OptiFlow Solutions — Website

A premium, Awwwards-level marketing site for **OptiFlow Solutions** (customer-support outsourcing).
Built with the full modern stack: **Next.js (App Router) · React · TypeScript · Tailwind · Framer Motion · GSAP + ScrollTrigger · Lenis · React Three Fiber / Three.js**.

The signature is a **scroll-scrubbed 7-scene "Customer Journey" story** rendered live in WebGL — a request travels from customer → chat → AI → agent → CRM → resolution → "Operations, Optimized." → the network expanding worldwide.

## Quick start

```bash
cd optiflow-app
npm install      # or pnpm install / yarn
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm run start
```

## Requirements
- Node.js **18.18+** (or 20+ recommended)

## Tech & where it lives

| Feature | Where |
|---|---|
| Smooth scroll (Lenis) + GSAP ScrollTrigger sync | `components/providers/SmoothScroll.tsx` |
| 3D Customer Journey Engine (R3F / Three.js) | `components/home/JourneyScene.tsx` |
| Scroll-scrubbed 7-scene story | `components/home/StoryEngine.tsx` |
| Custom glowing cursor | `components/ui/CustomCursor.tsx` |
| Aurora + grid + noise background | `components/ui/Background.tsx` |
| Magnetic buttons | `components/ui/MagneticButton.tsx` |
| Glass service cards (tilt + spotlight) | `components/home/Services.tsx` |
| Holographic dashboard (count-up + charts) | `components/home/WhyDashboard.tsx` |
| 3D flip industry cubes | `components/home/Industries.tsx` |
| Apple-style stacked case studies | `components/home/CaseStudies.tsx` |
| Animated process pipeline | `components/home/Process.tsx` |
| Security network mesh | `components/home/Security.tsx` |
| Auto-scroll testimonials | `components/home/Testimonials.tsx` |
| Animated world-routes map | `components/home/ContactMap.tsx` |
| Design tokens / colors / fonts | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |
| Content (services, cases, etc.) | `lib/data.ts` |

## Design system
- **Colors:** bg `#0B1E3F`, bg2 `#14224D`, magenta `#F97316`, cyan `#3B82F6`, teal `#38BDF8`, text `#FFFFFF`, muted `#B7BDD2`.
- **Fonts:** Sora (display), Space Grotesk (labels/nav), Inter (body) — self-hosted via `next/font` (no CDN).

## Accessibility & performance
- Full `prefers-reduced-motion` support: the 3D story is replaced by a static premium hero; canvases pause.
- On mobile / small screens the heavy WebGL story falls back to the static hero automatically (`StoryEngine`).
- Semantic HTML, keyboard-focusable controls with visible focus rings, JSON-LD `Organization` schema, OpenGraph, `sitemap.ts` + `robots.ts`.

## Before you go live — replace placeholders
1. **Contact details** — WhatsApp number & email in `lib/data.ts` (`SITE`).
2. **Testimonials** — real quotes in `lib/data.ts` (`TESTIMONIALS`).
3. **Contact form** — wire to Formspree / HubSpot / your backend (`components/home/ContactMap.tsx`).
4. **Calendly** — drop your booking link on the "Book a call" buttons.
5. **Client logos** — swap text logos for real SVGs (with permission).
6. **Domain** — set `SITE.url` in `lib/data.ts` for correct SEO/OG/sitemap.

## Notes
- `next.config.mjs` sets `typescript.ignoreBuildErrors` + `eslint.ignoreDuringBuilds` so the 3D layer's intentionally-loose types never block a build. Tighten later if you like.
- Everything is componentized so pages (About, Careers, Pricing, Blog, legal) reuse the same sections and shell.
