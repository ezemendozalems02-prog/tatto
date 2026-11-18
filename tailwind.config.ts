import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          900: "#050505",
          800: "#0C0C0C",
          700: "#181818",
          600: "#232323",
          500: "#3a3a3a",
        },
        bone: {
          DEFAULT: "#F5F5F5",
          muted: "#A3A3A3",
          dim: "#6B6B6B",
        },
        blood: {
          DEFAULT: "#D10B19",
          hot: "#FF1728",
          deep: "#7A0710",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "mega": ["clamp(5.5rem, 22vw, 26rem)", { lineHeight: "0.78", letterSpacing: "-0.01em" }],
        "giant": ["clamp(3.4rem, 11vw, 12rem)", { lineHeight: "0.85", letterSpacing: "-0.005em" }],
        "huge": ["clamp(2.6rem, 7vw, 7.5rem)", { lineHeight: "0.88" }],
        "big": ["clamp(2rem, 4.6vw, 4.5rem)", { lineHeight: "0.92" }],
      },
      letterSpacing: {
        label: "0.32em",
      },
      transitionTimingFunction: {
        cine: "cubic-bezier(0.76, 0, 0.24, 1)",
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseDot: {
          "0%": { transform: "scale(1)", opacity: "0.9" },
          "100%": { transform: "scale(3.2)", opacity: "0" },
        },
        scrollLine: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        pulseDot: "pulseDot 2.2s cubic-bezier(0.22,1,0.36,1) infinite",
        scrollLine: "scrollLine 2.4s cubic-bezier(0.76,0,0.24,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
