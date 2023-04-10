/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',

		// Flowbite:
		'./node_modules/flowbite/**/*.js',
		'./node_modules/flowbite-react/**/*.js',

		//Datepicker
		'./node_modules/tailwind-datepicker-react/dist/**/*.js',
	],
	theme: {
		colors: {
			'yellowb': '#FFFF00',
			'brand-neutral': {
				50: '#f5f5f5',
				100: '#f0f0f0',
				200: '#e4e4e4',
				300: '#d0d0d0',
				400: '#b4b4b4',
				500: '#9a9a9a',
				600: '#818181',
				700: '#6a6a6a',
				800: '#5a5a5a',
				900: '#4e4e4e',
			},
			'brand-blue': {
				50: '#eff8ff',
				100: '#e6f4ff',
				200: '#b8e4ff',
				300: '#79cfff',
				400: '#32b7fe',
				500: '#079ff0',
				600: '#007ece',
				700: '#0064a6',
				800: '#003F77',
				900: '#023059',
			},
			'brand-amber': {
				50: '#fff9eb',
				100: '#ffefc6',
				200: '#ffdc88',
				300: '#ffc54d',
				400: '#ffad20',
				500: '#f98907',
				600: '#dd6302',
				700: '#b74306',
				800: '#94330c',
				900: '#7a2b0d',
			},
			'brand-orange': {
				50: '#fff1ef',
				100: '#ffe0dc',
				200: '#ffc7bf',
				300: '#ffa092',
				400: '#ff6a54',
				500: '#ff3b1f',
				600: '#ff2000',
				700: '#db1c00',
				800: '#b61700',
				900: '#941a08',
			},
		},
		extend: {},
	},
	plugins: [require('flowbite/plugin')],
};
