/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Golden Yellow palette (light theme)
        gold: {
          DEFAULT: "#FFDF00",
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
        cream: {
          DEFAULT: "#FFF8E7",
          50: "#FFFEF9",
          100: "#FFF8E7",
          200: "#FFF3D6",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          50: "#F8F8F8",
          100: "#F0F0F0",
          200: "#E0E0E0",
          300: "#C0C0C0",
          400: "#8A8A8A",
          500: "#5A5A5A",
          600: "#3A3A3A",
          700: "#2A2A2A",
          800: "#1A1A1A",
          900: "#0E0E0E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        elevated: "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.04)",
      },
    },
  },
  plugins: [],
}
