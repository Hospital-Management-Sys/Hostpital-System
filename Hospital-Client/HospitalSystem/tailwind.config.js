const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",
        secondary: "#F8F988",
        tertiary: "#4ECDC4",
        teal: "#C0EEE4",
        yellow: "#F8F988",
        coral: "#FFCAC8",
        red: "#FF9E9E",
      },
    },
    fontFamily: {
      bubblegum: ['"Bubblegum Sans"', "cursive"],
    },
  },
  plugins: [flowbite.plugin()],
};
