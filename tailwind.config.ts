import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        basic: ["Basic", "sans-serif"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6", // Slightly lighter version of the provided color
          600: "#7c3aed", // Base primary color close to #6d28d9
          700: "#6d28d9", // Provided color
          800: "#5b21b6",
          900: "#4c1d95",
          main: "#7c3aed",
          light: "#ddd6fe", // Lighter shade
          dark: "#581c87", // Darker shade
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563", // Matching light gray for contrast with primary
          700: "#374151",
          800: "#1f2937", // Matching dark gray for contrast with primary
          900: "#111827",
          light: "#f3f4f6", // Light gray
          DEFAULT: "#6b7280", // Default gray
          dark: "#374151",
        },
        warning: "#dc2626",
      },
    },
  },
  plugins: [],
});
export default config;
