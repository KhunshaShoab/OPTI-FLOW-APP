"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll";
import { lerp, clamp } from "@/lib/utils";

// Radial-gradient sprite texture used for every glowing node & packet.
function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.25, "rgba(255,255,255,.85)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

const MAG = "#EC1866", CY = "#00D4FF", TE = "#00C2A8", VI = "#6E56F0";

// Journey nodes — position, colour, size, and the story-progress at which they light up.
const NODES = [
  { id: "Customer", p: [-6.2, 0.7, 0], c: MAG, s: 1.5, at: 0.02 },
  { id: "Chat", p: [-3.4, 1.7, -0.6], c: CY, s: 1.25, at: 0.16 },
  { id: "AI", p: [-1.2, -1.1, 0.6], c: VI, s: 1.5, at: 0.30 },
  { id: "Agent", p: [1.6, 1.5, -0.5], c: TE, s: 1.3, at: 0.44 },
  { id: "CRM", p: [4.4, 0.1, 0.4], c: CY, s: 1.25, at: 0.58 },
  { id: "Resolution", p: [0.3, -0.1, 0], c: TE, s: 1.7, at: 0.72 },
  // ambient / secondary
  { id: "Phone", p: [-4.6, -1.9, 1.2], c: TE, s: 0.9, at: 0.1 },
  { id: "Email", p: [-2.2, 2.4, 1.4], c: CY, s: 0.9, at: 0.12 },
  { id: "Analytics", p: [3.0, -1.9, -1.2], c: VI, s: 0.9, at: 0.5 },
] as const;

// Directed connections (packets flow a -> b), coloured by the source.
const CONNS: [number, number, string][] = [
  [0, 1, MAG], [1, 2, CY], [2, 3, VI], [3, 4, TE], [4, 5, CY],
  [6, 2, TE], [7, 2, CY], [2, 8, VI], [8, 5, VI],
];

export default function JourneyScene() {
  const group = useRef<THREE.Group>(null);
  const tex = useGlowTexture();
  const { camera } = useThree();

  const nodePos = useMemo(() => NODES.map((n) => new THREE.Vector3(...n.p)), []);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);

  // Packets: several per connection.
  const packets = useMemo(() => {
    const arr: { a: number; b: number; t: number; sp: number; c: string }[] = [];
    CONNS.forEach(([a, b, c]) => {
      for (let i = 0; i < 5; i++) arr.push({ a, b, t: Math.random(), sp: 0.11 + Math.random() * 0.1, c });
    });
    return arr;
  }, []);
  const packetRefs = useRef<(THREE.Sprite | null)[]>([]);

  // Ambient "thousands of interactions" field for the final pull-back scene.
  const field = useMemo(() => {
    const N = 420, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 7 + Math.random() * 10, th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 2 - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.6;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const fieldMat = useRef<THREE.PointsMaterial>(null);

  const _v = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const s = scrollState.story;
    const g = group.current;
    if (g) {
      // idle rotation + subtle mouse parallax
      g.rotation.y += delta * 0.05 + (scrollState.mouseX * 0.4 - g.rotation.y * 0) * 0;
      g.rotation.y += scrollState.mouseX * 0.0006;
      g.rotation.x = lerp(g.rotation.x, -0.06 + scrollState.mouseY * 0.12, 0.05);
    }
    // Camera dolly: close during the story, pulls back in Scene 7.
    const targetZ = s < 0.82 ? lerp(9.2, 8.2, s / 0.82) : lerp(8.2, 17, clamp((s - 0.82) / 0.18));
    camera.position.z = lerp(camera.position.z, targetZ, 0.05);
    camera.position.x = lerp(camera.position.x, scrollState.mouseX * 0.6, 0.05);
    camera.position.y = lerp(camera.position.y, -scrollState.mouseY * 0.4, 0.05);
    camera.lookAt(0, 0, 0);

    // Node reveal (scale up as its scene arrives).
    NODES.forEach((n, i) => {
      const r = nodeRefs.current[i];
      if (!r) return;
      const target = clamp((s - n.at) / 0.12) * n.s;
      const sc = lerp(r.scale.x, Math.max(0.0001, target), 0.12);
      r.scale.setScalar(sc);
    });

    // Packets flow along revealed connections.
    packets.forEach((pk, i) => {
      const sp = packetRefs.current[i];
      if (!sp) return;
      const revealed = s > NODES[pk.b].at - 0.02;
      pk.t += delta * pk.sp * (revealed ? 1 : 0);
      if (pk.t > 1) pk.t -= 1;
      _v.copy(nodePos[pk.a]).lerp(nodePos[pk.b], pk.t);
      sp.position.copy(_v);
      const vis = revealed ? 1 : 0;
      (sp.material as THREE.SpriteMaterial).opacity = vis * (0.5 + Math.sin(pk.t * Math.PI) * 0.5);
      sp.scale.setScalar(0.28 * vis);
    });

    // Ambient field fades in for the finale.
    if (fieldMat.current) fieldMat.current.opacity = clamp((s - 0.8) / 0.2) * 0.9;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.6} />

      {/* nodes */}
      {NODES.map((n, i) => (
        <group key={n.id} position={n.p as any} ref={(el) => (nodeRefs.current[i] = el)} scale={0.0001}>
          <sprite scale={1.9}>
            <spriteMaterial map={tex} color={n.c} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color={n.c} />
          </mesh>
        </group>
      ))}

      {/* packets */}
      {packets.map((pk, i) => (
        <sprite key={i} ref={(el) => (packetRefs.current[i] = el)} scale={0.28}>
          <spriteMaterial map={tex} color={pk.c} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}

      {/* finale field */}
      <points geometry={field}>
        <pointsMaterial ref={fieldMat} map={tex} color={CY} size={0.22} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}
