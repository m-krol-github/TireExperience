const { join } = require("path");

const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");

module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      dropShadow: {
        custom: "0 0 0.9375rem rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        michelin: ["var(--font-michelin)", "sans-serif"],
        openSans: ["var(--font-open-sans)", "sans-serif"],
        plusJakartaSans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        notoSans: ["Noto Sans", "sans-serif"],
      },
      scale: {
        12: "1.2",
      },
      keyframes: {
        dashoffsetAnimation: {
          "0%": { strokeDashoffset: 999 },
          "100%": { strokeDashoffset: 0 },
        },
        fadeOutScale: {
          "0%": { transform: "scale(1.25)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
      },
      animation: {
        dashoffsetAnimation: "dashoffsetAnimation 2s linear forwards",
        fadeOutScale: "fadeOutScale 0.5s ease-in-out forwards",
      },
      screens: {
        sm: "30rem",
        md: "48rem",
        lg: "61rem",
        xl: "90rem",
      },
      colors: {
        blue: "#27509B",
        yellow: "#FCE500",
        white: "#ffffff",
        black: "#000000",
        "blue-background": "#0036b2",
        "dark-blue": "#00205B",
        "generous-green": "#84BD00",
        "sustainable-grey": "#53565A",
        "purple-engaged": "#582C83",
        "dark-blue-bg": "#021B61",
      },
      textStrokeWidth: {
        default: "0.055rem",
      },
      fontSize: {
        "mobile-h1": [
          "3.125rem",
          {
            lineHeight: "3.4375rem",
            letterSpacing: "0.0625rem",
            fontWeight: "900",
          },
        ],
        "mobile-h2": ["1.75rem", { lineHeight: "2.1rem", fontWeight: "900" }],
        "mobile-h3": ["1rem", { lineHeight: "1.2rem", fontWeight: "900" }],
        "mobile-h1xl": ["8.75rem", { lineHeight: "1", fontWeight: "bold" }],
        "mobile-h4": ["1rem", { lineHeight: "1.2rem", fontWeight: "900" }],
        h1: ["3.5rem", { lineHeight: "3.85rem", fontWeight: "900" }],
        h2: ["2.75rem", { lineHeight: "2rem" }],
        h3: ["2rem", { lineHeight: "2.4rem", fontWeight: "bold" }],
        h4: ["1.5rem", { lineHeight: "1.5rem", fontWeight: "900" }],
        h5: ["1rem", { lineHeight: "1.5rem", fontWeight: "bold" }],
        h6: [
          "0.75rem",
          {
            lineHeight: "0.938rem",
            fontWeight: "600",
          },
        ],
        h1xl: ["8.75rem", { lineHeight: "8.75rem", fontWeight: "bold" }],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-yellow-outline": {
          color: "transparent",
          "-webkit-text-stroke": "0.055rem #fce500",
        },
        ".text-white-outline": {
          color: "transparent",
          "-webkit-text-stroke": "0.055rem #ffffff",
        },
        ".border-yellow-custom-thick": {
          border: "4px solid #FCE500",
        },
        ".border-yellow-custom": {
          border: "1px solid #FCE500",
        },
        ".border-dashed-custom": {
          border: "2px dashed #FFFFFF",
        },
        ".animate-border #animated-circle": {
          animation: "dashoffsetAnimation 2s linear forwards",
        },
        ".reset-border": {
          animation: "fadeOutScale 0.5s ease-in-out forwards",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    function ({ addUtilities }) {
      addUtilities({
        ".card-rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
      });
    },
  ],
};
