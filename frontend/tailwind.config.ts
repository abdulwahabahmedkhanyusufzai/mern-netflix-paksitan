import type { Config } from 'tailwindcss';

export default {
  // SENIOR FIX 1: Target Angular files only (No JSX/TSX)
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      // SENIOR FIX 2: Add Enterprise Colors (Blue/Slate instead of Netflix Red)
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9', // "Tech Blue" (Like AWS/Docker)
          900: '#0c4a6e',
        },
        surface: {
          card: '#1e293b', // Dark mode card background
        }
      }
    },
  },
  // SENIOR FIX 3: Use Enterprise Plugins, not "Hide Scrollbar"
  plugins: [
    require('@tailwindcss/forms'),      // Makes inputs look professional
    require('@tailwindcss/typography'), // Great for displaying logs/docs
  ],
} satisfies Config;