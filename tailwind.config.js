/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#2d5f4f',
        'forest-green-light': '#3a7863',
        'forest-green-dark': '#1e3a32',
        'cassava-brown': '#8b6f47',
        'cassava-brown-light': '#a8844f',
        'cassava-brown-dark': '#6b5737',
        'maize-yellow': '#ffd700',
        'maize-yellow-light': '#ffe44d',
        'maize-yellow-dark': '#e6c200',
        'light-beige': '#f5f3f0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
