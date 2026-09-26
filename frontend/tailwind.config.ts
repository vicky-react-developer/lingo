/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        micPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(108, 99, 255, 0.7)" },
          "70%": { boxShadow: "0 0 0 14px rgba(108, 99, 255, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(108, 99, 255, 0)" },
        },
        typingBounce: {
          "0%, 80%, 100%": { transform: "scale(0)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        slideUp: "slideUp 0.25s ease",
        slideDown: "slideDown 0.25s ease",
        micPulse: "micPulse 1.4s infinite",
        typingBounce: "typingBounce 1.4s infinite ease-in-out both",
      },
    },
  },
  plugins: [],
}