/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {},
    colors: {
      purple: "#7786D2",
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
