/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: false, // Disable purge temporarily
  content: [
    './src/**/*.{html,js,njk}', // Adjust these paths according to your project's structure
    './**/*.{html,js,njk}',
    '!./node_modules/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};