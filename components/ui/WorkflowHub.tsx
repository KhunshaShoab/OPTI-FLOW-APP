"use client";

// Hub-and-spokes workflow visualisation for the How It Works page.
// Central OptiFlow node, four stage cards, glowing routes with a
// travelling packet on each spoke.
export default function WorkflowHub() {
  const stages: {
    label: string;
    x: number;
    y: number;
    delay: number;
    icon: React.ReactNode;
  }[] = [
    {
      label: "Discovery",
      x: 90,
      y: 90,
      delay: 0,
      icon: (
        <>
          <circle cx="0" cy="0" r="7" />
          <line x1="5" y1="5" x2="10" y2="10" />
        </>
      ),
    },
    {
      label: "Training",
      x: 510,
      y: 90,
      delay: 0.9,
      icon: (
        <>
          <path d="M-11 0 L0 -6 L11 0 L0 6 Z" />
          <line x1="6" y1="2" x2="6" y2="9" />
        </>
      ),
    },
    {
      label: "Pilot",
      x: 510,
      y: 340,
      delay: 1.8,
      icon: (
        <>
          <path d="M0 -11 L6 0 L2 0 L2 8 L-2 8 L-2 0 L-6 0 Z" />
        </>
      ),
    },
    {
      label: "Scale",
      x: 90,
      y: 340,
      delay: 2.7,
      icon: (
        <>
          <polyline points="-10,6 -3,-2 2,3 10,-6" />
          <polyline points="5,-6 10,-6 10,-1" />
        </>
      ),
    },
  ];

  const hubX = 300;
  const hubY = 215;
  const cardHalfW = 68;
  const cardHalfH = 34;

  // Line endpoint on the card edge, so lines stop AT the card, not inside it.
  const endpoint = (x: number, y: number) => {
    const dx = x - hubX;
    const dy = y - hubY;
    const angle = Math.atan2(dy, dx);
    const ex = Math.cos(angle) * cardHalfW;
    const ey = Math.sin(angle) * cardHalfH;
    return { x: x - ex, y: y - ey };
  };

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg
        viewBox="0 0 600 430"
        className="h-auto w-full"
        role="img"
        aria-label="OptiFlow workflow — Discovery, Training, Pilot, Scale"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cardFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#122756" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0A1633" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
          </linearGradient>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(96,165,250,.06)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* subtle grid backdrop */}
        <rect width="600" height="430" fill="url(#grid)" opacity="0.7" />

        {/* faint concentric orbits behind the hub */}
        {[70, 110, 150].map((r) => (
          <circle
            key={r}
            cx={hubX}
            cy={hubY}
            r={r}
            fill="none"
            stroke="rgba(96,165,250,0.08)"
            strokeWidth="0.6"
          />
        ))}

        {/* connection routes hub → stage */}
        {stages.map((s) => {
          const end = endpoint(s.x, s.y);
          const length = Math.hypot(end.x - hubX, end.y - hubY);
          return (
            <g key={`line-${s.label}`}>
              <line
                x1={hubX}
                y1={hubY}
                x2={end.x}
                y2={end.y}
                stroke="url(#lineGrad)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <line
                x1={hubX}
                y1={hubY}
                x2={end.x}
                y2={end.y}
                stroke="#60A5FA"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeDasharray="4 8"
                opacity="0.35"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-24"
                  dur="1.6s"
                  begin={`${s.delay}s`}
                  repeatCount="indefinite"
                />
              </line>
              {/* travelling packet */}
              <circle r="3" fill="#93C5FD">
                <animateMotion
                  dur="2.6s"
                  begin={`${s.delay}s`}
                  repeatCount="indefinite"
                  path={`M ${hubX} ${hubY} L ${end.x} ${end.y}`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur="2.6s"
                  begin={`${s.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <text x={(hubX + end.x) / 2} y={(hubY + end.y) / 2 - 8} textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="var(--font-space)" letterSpacing="1.4">
                {Math.round(length)}ms
              </text>
            </g>
          );
        })}

        {/* central hub */}
        <g>
          <circle cx={hubX} cy={hubY} r="72" fill="url(#hubGlow)" filter="url(#softBlur)" />
          <circle cx={hubX} cy={hubY} r="38" fill="#0A1633" stroke="rgba(96,165,250,0.55)" strokeWidth="1" />
          <circle cx={hubX} cy={hubY} r="38" fill="none" stroke="#3B82F6" strokeWidth="0.6" opacity="0.4">
            <animate attributeName="r" values="38;46;38" dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="3.4s" repeatCount="indefinite" />
          </circle>
          {/* OptiFlow mark */}
          <g transform={`translate(${hubX} ${hubY})`}>
            <circle r="14" fill="none" stroke="#60A5FA" strokeWidth="2" />
            <circle r="4" fill="#93C5FD" />
            <circle r="14" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 6">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="16s" repeatCount="indefinite" />
            </circle>
          </g>
          <text x={hubX} y={hubY + 60} textAnchor="middle" fill="#B7BDD2" fontSize="10" fontFamily="var(--font-space)" letterSpacing="2">
            OPTIFLOW · LIVE
          </text>
        </g>

        {/* stage cards */}
        {stages.map((s, i) => (
          <g key={`card-${s.label}`}>
            <rect
              x={s.x - cardHalfW}
              y={s.y - cardHalfH}
              rx="14"
              ry="14"
              width={cardHalfW * 2}
              height={cardHalfH * 2}
              fill="url(#cardFill)"
              stroke="rgba(96,165,250,0.35)"
              strokeWidth="1"
            />
            {/* step label */}
            <text
              x={s.x - cardHalfW + 14}
              y={s.y - 12}
              fill="#64748B"
              fontSize="9"
              fontFamily="var(--font-space)"
              letterSpacing="1.4"
            >
              {`0${i + 1}`}
            </text>
            <text
              x={s.x - cardHalfW + 14}
              y={s.y + 6}
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="600"
              fontFamily="var(--font-sora)"
            >
              {s.label}
            </text>
            {/* icon on right */}
            <g
              transform={`translate(${s.x + cardHalfW - 20} ${s.y})`}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {s.icon}
            </g>
            {/* subtle status dot */}
            <circle cx={s.x - cardHalfW + 8} cy={s.y + 20} r="2.4" fill="#22C55E">
              <animate attributeName="opacity" values="1;0.4;1" dur="2.2s" begin={`${s.delay * 0.4}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ambient particles */}
        {[
          { x: 40, y: 40 },
          { x: 560, y: 60 },
          { x: 40, y: 400 },
          { x: 560, y: 380 },
          { x: 300, y: 20 },
          { x: 300, y: 410 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="#93C5FD" opacity="0.5">
            <animate attributeName="opacity" values="0.15;0.65;0.15" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
