import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [typography],
}

export default config
