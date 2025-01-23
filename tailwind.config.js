/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#5951BA",
        lightPurple: "#5951BA",
        lightBlue: "#82ACFF",
      },
      textShadow: {
        violet: "2px 2px #5951BA",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
