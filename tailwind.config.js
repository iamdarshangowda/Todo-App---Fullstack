const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto)", ...fontFamily.sans],
      },
      colors: {
        yellow: "#EBB02D",
        yellow_hover: "#F7C04A",
        grey: {
          DEFAULT: "#333333",
          0: "#FFFFFF",
          20: "#A0A0A0",
          30: "#707070",
          40: "#4B4B4B",
          50: "#3C3C3C",
          60: "#2F2F2F",
          70: "#242424",
          80: "#1E1E1E",
          85: "#22252A",
          90: "#121212",
        },
      },
      fontSize: {
        "heading-1/h2": ["2.5rem", { fontWeight: "700" }],
        "body-1/b1": ["16px", { fontWeight: "700" }],
        "body-1/b2": ["16px", { fontWeight: "400" }],
        "body-2/b1": ["12px", { fontWeight: "700" }],
        "body-2/b2": ["12px", { fontWeight: "400" }],

        // "heading-3/h1": ["20px", { fontWeight: "500" }],
        // "heading-3/h2": ["20px", { fontWeight: "700" }],
        // "button/b1": ["12px", { fontWeight: "600" }],
        // "body-1/b1": ["16px", { fontWeight: "400" }],
        // "body-1/b2": ["16px", { fontWeight: "500" }],
        // "body-1/b3": ["16px", { fontWeight: "600" }],
        // "body-2/b1": ["14px", { fontWeight: "400" }],
        // "body-2/b2": ["14px", { fontWeight: "500" }],
        // "body-2/b3": ["14px", { fontWeight: "600" }],
        // "body-3/b2": ["12px", { fontWeight: "500" }],
        // "body-3/b3": ["12px", { fontWeight: "600" }],
        // "caption/c1": ["10px", { fontWeight: "400" }],
        // "caption/c2": ["10px", { fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};
