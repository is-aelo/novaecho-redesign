import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
        24: '96px',
        45: '180px',
        135: '540px',
        180: '720px',
      },
      colors: {
        surface: {
          950: 'var(--surface-950)',
          900: 'var(--surface-900)',
          800: 'var(--surface-800)',
          700: 'var(--surface-700)',
        },
        text: {
          primary: 'var(--text-primary-on-dark)',
          secondary: 'var(--text-secondary-on-dark)',
        },
        accent: {
          cyan: 'var(--accent-cyan)',
          sky: 'var(--accent-sky)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '4.75rem' }],
        'display-xl': ['3.5rem', { lineHeight: '3.75rem' }],
        'display-lg': ['2.5rem', { lineHeight: '2.75rem' }],
        'display-md': ['1.75rem', { lineHeight: '2.125rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-md': ['1rem', { lineHeight: '1.5rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'caption': ['0.75rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
      },
    },
  },
} satisfies Config;
