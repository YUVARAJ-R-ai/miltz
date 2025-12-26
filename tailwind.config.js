/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Defining the Miltz brand palette
      colors: {
        miltz: {
          red: '#C62828', // Primary Brand Red
          yellow: '#FFC107', // Accent Yellow
          cream: '#FFF8EE', // Main Background
          dark: '#121212', // Theatre Mode / Dark Text
          // Flavor Accents
          orange: '#F57C00', // Cheese
          tomato: '#E53935', // Tomato
          green: '#43A047', // Garlic
        },
      },
      // Defining typography stack
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      // Custom spacing for cinematic feel
      spacing: {
        '128': '32rem',
      },
      backgroundImage: {
        'cinematic-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
