/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  // Docs https://tailwindcss.com/docs/configuration#core-plugins
  corePlugins: {
    opacity: false,
    borderOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },
}
