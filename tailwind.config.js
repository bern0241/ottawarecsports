/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",

    // Flowbite:
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    colors: {
      'indigo-dye': {
        '50': '#eef7ff',
        '100': '#dcefff',
        '200': '#b2e1ff',
        '300': '#6dcaff',
        '400': '#20afff',
        '500': '#0095ff',
        '600': '#0075df',
        '700': '#005cb4',
        '800': '#004f94',
        '900': '#003f77',
    },    
      'amber': {
        '50': '#fff9eb',
        '100': '#ffefc6',
        '200': '#ffdc88',
        '300': '#ffc54d',
        '400': '#ffad20',
        '500': '#f98907',
        '600': '#dd6302',
        '700': '#b74306',
        '800': '#94330c',
        '900': '#7a2b0d',
    },    
      'engineering-orange': {
        '50': '#fff1ef',
        '100': '#ffe0dc',
        '200': '#ffc7bf',
        '300': '#ffa092',
        '400': '#ff6a54',
        '500': '#ff3b1f',
        '600': '#ff2000',
        '700': '#db1c00',
        '800': '#b61700',
        '900': '#941a08',
    },
    
    
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
