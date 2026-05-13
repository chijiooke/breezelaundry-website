// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4B93D1",
          hover: "#4388C5",
          subtle: "#EAF4FC",
        },

        background: {
          DEFAULT: "#F6F8FB",
          muted: "#F8FAFC",
        },

        surface: {
          DEFAULT: "#FFFFFF",
        },

        border: {
          DEFAULT: "#E2E8F0",
          soft: "#EEF2F6",
        },

        text: {
          primary: "#0F172A",
          secondary: "#64748B",
          muted: "#94A3B8",
        },

        success: "#22C55E",
        danger: "#EF4444",
      },

      fontFamily: {
        sora: ["var(--font-sora)"],
        inter: ["var(--font-inter)"],
      },

      borderRadius: {
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },

      boxShadow: {
        card:
          "0 1px 2px rgba(15,23,42,0.03), 0 12px 40px rgba(15,23,42,0.04)",

        modal:
          "0 20px 60px rgba(15,23,42,0.08)",

        button:
          "0 6px 20px rgba(75,147,209,0.18)",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      maxWidth: {
        content: "620px",
        panel: "480px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        fast: "150ms",
        normal: "220ms",
        slow: "320ms",
      },

      letterSpacing: {
        tightest: "-0.06em",
      },
    },
  },

  plugins: [],
};

export default config;