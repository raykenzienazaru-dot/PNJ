import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0C0B",
        surface: "#141715",
        surface2: "#1C201D",
        border: "#2A2E2A",
        ink: "#EDEAE2",
        muted: "#8B9089",
        gold: "#C6A15B",
        goldSoft: "#E9CE9C",
        teal: "#4B7566",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        weave:
          "repeating-linear-gradient(45deg, rgba(198,161,91,0.06) 0px, rgba(198,161,91,0.06) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, rgba(237,234,226,0.04) 0px, rgba(237,234,226,0.04) 1px, transparent 1px, transparent 14px)",
      },
    },
  },
  plugins: [],
};

export default config;
