/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        purple: "#7786D2",
        red: "#FF0000",
        "purple-light": "#C7D1F4",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
