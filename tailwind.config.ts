import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--tp-font-display)", "sans-serif"],
        body: ["var(--tp-font-body)", "sans-serif"],
      },
      colors: {
        purple: {
          950: "#0D0820",
          900: "#130D2E",
          800: "#1E1247",
          700: "#2D1B6B",
          600: "#3D2491",
          500: "#5B33C4",
          DEFAULT: "#7C3AED",
          400: "#9B6CF0",
          300: "#C4B5FD",
          200: "#DDD6FE",
          100: "#EDE9FE",
          50: "#F5F3FF",
        },
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
