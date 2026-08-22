// Shared "Operations Network" model used by the intro cinematic and the hero.
// Service nodes arranged on a ring (centre kept clean for typography), joined by
// elegant workflow connections that data packets travel along. Colours are
// restricted to teal / magenta / white per the premium enterprise direction.
export const NET_COLORS = { teal: "#60A5FA", mag: "#0EA5E9", white: "#FFFFFF" };

const LABELS = ["Chat", "Email", "Phone", "CRM", "Amazon", "Technical", "AI Routing", "Analytics"];
const CYCLE = [NET_COLORS.teal, NET_COLORS.mag, NET_COLORS.white];

export type NetNode = { p: [number, number, number]; c: string; label: string };

export const NET_NODES: NetNode[] = LABELS.map((label, i) => {
  const a = (i / LABELS.length) * Math.PI * 2;
  const R = 4.7;
  return {
    p: [Math.cos(a) * R, Math.sin(i * 1.3) * 0.9, Math.sin(a) * R],
    c: CYCLE[i % 3],
    label,
  };
});

// Connections: the ring + a few longer workflow links (kept off dead-centre).
export const NET_CONNS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 3], [2, 5], [4, 7], [1, 6],
];
