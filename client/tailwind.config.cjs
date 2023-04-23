/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgcolor: "#F6F4E8",
        bgcolor2: "#FCFCFF",
        bgcolor3: "#E6E7EB",
        primary: "#191718",
        secondary: "#2D3E4E",
        green_tangerine: "#615d0d",
        apple_aha: "#dd434b",
        heart_leaf: "#9c9a0d",
        apricot_collagen: "#d46933",
      },
      fontFamily: {
        urbanist: "Urbanist",
        gotu: "Gotu",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
