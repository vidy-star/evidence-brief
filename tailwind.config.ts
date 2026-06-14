import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          50: "#f4f7fb",
          100: "#e8eef6",
          200: "#cdd9ea",
          300: "#a3b8d8",
          400: "#7392c0",
          500: "#5274a8",
          600: "#3f5c8d",
          700: "#354b73",
          800: "#2f4060",
          900: "#2a3750",
          950: "#1c2436",
        },
        accent: {
          DEFAULT: "#c9a227",
          light: "#e8c84a",
          dark: "#9a7b1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        elevated:
          "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
