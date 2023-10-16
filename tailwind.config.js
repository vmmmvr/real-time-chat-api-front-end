/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Cairo': ['Cairo', 'sans-serif'],
        'Open Sans': ['"Open Sans"', 'sans-serif'] // Ensure fonts with spaces have " " surrounding it.
      },
      colors: {
        primary: "#6d28d9",
        "primary-hover": "#8b5cf6",
        secondary: "#ede9fe",
      },
      boxShadow: {
        'md': '-1px 0px 8px 0px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}