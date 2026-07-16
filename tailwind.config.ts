import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#090B1A",
        bg2: "#11172B",
        bg3: "#0C1024",
        mag: "#EC1866",
        cyan: "#00D4FF",
        teal: "#00C2A8",
        ink: "#FFFFFF",
        muted: "#B7BDD2",
        faint: "#6A7290",
        line: "rgba(255,255,255,0.09)",
        line2: "rgba(255,255,255,0.16)",
        glass: "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "var(--font-space)", "system-ui", "sans-serif"],
        grotesk: ["var(--font-space)", "var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.03em" },
      backdropBlur: { xs: "2px" },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(3%,-2%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-3%,2%,0) scale(1.04)" },
        },
        marquee: { to: { transform: "translateX(-50%)" } },
        slide: { to: { backgroundPosition: "200% 0" } },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 8px rgba(0,212,255,.6)" },
          "50%": { boxShadow: "0 0 20px rgba(0,212,255,.9)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        spinSlow: "spinSlow 14s linear infinite",
        aurora: "aurora 24s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        slide: "slide 5s linear infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
      maxWidth: { shell: "1200px" },
    },
  },
  plugins: [],
};
export default config;
