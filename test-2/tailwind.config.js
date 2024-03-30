/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],	
  theme: {
    extend: {
		colors: {
			'primary': '#333333',
			'secondary': '#2196F3',
			'tertiary': '#F5F5F5',
		},
		backgroundImage: {
			'hero-bg': 'url("src/assets/hero.png")'
		}
	},
  },
  plugins: [],
}

