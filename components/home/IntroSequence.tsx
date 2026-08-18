"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { clamp, lerp, smoothstep } from "@/lib/utils";
import { NET_NODES, NET_CONNS } from "@/lib/network";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Cinematic first-visit intro — an Operations Network (no large spheres):
 * glowing workflow curves with data packets flowing between service nodes,
 * a DNA camera path, converging into the OptiFlow logo, then dissolving into
 * the homepage. Story / camera path / flow unchanged from prior versions.
 */
const KEY = "optiflow_intro_seen_v1";
const DURATION = 10.2;
const intro = { t: 0, mx: 0, my: 0 };

function glow() {
  const c = document.createElement("canvas"); c.width = c.height = 96;
  const g = c.getContext("2d")!; const r = g.createRadialGradient(48, 48, 0, 48, 48, 48);
  r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(0.35, "rgba(255,255,255,.7)"); r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r; g.fillRect(0, 0, 96, 96); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function analyticsTex() {
  const c = document.createElement("canvas"); c.width = 256; c.height = 150; const g = c.getContext("2d")!;
  g.fillStyle = "rgba(6,10,22,0.7)"; rr(g, 0, 0, 256, 150, 14); g.fill();
  g.strokeStyle = "rgba(56,189,248,0.5)"; g.lineWidth = 2; rr(g, 1, 1, 254, 148, 14); g.stroke();
  g.fillStyle = "rgba(56,189,248,0.9)"; g.beginPath(); g.arc(18, 20, 4, 0, 6.28); g.fill();
  g.fillStyle = "rgba(255,255,255,0.8)"; g.font = "600 14px sans-serif"; g.fillText("Analytics", 32, 25);
  g.strokeStyle = "rgba(255,255,255,.1)"; g.beginPath(); g.moveTo(0, 38); g.lineTo(256, 38); g.stroke();
  const v = [40, 66, 52, 84, 70, 96, 78]; v.forEach((h, i) => { g.fillStyle = i % 2 ? "#38BDF8" : "#F97316"; g.fillRect(22 + i * 32, 140 - h, 18, h); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }

function buildCurves() {
  return NET_CONNS.map(([ai, bi]) => {
    const a = new THREE.Vector3(...NET_NODES[ai].p); const b = new THREE.Vector3(...NET_NODES[bi].p);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const ctrl = mid.clone().add(mid.clone().normalize().multiplyScalar(1.3)).add(new THREE.Vector3(0, (ai % 2 ? 0.6 : -0.6), 0));
    return { curve: new THREE.QuadraticBezierCurve3(a, ctrl, b), color: NET_NODES[ai].c };
  });
}

function NetworkScene() {
  const grp = useRef<THREE.Group>(null);
  const tex = useMemo(glow, []);
  const aTex = useMemo(analyticsTex, []);
  const { camera } = useThree();
  const curves = useMemo(buildCurves, []);
  const lines = useMemo(() => curves.map(({ curve, color }) => {
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    return new THREE.Line(geo, mat);
  }), [curves]);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const packets = useMemo(() => { const a: { ci: number; t: number; sp: number; c: string }[] = []; curves.forEach((m, ci) => { for (let k = 0; k < 2; k++) a.push({ ci, t: Math.random(), sp: 0.08 + Math.random() * 0.05, c: m.color }); }); return a; }, [curves]);
  const pkRef = useRef<(THREE.Sprite | null)[]>([]);
  const sidePanels = useMemo(() => [analyticsTex(), analyticsTex(), analyticsTex()], []);
  const panelRefs = useRef<(THREE.Mesh | null)[]>([]);
  const aPanel = useRef<THREE.Mesh>(null);
  const _v = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const t = intro.t;
    if (grp.current) grp.current.rotation.y += dt * 0.04;

    // DNA / double-helix camera (unchanged) + inertia + handheld
    let R: number;
    if (t < 8) R = lerp(13, 7, smoothstep(t / 8));
    else if (t < 9) R = lerp(7, 19, smoothstep((t - 8) / 1));
    else R = lerp(19, 12, smoothstep((t - 9) / 1.2));
    const theta = t * 0.55 + intro.mx * 0.3;
    const Y = Math.sin(t * 0.7) * 1.7 - intro.my * 0.6;
    const hx = Math.sin(t * 1.9) * 0.05, hy = Math.cos(t * 1.6) * 0.04;
    camera.position.x = lerp(camera.position.x, Math.sin(theta) * R + hx, 0.06);
    camera.position.z = lerp(camera.position.z, Math.cos(theta) * R, 0.06);
    camera.position.y = lerp(camera.position.y, Y + hy, 0.06);
    camera.lookAt(0, 0, 0);

    // reveal lines, then simplify at the logo
    const reveal = clamp((t - 1.3) / 1.4);
    const simplify = clamp((t - 8.8) / 0.8);
    lines.forEach((l) => { (l.material as THREE.LineBasicMaterial).opacity = lerp(0.24 * reveal, 0.06, simplify); });
    // nodes reveal (staggered)
    NET_NODES.forEach((_, i) => { const r = nodeRefs.current[i]; if (!r) return; const target = clamp((t - (0.2 + i * 0.22)) / 0.5) * (1 - simplify * 0.7); r.scale.setScalar(lerp(r.scale.x, Math.max(0.0001, target), 0.12)); });

    // packets flow; converge to centre for the logo
    const flow = clamp((t - 1.3) / 1);
    packets.forEach((p, i) => {
      const s = pkRef.current[i]; if (!s) return; p.t += dt * p.sp * flow; if (p.t > 1) p.t -= 1;
      curves[p.ci].curve.getPoint(p.t, _v); if (simplify > 0) _v.lerp(new THREE.Vector3(0, 0, 0), simplify * 0.9);
      s.position.copy(_v);
      (s.material as THREE.SpriteMaterial).opacity = flow * (0.4 + Math.sin(p.t * Math.PI) * 0.6) * (1 - simplify * 0.4);
    });

    // side panels appear mid-story then fade; one analytics widget stays
    panelRefs.current.forEach((m) => { if (!m) return; m.lookAt(camera.position); (m.material as THREE.MeshBasicMaterial).opacity = clamp((t - 3) / 1) * (1 - clamp((t - 7.5) / 1)) * 0.85; });
    if (aPanel.current) { aPanel.current.lookAt(camera.position); (aPanel.current.material as THREE.MeshBasicMaterial).opacity = clamp((t - 3) / 1) * (t > 9.4 ? clamp(1 - (t - 9.4) / 0.8) : 1) * 0.85; }
  });

  return (
    <group ref={grp}>
      <ambientLight intensity={0.5} />
      {lines.map((l, i) => <primitive key={i} object={l} />)}
      {NET_NODES.map((n, i) => (
        <group key={i} position={n.p as any} ref={(el) => (nodeRefs.current[i] = el)} scale={0.0001}>
          <sprite scale={0.55}><spriteMaterial map={tex} color={n.c} transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
          <mesh><sphereGeometry args={[0.07, 12, 12]} /><meshBasicMaterial color={n.c} /></mesh>
        </group>
      ))}
      {packets.map((p, i) => (
        <sprite key={i} ref={(el) => (pkRef.current[i] = el)} scale={0.14}><spriteMaterial map={tex} color={p.c} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
      ))}
      {/* the one analytics widget that survives to the final frame */}
      <mesh ref={aPanel} position={[5.2, 2.4, -1]}><planeGeometry args={[3, 1.8]} /><meshBasicMaterial map={aTex} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      {sidePanels.map((pt, i) => { const a = (i / 3) * Math.PI * 2 + 1; return (
        <mesh key={i} ref={(el) => (panelRefs.current[i] = el)} position={[Math.cos(a) * 6, (i % 2 ? -2.2 : 2.2), Math.sin(a) * 6]}><planeGeometry args={[2.7, 1.7]} /><meshBasicMaterial map={pt} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      ); })}
    </group>
  );
}

export default function IntroSequence() {
  const [state, setState] = useState<"idle" | "playing" | "closing" | "off">("idle");
  const caps = useRef<(HTMLDivElement | null)[]>([]);
  const start = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") { setState("off"); return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false; try { seen = localStorage.getItem(KEY) === "1"; } catch {}
    if (seen || reduce) { setState("off"); return; }
    setState("playing"); start.current = performance.now();
    const onMove = (e: PointerEvent) => { intro.mx = (e.clientX / window.innerWidth) * 2 - 1; intro.my = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.style.overflow = "hidden";
    return () => window.removeEventListener("pointermove", onMove);
  }, [pathname]);

  useEffect(() => {
    const onReplay = () => { start.current = performance.now(); intro.t = 0; document.documentElement.style.overflow = "hidden"; setState("playing"); };
    window.addEventListener("optiflow:replay-intro", onReplay);
    return () => window.removeEventListener("optiflow:replay-intro", onReplay);
  }, []);

  useEffect(() => {
    if (state !== "playing") return;
    let raf = 0;
    const W: [number, number][] = [[0.1, 1.7], [1.6, 3.1], [3.0, 5.1], [6.3, 8.1], [8.0, 9.0], [8.9, 10.2]];
    const loop = () => {
      const t = (performance.now() - start.current) / 1000; intro.t = t;
      W.forEach(([a, b], i) => {
        const node = caps.current[i]; if (!node) return;
        let o = 0; if (t >= a && t <= b) { const inw = (t - a) / (b - a); o = clamp(Math.min(inw / 0.14, (1 - inw) / 0.14)); }
        if (i === 5 && t > a) o = clamp((t - a) / 0.25);
        node.style.opacity = String(o); node.style.transform = `translateY(${(1 - o) * 16}px)`;
      });
      if (t >= DURATION) finish(); else raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [state]);

  const finish = () => { try { localStorage.setItem(KEY, "1"); } catch {} document.documentElement.style.overflow = ""; setState("closing"); setTimeout(() => setState("off"), 1200); };

  if (state === "off" || state === "idle") return null;

  return (
    <div className="fixed inset-0 z-[200] transition-opacity duration-[1100ms]" style={{ background: "#050816", opacity: state === "closing" ? 0 : 1, pointerEvents: state === "closing" ? "none" : "auto" }} aria-hidden>
      <Canvas className="!absolute inset-0" camera={{ position: [0, 0, 13], fov: 50 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
        <NetworkScene />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
        <div ref={(el) => (caps.current[0] = el)} className="absolute max-w-2xl opacity-0">
          <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-glass px-5 py-3.5 backdrop-blur-xl glow-cyan"><span className="text-lg">💬</span><span className="font-grotesk text-sm text-muted">New customer message</span></div>
          <h2 className="h-display text-[clamp(30px,5.5vw,64px)]">Every customer interaction <span className="grad-text">matters.</span></h2>
        </div>
        <div ref={(el) => (caps.current[1] = el)} className="absolute w-full max-w-4xl opacity-0">
          <div className="grid gap-3 sm:grid-cols-3">
            {[["Amazon Seller", "Where is my order? I need an update.", "#F97316"], ["Technical Support", "My 3D printer stopped working after the latest firmware update.", "#38BDF8"], ["SaaS Billing", "I've been charged twice. Can you help?", "#FFFFFF"]].map(([t, m, col]) => (
              <div key={t as string} className="glass p-5 text-left"><div className="font-grotesk text-[11px] uppercase tracking-wide" style={{ color: col as string }}>{t as string}</div><p className="mt-2 text-[13.5px] text-white">{m as string}</p></div>
            ))}
          </div>
        </div>
        <div ref={(el) => (caps.current[2] = el)} className="absolute max-w-2xl opacity-0">
          <span className="eyebrow justify-center">AI routing hub</span>
          <div className="mt-5 flex flex-wrap justify-center gap-2">{["Sentiment", "Priority", "Language", "Skill match", "Queue", "Routing"].map((s) => <span key={s} className="glass px-3.5 py-2 font-grotesk text-[12.5px]">{s}</span>)}</div>
        </div>
        <div ref={(el) => (caps.current[3] = el)} className="absolute w-full max-w-4xl opacity-0">
          <div className="grid gap-3 sm:grid-cols-3">
            {[["Amazon Specialist", "Returns · refunds · seller metrics"], ["Technical Specialist", "Diagnostics · firmware · fixes"], ["Customer Success", "Billing · subscriptions · accounts"]].map(([t, s]) => (
              <div key={t} className="glass p-5 text-left"><div className="font-grotesk text-sm font-semibold">{t}</div><p className="mt-1 text-[12px] text-muted">{s}</p><div className="mt-3 flex items-center justify-between border-t border-line pt-2.5"><span className="font-grotesk text-[11px] uppercase tracking-wide text-teal">✔ Resolved</span><span className="text-[#F5A524]">★★★★★</span></div></div>
            ))}
          </div>
        </div>
        <div ref={(el) => (caps.current[4] = el)} className="absolute max-w-xl opacity-0"><p className="font-grotesk text-[clamp(15px,2vw,22px)] text-muted">Thousands of conversations. <span className="text-white">One organized system.</span></p></div>
        <div ref={(el) => (caps.current[5] = el)} className="absolute opacity-0">
          <div className="flex flex-col items-center">
            <span className="relative mb-6 h-20 w-20 animate-spinSlow rounded-[22px]" style={{ background: "conic-gradient(from 200deg,#F97316,#38BDF8,#FFFFFF,#F97316)" }}><span className="absolute inset-3 rounded-[16px] bg-[#050816]" /></span>
            <h1 className="h-display text-[clamp(44px,8vw,104px)] font-extrabold leading-[0.95]">OptiFlow <span className="grad-text">Solutions</span></h1>
            <p className="mt-3 font-grotesk text-[clamp(14px,1.6vw,20px)] text-muted">Operations, Optimized.</p>
          </div>
        </div>
      </div>

      {state === "playing" && (
        <button onClick={finish} className="absolute right-6 top-6 z-[210] rounded-full border border-line bg-glass px-4 py-2 font-grotesk text-[13px] text-muted backdrop-blur-xl transition hover:text-white" style={{ pointerEvents: "auto" }}>Skip intro →</button>
      )}
    </div>
  );
}
