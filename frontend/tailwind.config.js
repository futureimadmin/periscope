/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFDF00",
          dark: "#CCB200",
          light: "#FFF299",
          50: "#FFFEF0",
          100: "#FFFAD1",
          200: "#FFF299",
          300: "#FFE85C",
          400: "#FFDF00",
          500: "#E6C700",
          600: "#CCB200",
          700: "#998500",
          800: "#665900",
          900: "#332C00",
        },
        charcoal: {
          DEFAULT: "#0f0f0f",
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#a3a3a3",
          300: "#737373",
          400: "#525252",
          500: "#404040",
          600: "#262626",
          700: "#1a1a1a",
          800: "#141414",
          900: "#0f0f0f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
