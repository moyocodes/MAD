import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        azure: {
          50: "#eef7fd",
          100: "#d9ecfa",
          200: "#b3d8f5",
          300: "#8cc3ef",
          400: "#5aa7e6",
          500: "#1980c2",
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
        white: {
          DEFAULT: "#ffffff",
          soft: "#f9fafb",
          muted: "#f3f4f6",
          dim: "#e5e7eb",
        },
        success: { 500: "#22c55e", 600: "#16a34a" },
        warning: { 500: "#f59e0b", 600: "#d97706" },
        error:   { 500: "#ef4444", 600: "#dc2626" },
      },

      fontFamily: {
        // ─── PRIMARY ──────────────────────────────────────────────────────────
        // Helvetica Neue is the workhorse: body copy, UI labels, inputs, buttons.
        // Falls back through the Helvetica stack, then Montserrat (loaded via
        // Google Fonts) so web-only environments still get a geometric sans.
        sans: [
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "Montserrat",
          "sans-serif",
        ],

        // ─── DISPLAY / HEADINGS ───────────────────────────────────────────────
        // Montserrat is the closest freely-available match to Gotham /
        // Proxima Nova. Use font-display on h1–h3 for hero text, section
        // headers, and nav wordmarks.  When your client licences Gotham or
        // Proxima Nova, add them here at the front of the stack; everything
        // already using font-display will pick them up automatically.
        display: [
          "Montserrat",
          "Gotham",
          '"Proxima Nova"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],

        // ─── MONO ─────────────────────────────────────────────────────────────
        mono: ['"JetBrains Mono"', "monospace"],
      },

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },

      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },

  plugins: [
    // ─── BASE TYPOGRAPHY PLUGIN ───────────────────────────────────────────────
    // Injects font assignments into Tailwind's @base layer so every HTML
    // element gets the right typeface without any className on your JSX.
    //
    // Hierarchy:
    //   body / p / li / td / label / input / button → font-sans  (Helvetica Neue)
    //   h1 – h3 / .display                           → font-display (Montserrat → Gotham/PN)
    //   h4 – h6                                      → font-sans, semi-bold
    //   code / pre / kbd                             → font-mono
    //
    plugin(function ({ addBase, theme }) {
      addBase({
        // ── Global reset ────────────────────────────────────────────────────
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        // ── Body / root ─────────────────────────────────────────────────────
        "html, body": {
          fontFamily: theme("fontFamily.sans"),
          fontSize: "16px",
          lineHeight: "1.6",
          fontWeight: "400",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
        },

        // ── Display headings (h1–h3) → Montserrat / Gotham / Proxima Nova ──
        "h1, h2, h3": {
          fontFamily: theme("fontFamily.display"),
          fontWeight: "700",
          lineHeight: "1.1",
          letterSpacing: "-0.02em",
        },

        // ── UI headings (h4–h6) → Helvetica Neue, tighter ──────────────────
        "h4, h5, h6": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "600",
          lineHeight: "1.25",
          letterSpacing: "-0.01em",
        },
        h4: { fontSize: "1.25rem" },
        h5: { fontSize: "1.125rem" },
        h6: { fontSize: "1rem" },

        // ── Body copy ────────────────────────────────────────────────────────
        p: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "400",
          lineHeight: "1.65",
        },

        // ── Lists ────────────────────────────────────────────────────────────
        "ul, ol, li": {
          fontFamily: theme("fontFamily.sans"),
        },

        // ── Interactive / form elements ──────────────────────────────────────
        "button, input, textarea, select, label": {
          fontFamily: theme("fontFamily.sans"),
        },

        // ── Navigation links ─────────────────────────────────────────────────
        "nav a, nav span": {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: "500",
          letterSpacing: "0.01em",
        },

        // ── Eyebrow / caption / small ────────────────────────────────────────
        // Small all-caps labels (e.g. section eyebrows) stay Helvetica Neue
        // but get a slight tracking boost automatically.
        "small, caption, figcaption": {
          fontFamily: theme("fontFamily.sans"),
          fontSize: "0.8125rem",
          letterSpacing: "0.04em",
        },

        // ── Code ─────────────────────────────────────────────────────────────
        "code, pre, kbd, samp": {
          fontFamily: theme("fontFamily.mono"),
          fontSize: "0.875em",
        },

        // ── Tables ───────────────────────────────────────────────────────────
        "th, td": {
          fontFamily: theme("fontFamily.sans"),
        },
        th: {
          fontWeight: "600",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontSize: "0.75rem",
        },

        // ── Blockquote ───────────────────────────────────────────────────────
        blockquote: {
          fontFamily: theme("fontFamily.display"),
          fontStyle: "italic",
          fontWeight: "500",
        },
      });
    }),
  ],
};
