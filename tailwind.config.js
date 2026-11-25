/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#14213D', // Primary Navy
          800: '#1F3557', // Secondary Navy
          700: '#2A4674',
        },
        bgLight: '#F5F7FA', // Background
        accent: '#3B82F6', // Accent Blue
        textMain: '#1E293B', // Main Text
        textSecondary: '#64748B', // Secondary Text
        borderLight: '#E2E8F0', // Borders
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
