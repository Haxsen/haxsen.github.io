/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0d12',
        panel: '#10151c',
        panel2: '#151c25',
        line: '#1f2833',
        ink: '#e8edf2',
        ink2: '#a6b2be',
        muted: '#7a8794',
        accent: { DEFAULT: '#3ddc97', dim: '#10261d', ink: '#04140d' },
        warn: '#f2b545',
        danger: '#ef6b6b',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Cascadia Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
}
