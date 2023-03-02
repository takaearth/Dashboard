/** @type {import('tailwindcss').Config} */
// tailwind.config.cjs
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xxs: "320px",
      xs: "480px",
      ...defaultTheme.screens,
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#10b981",
          "primary-focus": "#059669",
          "primary-content": "#fff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
