/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0a0f',
        'cyber-blue': '#00f3ff',
        'cyber-red': '#ff003c',
        'cyber-green': '#00ff9f',
      },
    },
  },
  plugins: [],
}
