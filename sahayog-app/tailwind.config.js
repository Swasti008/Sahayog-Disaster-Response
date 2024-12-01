/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Paths to your HTML, JS, and React/TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        customGray: "#EDE8E8",
        primary: "#1d4ed8", // Custom color example
        secondary: "#9333ea",
        'custom-light-blue': '#eff6ff',
      },
      spacing: {
        128: "32rem", // Example custom spacing
        144: "36rem",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"], // Custom fonts
        serif: ["Merriweather", "serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
   "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  plugins: [], // Optional plugins
};
