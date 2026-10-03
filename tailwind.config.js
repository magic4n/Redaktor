/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Material You 3 - Medical Blue seed (#0061A4)
        primary: 'var(--md-sys-color-primary)',
        'on-primary': 'var(--md-sys-color-on-primary)',
        'primary-container': 'var(--md-sys-color-primary-container)',
        'on-primary-container': 'var(--md-sys-color-on-primary-container)',
        
        secondary: 'var(--md-sys-color-secondary)',
        'on-secondary': 'var(--md-sys-color-on-secondary)',
        'secondary-container': 'var(--md-sys-color-secondary-container)',
        'on-secondary-container': 'var(--md-sys-color-on-secondary-container)',
        
        tertiary: 'var(--md-sys-color-tertiary)',
        'on-tertiary': 'var(--md-sys-color-on-tertiary)',
        'tertiary-container': 'var(--md-sys-color-tertiary-container)',
        'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container)',
        
        surface: 'var(--md-sys-color-surface)',
        'on-surface': 'var(--md-sys-color-on-surface)',
        'surface-variant': 'var(--md-sys-color-surface-variant)',
        'on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
        
        background: 'var(--md-sys-color-background)',
        'on-background': 'var(--md-sys-color-on-background)',
        
        error: 'var(--md-sys-color-error)',
        'on-error': 'var(--md-sys-color-on-error)',
        'error-container': 'var(--md-sys-color-error-container)',
        'on-error-container': 'var(--md-sys-color-on-error-container)',
        
        outline: 'var(--md-sys-color-outline)',
        'outline-variant': 'var(--md-sys-color-outline-variant)',
      },
      fontFamily: {
        sans: ['Roboto Flex', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // M3 Typography scale
        'display-lg': ['3.5rem', { lineHeight: '4rem', fontWeight: 400 }],
        'display-md': ['2.8rem', { lineHeight: '3.5rem', fontWeight: 400 }],
        'display-sm': ['2.25rem', { lineHeight: '2.75rem', fontWeight: 400 }],
        
        'headline-lg': ['2rem', { lineHeight: '2.5rem', fontWeight: 400 }],
        'headline-md': ['1.75rem', { lineHeight: '2.25rem', fontWeight: 500 }],
        'headline-sm': ['1.5rem', { lineHeight: '2rem', fontWeight: 500 }],
        
        'title-lg': ['1.375rem', { lineHeight: '1.75rem', fontWeight: 500 }],
        'title-md': ['1rem', { lineHeight: '1.5rem', fontWeight: 500 }],
        'title-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: 500 }],
        
        'body-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: 400 }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: 400 }],
        'body-sm': ['0.75rem', { lineHeight: '1rem', fontWeight: 400 }],
        
        'label-lg': ['0.75rem', { lineHeight: '1rem', fontWeight: 500 }],
        'label-md': ['0.6875rem', { lineHeight: '1rem', fontWeight: 500 }],
        'label-sm': ['0.5rem', { lineHeight: '0.8rem', fontWeight: 500 }],
      },
      borderRadius: {
        sm: '12px',
        base: '16px',
        lg: '28px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
