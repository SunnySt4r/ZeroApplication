import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-background": "#191724",
        "color-surface": "#1f1d2e",
        "color-overlay": "#26233a",
        "color-muted-text": "#6e6a86",
        "color-text": "#e0def4",
        "color-pink": "#eb6f92",
        "color-purple": "#c4a7e7",
        "color-gold": "#f6c177",
      },
    },
  },
  plugins: [],
};
export default config;
