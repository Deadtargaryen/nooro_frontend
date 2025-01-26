/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        gradientStart: "#1E3A8A",
        gradientEnd: "#8B5CF6",
      },
    },
  },
  plugins: [],
};
