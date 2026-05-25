import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel", "Times New Roman", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Lato", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        stone: {
          950: "#0d0b09",
        },
        amber: {
          900: "#451a03",
        },
      },
    },
  },
  plugins: [],
};

export default config;
