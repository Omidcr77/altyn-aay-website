/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        brand: 'hsl(var(--brand) / <alpha-value>)',
      },
      animation: {
        drift: 'drift 18s linear infinite',
      },
      keyframes: {
        drift: {
          from: { backgroundPosition: '0px 0px' },
          to: { backgroundPosition: '44px 44px' },
        },
      }
    },
  },
  plugins: [],
}