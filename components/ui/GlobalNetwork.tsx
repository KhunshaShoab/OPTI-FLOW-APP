"use client";

// Global connectivity visualisation for the Contact page.
// Stylised (non-literal) network map: Lahore as the primary hub with
// elegant curved routes reaching secondary nodes across major regions.
export default function GlobalNetwork() {
  // Points positioned to hint at continents without being a real map.
  const hub = { x: 400, y: 220, label: "LAHORE" };
  const nodes = [
    { x: 105, y: 190, label: "USA", region: "North America", delay: 0 },
    { x: 285, y: 130, label: "UK", region: "United Kingdom", delay: 0.7 },
    { x: 325, y: 165, label: "EU", region: "Europe", delay: 1.4 },
    { x: 355, y: 250, label: "UAE", region: "Middle East", delay: 2.1 },
    { x: 500, y: 335, label: "AUS", region: "Australia", delay: 2.8 },
  ];

  // Quadratic arc from hub to node, lifted a little for elegance.
  const arcPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const lift = Math.min(60, len * 0.28);
    // perpendicular offset (upwards for horizontal, leftwards otherwise)
    const nx = -dy / (len || 1);
    const ny = dx / (len || 1);
    const cx = mx + nx * lift * (b.y > a.y ? 1 : -1);
    const cy = my + ny * lift * (b.y > a.y ? 1 : -1);
    return { d: `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`, cx, cy };
  };

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg
        viewBox="0 0 600 430"
        className="h-auto w-full"
        role="img"
        aria-label="OptiFlow global network — Lahore to the world"
      >
        <defs>
          <radialGradient id="lahoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.15" />
          </linearGradient>
          <filter id="netBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          {/* graticule (abstract, non-geographic) */}
          <pattern id="graticule" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(96,165,250,.05)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* graticule + subtle curved latitudes */}
        <rect width="600" height="430" fill="url(#graticule)" />
        {[80, 160, 240, 320].map((y) => (
          <path
            key={y}
            d={`M 0 ${y} Q 300 ${y - 24} 600 ${y}`}
            fill="none"
            stroke="rgba(96,165,250,.07)"
            strokeWidth="0.6"
          />
        ))}
        {[100, 200, 300, 400, 500].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="430" stroke="rgba(96,165,250,.05)" strokeWidth="0.5" />
        ))}

        {/* scattered ambient nodes (impression of geography) */}
        {[
          [50, 120], [80, 260], [140, 90], [180, 320], [220, 220], [260, 60],
          [340, 305], [380, 100], [430, 60], [470, 220], [540, 130], [560, 300], [550, 380],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.1} fill="#60A5FA" opacity="0.35">
            <animate attributeName="opacity" values="0.15;0.55;0.15" dur={`${3 + (i % 4) * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* arcs + packets Lahore → each destination */}
        {nodes.map((n) => {
          const { d } = arcPath(hub, n);
          return (
            <g key={`route-${n.label}`}>
              <path d={d} fill="none" stroke="url(#arcGrad)" strokeWidth="1.3" strokeLinecap="round" />
              <path d={d} fill="none" stroke="#60A5FA" strokeWidth="0.55" strokeDasharray="3 6" opacity="0.4">
                <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="2.2s" repeatCount="indefinite" />
              </path>
              {/* travelling packet from Lahore outward */}
              <circle r="2.6" fill="#DBEAFE">
                <animateMotion dur="3s" begin={`${n.delay}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="3s" begin={`${n.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* destination nodes */}
        {nodes.map((n) => (
          <g key={`node-${n.label}`}>
            <circle cx={n.x} cy={n.y} r="18" fill="url(#nodeGlow)" filter="url(#netBlur)" />
            <circle cx={n.x} cy={n.y} r="5" fill="#0A1633" stroke="#60A5FA" strokeWidth="1.3" />
            <circle cx={n.x} cy={n.y} r="1.8" fill="#93C5FD" />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              fill="#DBEAFE"
              fontSize="10"
              fontWeight="600"
              fontFamily="var(--font-space)"
              letterSpacing="1.6"
            >
              {n.label}
            </text>
            <text
              x={n.x}
              y={n.y + 22}
              textAnchor="middle"
              fill="#64748B"
              fontSize="8"
              fontFamily="var(--font-space)"
              letterSpacing="1.2"
            >
              {n.region.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Lahore — primary hub */}
        <g>
          <circle cx={hub.x} cy={hub.y} r="70" fill="url(#lahoreGlow)" filter="url(#netBlur)" />
          <circle cx={hub.x} cy={hub.y} r="10" fill="#0A1633" stroke="#93C5FD" strokeWidth="1.6" />
          <circle cx={hub.x} cy={hub.y} r="4" fill="#FFFFFF" />
          {/* pulsing halo */}
          <circle cx={hub.x} cy={hub.y} r="10" fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7">
            <animate attributeName="r" values="10;30;10" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
          <text
            x={hub.x}
            y={hub.y - 26}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-space)"
            letterSpacing="2"
          >
            {hub.label}
          </text>
          <text
            x={hub.x}
            y={hub.y + 32}
            textAnchor="middle"
            fill="#93C5FD"
            fontSize="8"
            fontFamily="var(--font-space)"
            letterSpacing="1.4"
          >
            PRIMARY HUB · PK
          </text>
        </g>

        {/* corner label — LIVE ROUTES */}
        <g transform="translate(20 26)">
          <circle cx="0" cy="-4" r="3" fill="#22C55E">
            <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="10" y="0" fill="#64748B" fontSize="9" fontFamily="var(--font-space)" letterSpacing="1.6">
            LIVE ROUTES · LAHORE → THE WORLD
          </text>
        </g>
      </svg>
    </div>
  );
}
