/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,vue}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tw-elements/dist/plugin'),
  ],
}
