import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": "#f5f5f5",
        "columnBackgroundColor": "#f0f0f0",
      }
    },
  },
  plugins: [],
}
export default config
