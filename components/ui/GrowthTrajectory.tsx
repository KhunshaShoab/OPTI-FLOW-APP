"use client";

// Growth-partner visualisation for the Why OptiFlow page.
// Rising trajectory with milestone nodes and floating "what OptiFlow
// protects" chips above each milestone. Distinct visual language from
// the workflow hub and the network map.
export default function GrowthTrajectory() {
  // Curve points (viewBox 600x430)
  const points = [
    { x: 60, y: 340, label: "Start" },
    { x: 175, y: 300, label: "Response quality" },
    { x: 300, y: 240, label: "Coverage" },
    { x: 420, y: 170, label: "Retention" },
    { x: 550, y: 90, label: "Reputation" },
  ];

  // Smooth cubic path through the points using Catmull–Rom → Bezier.
  const smoothPath = () => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] ?? points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] ?? p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const areaPath = () => smoothPath() + ` L ${points[points.length - 1].x} 400 L ${points[0].x} 400 Z`;

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 600 430" className="h-auto w-full" role="img" aria-label="OptiFlow protects revenue, retention and reputation as your operation scales">
        <defs>
          <linearGradient id="gtLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <linearGradient id="gtArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="gtNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <pattern id="gtGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(96,165,250,.055)" strokeWidth="0.6" />
          </pattern>
          <filter id="gtBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* backdrop grid + horizontal guide lines */}
        <rect width="600" height="430" fill="url(#gtGrid)" />
        {[100, 180, 260, 340].map((y) => (
          <line key={y} x1="40" y1={y} x2="580" y2={y} stroke="rgba(96,165,250,.06)" strokeDasharray="2 6" />
        ))}

        {/* axis labels */}
        <text x="40" y="410" fill="#64748B" fontSize="9" fontFamily="var(--font-space)" letterSpacing="1.6">
          MONTH 1
        </text>
        <text x="580" y="410" textAnchor="end" fill="#64748B" fontSize="9" fontFamily="var(--font-space)" letterSpacing="1.6">
          SCALE
        </text>
        <text x="12" y="90" fill="#64748B" fontSize="9" fontFamily="var(--font-space)" letterSpacing="1.6" transform="rotate(-90 12 90)">
          GROWTH IMPACT
        </text>

        {/* area under curve */}
        <path d={areaPath()} fill="url(#gtArea)" />

        {/* main growth line — animated draw-in */}
        <path
          d={smoothPath()}
          fill="none"
          stroke="url(#gtLine)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        >
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="2.2s" fill="freeze" />
        </path>

        {/* milestone nodes + labels */}
        {points.slice(1).map((p, i) => (
          <g key={p.label}>
            {/* soft halo */}
            <circle cx={p.x} cy={p.y} r="22" fill="url(#gtNodeGlow)" filter="url(#gtBlur)" />
            {/* solid node */}
            <circle cx={p.x} cy={p.y} r="6" fill="#0A1633" stroke="#60A5FA" strokeWidth="1.6" />
            <circle cx={p.x} cy={p.y} r="2.2" fill="#DBEAFE">
              <animate attributeName="opacity" values="1;0.35;1" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* floating chip label */}
            <g transform={`translate(${p.x} ${p.y - 26})`}>
              <rect x={-Math.max(46, p.label.length * 3.6)} y="-16" rx="8" ry="8" width={Math.max(92, p.label.length * 7.2)} height="20" fill="#0A1633" stroke="rgba(96,165,250,.35)" strokeWidth="1" />
              <text x="0" y="-2" textAnchor="middle" fill="#DBEAFE" fontSize="10" fontWeight="600" fontFamily="var(--font-space)" letterSpacing="0.6">
                {p.label}
              </text>
            </g>
          </g>
        ))}

        {/* start marker */}
        <circle cx={points[0].x} cy={points[0].y} r="4" fill="#64748B" />

        {/* top-right badge — GROWING */}
        <g transform="translate(560 30)">
          <rect x="-92" y="-14" rx="10" ry="10" width="92" height="26" fill="rgba(59,130,246,.15)" stroke="rgba(96,165,250,.4)" strokeWidth="1" />
          <circle cx="-78" cy="-1" r="3" fill="#22C55E">
            <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="-68" y="3" fill="#DBEAFE" fontSize="10" fontWeight="600" fontFamily="var(--font-space)" letterSpacing="1.6">
            COMPOUNDING
          </text>
        </g>

        {/* subtle rising particles */}
        {[
          { x: 90, delay: 0 },
          { x: 250, delay: 1.2 },
          { x: 380, delay: 2.4 },
          { x: 500, delay: 0.6 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy="380" r="1.4" fill="#60A5FA">
            <animate attributeName="cy" values="380;60" dur="6s" begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.8;0" dur="6s" begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
