/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["'Bebas Neue'", "sans-serif"],
      },
      colors: {
        surface: { 1: "#0e1117", 2: "#161b27", 3: "#1d2435", 4: "#242c40" },
        brand:   { DEFAULT: "#38bdf8", light: "#7dd3fc" },
        accent:  { mint: "#34d399", violet: "#a78bfa", amber: "#fbbf24", danger: "#f87171" },
      },
      animation: {
        "fade-up":   "fadeUp .3s ease both",
        "slide-up":  "slideUp .35s ease both",
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: "translateY(12px)" }, to: { opacity: 1, transform: "none" } },
        slideUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "none" } },
      },
    },
  },
  plugins: [],
};
