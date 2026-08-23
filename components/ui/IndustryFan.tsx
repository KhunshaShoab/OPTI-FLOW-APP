"use client";

// Industry specialisation visualisation for the Industries page.
// Fanned deck of five industry cards emerging from a central operations
// core. Different composition from the workflow hub (symmetric spokes),
// growth trajectory (line chart) and global network (map arcs) — so all
// four page heroes read as visually distinct.
export default function IndustryFan() {
  // Card angle spread (degrees), tilt applied around a pivot near the bottom.
  const angles = [-32, -16, 0, 16, 32];
  const industries = [
    {
      label: "Shopify DTC",
      sub: "WISMO · Returns",
      icon: (
        <>
          <path d="M-8 -4 L-8 6 L8 6 L8 -4" />
          <path d="M-5 -4 A5 5 0 0 1 5 -4" />
          <line x1="-4" y1="0" x2="4" y2="0" />
        </>
      ),
    },
    {
      label: "eCommerce",
      sub: "Multi-channel",
      icon: (
        <>
          <circle cx="-4" cy="6" r="1.6" />
          <circle cx="5" cy="6" r="1.6" />
          <path d="M-8 -4 L-6 -4 L-4 3 L6 3 L8 -2 L-4 -2" />
        </>
      ),
    },
    {
      label: "SaaS",
      sub: "Onboarding · Retention",
      icon: (
        <>
          <path d="M-8 2 A6 4 0 0 1 -2 -2 A5 5 0 0 1 8 -1 A4 4 0 0 1 6 6 L-6 6 A4 4 0 0 1 -8 2 Z" />
        </>
      ),
    },
    {
      label: "Hardware",
      sub: "Troubleshooting",
      icon: (
        <>
          <rect x="-7" y="-5" width="14" height="10" rx="1.5" />
          <line x1="-4" y1="-8" x2="-4" y2="-5" />
          <line x1="0" y1="-8" x2="0" y2="-5" />
          <line x1="4" y1="-8" x2="4" y2="-5" />
          <line x1="-4" y1="5" x2="-4" y2="8" />
          <line x1="4" y1="5" x2="4" y2="8" />
        </>
      ),
    },
    {
      label: "Subscriptions",
      sub: "Billing · Renewals",
      icon: (
        <>
          <path d="M-7 -1 A7 7 0 0 1 6 -4" />
          <polyline points="6,-8 6,-4 2,-4" />
          <path d="M7 1 A7 7 0 0 1 -6 4" />
          <polyline points="-6,8 -6,4 -2,4" />
        </>
      ),
    },
  ];

  const pivotX = 300;
  const pivotY = 460; // below the viewBox — creates a fan pivot below the cards
  const radius = 210;
  const cardW = 130;
  const cardH = 160;

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 600 430" className="h-auto w-full" role="img" aria-label="Specialised OptiFlow teams across Shopify DTC, eCommerce, SaaS, Hardware and Subscriptions">
        <defs>
          <linearGradient id="ifCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#122756" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0A1633" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ifCardActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0F2145" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="ifCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <filter id="ifBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <pattern id="ifGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(96,165,250,.05)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="600" height="430" fill="url(#ifGrid)" />

        {/* soft ground glow behind fan */}
        <ellipse cx={pivotX} cy="410" rx="230" ry="24" fill="rgba(59,130,246,.15)" filter="url(#ifBlur)" />

        {/* central "operations core" node */}
        <g>
          <circle cx={pivotX} cy="400" r="70" fill="url(#ifCoreGlow)" filter="url(#ifBlur)" />
          <circle cx={pivotX} cy="400" r="14" fill="#0A1633" stroke="rgba(96,165,250,.6)" strokeWidth="1.4" />
          <circle cx={pivotX} cy="400" r="5" fill="#93C5FD" />
          <text x={pivotX} y="428" textAnchor="middle" fill="#93C5FD" fontSize="8" fontFamily="var(--font-space)" letterSpacing="1.6">
            ONE OPERATIONAL CORE
          </text>
        </g>

        {/* fanned industry cards */}
        {angles.map((angle, i) => {
          const ind = industries[i];
          const isCenter = i === 2;
          const rad = (angle * Math.PI) / 180;
          const cx = pivotX + Math.sin(rad) * radius;
          const cy = pivotY - Math.cos(rad) * radius;

          // "spoke" from the core to the card base
          const coreX = pivotX;
          const coreY = 400;
          const spokeEndX = pivotX + Math.sin(rad) * (radius - cardH * 0.5);
          const spokeEndY = pivotY - Math.cos(rad) * (radius - cardH * 0.5);

          return (
            <g key={ind.label}>
              {/* connecting line core → card */}
              <line
                x1={coreX}
                y1={coreY}
                x2={spokeEndX}
                y2={spokeEndY}
                stroke="rgba(96,165,250,.28)"
                strokeWidth="1"
                strokeDasharray="3 5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur={`${2.4 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </line>

              {/* card */}
              <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
                <rect
                  x={-cardW / 2}
                  y={-cardH / 2}
                  rx="14"
                  ry="14"
                  width={cardW}
                  height={cardH}
                  fill={isCenter ? "url(#ifCardActive)" : "url(#ifCard)"}
                  stroke={isCenter ? "rgba(147,197,253,.55)" : "rgba(96,165,250,.3)"}
                  strokeWidth="1"
                />
                {/* corner index */}
                <text x={-cardW / 2 + 12} y={-cardH / 2 + 20} fill="#64748B" fontSize="9" fontFamily="var(--font-space)" letterSpacing="1.4">
                  {`0${i + 1}`}
                </text>
                {/* small "live" dot */}
                <circle cx={cardW / 2 - 12} cy={-cardH / 2 + 14} r="2.4" fill="#22C55E">
                  <animate attributeName="opacity" values="1;0.35;1" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>

                {/* icon block */}
                <g
                  transform={`translate(0 ${-6})`}
                  fill="none"
                  stroke={isCenter ? "#93C5FD" : "#60A5FA"}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ind.icon}
                </g>

                {/* label */}
                <text
                  x="0"
                  y={cardH / 2 - 34}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="var(--font-sora)"
                >
                  {ind.label}
                </text>
                <text
                  x="0"
                  y={cardH / 2 - 18}
                  textAnchor="middle"
                  fill={isCenter ? "#DBEAFE" : "#94A3B8"}
                  fontSize="9.5"
                  fontFamily="var(--font-space)"
                  letterSpacing="0.6"
                >
                  {ind.sub}
                </text>
              </g>
            </g>
          );
        })}

        {/* ambient particles */}
        {[
          { x: 40, y: 60 },
          { x: 560, y: 60 },
          { x: 100, y: 380 },
          { x: 500, y: 380 },
          { x: 300, y: 30 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.3" fill="#93C5FD">
            <animate attributeName="opacity" values="0.15;0.6;0.15" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
