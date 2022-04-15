module.exports = {
  // This needs to be mirrored in nuxt.config.js to eliminate
  // the console error message when starting the DEV script.
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [],
}
