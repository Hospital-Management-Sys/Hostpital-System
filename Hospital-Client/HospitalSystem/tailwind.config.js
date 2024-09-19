/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust as necessary
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
  plugins: [],
};
