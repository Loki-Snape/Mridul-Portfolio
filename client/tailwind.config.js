// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'sonic-blue': '#0055FF',
        'sonic-blue-dark': '#002244',
        'arcade-red': '#FF0033',
        'arcade-red-dark': '#CC0000',
        'sega-gold': '#FFD700',
        'sega-gold-dark': '#FF9900',
        'crt-black': '#080810',
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'monospace'],
        vt: ['VT323', 'monospace'],
        hud: ['Rajdhani', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'arcade-glow': '0 0 10px 2px rgba(255,0,51,0.7)',
        'gold-glow': '0 0 10px 2px rgba(255,215,0,0.7)',
        'red-glow': '0 0 10px 2px rgba(255,0,51,0.7)',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.94' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        flicker: 'flicker 0.15s infinite',
      },
    },
  },
  plugins: [],
};
