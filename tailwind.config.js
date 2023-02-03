/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
			poppins: ['Poppins', 'sans-serif'],
			lato: 'Lato, sans-serif',
			source: ['Source Sans Pro', 'sans-serif'],
			oswald: ['Oswald', 'sans-serif'],
		},

		extends: {},
	},

	plugins: [],
};
