/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        'tropical-indigo': { DEFAULT: '#8d86c9', 100: '#17152e', 200: '#2f2a5d', 300: '#463f8b', 400: '#6259b4', 500: '#8d86c9', 600: '#a59fd4', 700: '#bbb7df', 800: '#d2cfe9', 900: '#e8e7f4' },

        'sage': { DEFAULT: '#adb993', 100: '#24281a', 200: '#475034', 300: '#6b784f', 400: '#8e9e6b', 500: '#adb993', 600: '#bdc7a9', 700: '#ced5be', 800: '#dee3d4', 900: '#eff1e9' },
        'raspberry': { DEFAULT: '#ce2d4f', 100: '#290910', 200: '#521220', 300: '#7b1b30', 400: '#a42440', 500: '#ce2d4f', 600: '#da5471', 700: '#e37f95', 800: '#ecaab8', 900: '#f6d4dc' },
        'gunmetal': { DEFAULT: '#22333b', 100: '#070a0c', 200: '#0d1417', 300: '#141e23', 400: '#1b282f', 500: '#22333b', 600: '#40606f', 700: '#608ea3', 800: '#95b4c2', 900: '#cad9e0' },
        'blue-munsell': { DEFAULT: '#0091ad', 100: '#001d23', 200: '#003a45', 300: '#005768', 400: '#00748b', 500: '#0091ad', 600: '#00c9f1', 700: '#35ddff', 800: '#78e9ff', 900: '#bcf4ff' }
      }
    },
  },
  plugins: [],
}

