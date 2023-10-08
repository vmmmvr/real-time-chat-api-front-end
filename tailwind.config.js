/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'MyFont': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
      },
      colors: {
        primary: "#6d28d9",
        secondary: "#ede9fe",
      }
    },
  },
  plugins: [],
}