
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        teal: '#C0EEE4',
        yellow: '#F8F988',
        coral: '#FFCAC8',
        red: '#FF9E9E',
      },
    },
  },
  plugins: [ flowbite.plugin(),],
};




