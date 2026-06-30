/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1A22",
          900: "#0F2530",
          800: "#16323F",
          700: "#1B3A4B",
        },
        brass: {
          400: "#C99A52",
          500: "#B6863C",
          600: "#A6592B",
        },
        parchment: {
          50: "#F7F4ED",
          100: "#F1ECE0",
        },
        teal: {
          500: "#2F6D5C",
        },
        plum: {
          500: "#5B3A8E",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        ledger: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px -8px rgba(0,0,0,0.5)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
