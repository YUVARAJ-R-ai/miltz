/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base Backgrounds
        'bg-primary': '#14110F',
        'bg-secondary': '#1F1A17',
        'bg-surface': '#2A231E',
        // Bronze & Warm Highlights
        bronze: '#B08A57',
        gold: '#D4A76A',
        amber: '#E6B980',
        // CTA (Logo Red)
        cta: '#C43A2F',
        'cta-hover': '#A93026',
        // Typography
        headline: '#F2E9E1',
        'body-text': '#CBBFB3',
        muted: '#8F8175',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      backgroundImage: {
        'warm-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'bronze-gradient': 'linear-gradient(135deg, #B08A57 0%, #D4A76A 50%, #E6B980 100%)',
      },
      boxShadow: {
        'bronze-glow': '0 0 20px rgba(176, 138, 87, 0.3)',
        'bronze-glow-lg': '0 0 40px rgba(176, 138, 87, 0.4)',
        'cta-glow': '0 0 20px rgba(196, 58, 47, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
