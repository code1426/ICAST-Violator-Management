/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color1: "#3A2D28",
        color2: "#A48374",
        color3: "#CBAD8D",
        color4: "#D1C7BD",
        color5: "#EBE3DB",
        color6: "#F1EDE6",
      },
      fontSize: {
        xxs: ["0.5rem", "0.75rem"],
      },
    },
  },
  plugins: [],
};
