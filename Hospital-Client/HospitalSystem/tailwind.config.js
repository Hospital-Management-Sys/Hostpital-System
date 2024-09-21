const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: { colors: {
      primary: '#FF6B6B',
      secondary: '#F8F988',
      tertiary: '#4ECDC4',
    },
    fontFamily: {
      bubblegum: ['"Bubblegum Sans"', 'cursive'],
    },},
  },
  plugins: [
    flowbite.plugin(),
  ],
}