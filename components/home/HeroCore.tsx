"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { lerp } from "@/lib/utils";
import { NET_NODES, NET_CONNS } from "@/lib/network";

// Ambient, forever-alive Operations Network hero background.
// No large glowing spheres — an intelligent lattice of glowing workflow curves
// with small data packets travelling along them. Centre kept clean for type.
function dot() {
  const c = document.createElement("canvas"); c.width = c.height = 96;
  const g = c.getContext("2d")!; const r = g.createRadialGradient(48, 48, 0, 48, 48, 48);
  r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(0.35, "rgba(255,255,255,.7)"); r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r; g.fillRect(0, 0, 96, 96); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function buildCurves(scale: number) {
  return NET_CONNS.map(([ai, bi]) => {
    const a = new THREE.Vector3(...NET_NODES[ai].p).multiplyScalar(scale);
    const b = new THREE.Vector3(...NET_NODES[bi].p).multiplyScalar(scale);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const out = mid.clone().normalize().multiplyScalar(1.3 * scale); // bow away from centre
    const ctrl = mid.clone().add(out).add(new THREE.Vector3(0, (ai % 2 ? 0.6 : -0.6) * scale, 0));
    const curve = new THREE.QuadraticBezierCurve3(a, ctrl, b);
    return { curve, color: NET_NODES[ai].c };
  });
}

export default function HeroCore() {
  const tex = useMemo(dot, []);
  const { camera } = useThree();
  const gMid = useRef<THREE.Group>(null);
  const gBack = useRef<THREE.Group>(null);
  const gFore = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const mid = useMemo(() => buildCurves(1), []);
  const back = useMemo(() => buildCurves(1.7), []);

  const lineObjs = useMemo(() => mid.map(({ curve, color }) => {
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(28));
    const matl = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false });
    return new THREE.Line(geo, matl);
  }), [mid]);
  const backObjs = useMemo(() => back.map(({ curve, color }) => {
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
    const matl = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false });
    return new THREE.Line(geo, matl);
  }), [back]);

  const packets = useMemo(() => {
    const a: { ci: number; t: number; sp: number; c: string }[] = [];
    mid.forEach((m, ci) => { for (let k = 0; k < 2; k++) a.push({ ci, t: Math.random(), sp: 0.08 + Math.random() * 0.06, c: m.color }); });
    return a;
  }, [mid]);
  const pkRef = useRef<(THREE.Sprite | null)[]>([]);

  const foreGeo = useMemo(() => {
    const N = 120, p = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { p[i * 3] = (Math.random() * 2 - 1) * 9; p[i * 3 + 1] = (Math.random() * 2 - 1) * 5; p[i * 3 + 2] = (Math.random() * 2 - 1) * 3 + 2; }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(p, 3)); return g;
  }, []);

  const _v = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    mouse.current.x = lerp(mouse.current.x, state.pointer.x, 0.04);
    mouse.current.y = lerp(mouse.current.y, state.pointer.y, 0.04);

    if (gBack.current) gBack.current.rotation.y = t * 0.012 + mouse.current.x * 0.06;
    if (gMid.current) { gMid.current.rotation.y += dt * 0.05; gMid.current.rotation.x = lerp(gMid.current.rotation.x, mouse.current.y * 0.1, 0.04); }
    if (gFore.current) gFore.current.rotation.y = t * 0.03 + mouse.current.x * 0.2;

    packets.forEach((p, i) => {
      const s = pkRef.current[i]; if (!s) return; p.t += dt * p.sp; if (p.t > 1) p.t -= 1;
      mid[p.ci].curve.getPoint(p.t, _v); s.position.copy(_v);
      (s.material as THREE.SpriteMaterial).opacity = 0.4 + Math.sin(p.t * Math.PI) * 0.6;
    });

    // camera: inertia + handheld + focus breathing
    camera.position.x = lerp(camera.position.x, mouse.current.x * 0.9 + Math.sin(t * 0.5) * 0.05, 0.03);
    camera.position.y = lerp(camera.position.y, -mouse.current.y * 0.6 + Math.cos(t * 0.42) * 0.04, 0.03);
    camera.position.z = lerp(camera.position.z, 9 + Math.sin(t * 0.3) * 0.16, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={gBack}>{backObjs.map((l, i) => <primitive key={i} object={l} />)}</group>

      <group ref={gMid}>
        {lineObjs.map((l, i) => <primitive key={i} object={l} />)}
        {/* crisp nodes */}
        {NET_NODES.map((n, i) => (
          <group key={i} position={n.p as any}>
            <sprite scale={0.5}><spriteMaterial map={tex} color={n.c} transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
            <mesh><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color={n.c} /></mesh>
          </group>
        ))}
        {/* travelling data packets */}
        {packets.map((p, i) => (
          <sprite key={i} ref={(el) => (pkRef.current[i] = el)} scale={0.13}><spriteMaterial map={tex} color={p.c} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} /></sprite>
        ))}
      </group>

      <points ref={gFore} geometry={foreGeo}>
        <pointsMaterial map={tex} color={NET_NODES[0].c} size={0.1} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </>
  );
}
