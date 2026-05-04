/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 🔵 Brand اللون
        azure: {
          50: "#eef7fd",
          100: "#d9ecfa",
          200: "#b3d8f5",
          300: "#8cc3ef",
          400: "#5aa7e6",
          500: "#1980c2", // main
          600: "#1468a0",
          700: "#0f4f7a",
          800: "#0a3654",
          900: "#051c2e",
        },

        tangerine: {
          50: "#fff3ee",
          100: "#ffe0d2",
          200: "#ffc0a6",
          300: "#ff9b72",
          400: "#fb7d43",
          500: "#F26522",
          600: "#d4551a",
          700: "#a84216",
          800: "#7c3113",
          900: "#4f1f0d",
        },

        cream: {
          100: "#f5f1eb",
        },

        // ⚫ Dark mode colors
        dark: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#2a2a28",
          900: "#181817",
        },

        // ⚪ White system
        white: {
          DEFAULT: "#ffffff",
          soft: "#f9fafb",
          muted: "#f3f4f6",
          dim: "#e5e7eb",
        },

        // 🟢 Semantic colors
        success: {
          500: "#22c55e",
          600: "#16a34a",
        },
        warning: {
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          500: "#ef4444",
          600: "#dc2626",
        },
      },

      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};
