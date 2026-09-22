/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          dark: '#1a1a1a',     // Dark charcoal background
          card: '#242424',     // Slightly lighter charcoal for cards and panels
          border: '#333333',   // Subtle dark border color
          orange: '#D9822B',   // Rich orange accent from your palette
          orangeHover: '#c27123',
        }
      }
    },
  },
  plugins: [],
}