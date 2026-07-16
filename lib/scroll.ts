// Module-level scroll state read by the R3F <Journey/> useFrame loop and the
// story caption layer. Updated once per Lenis/scroll tick (no React re-render).
export const scrollState = {
  y: 0, // window scrollY
  progress: 0, // 0..1 whole-page progress
  story: 0, // 0..1 progress through the pinned story section
  mouseX: 0, // -1..1
  mouseY: 0, // -1..1
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}
