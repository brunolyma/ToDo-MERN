/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'primary': "#D81E5B",
        "secondary": "#8A4EFC",
        "light": "#EEE",
        "light-alt": "#61759B",
        "dark": "#131A26",
        "dark-alt": "#202B3E"
      },
      boxShadow: {
        "box": "0 .3rem 2.4rem rgba(0, 0, 0, 0.2)",
        "box-dark": "0 .3rem 2.4rem rgba(0, 0, 0, 0.3)"

      },
    },
  },
  plugins: [],
};