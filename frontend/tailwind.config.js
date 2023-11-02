/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {      
    extend: {     
      colors: {         
        'argentinian': '#63B6F9',
        'indigo-light': '#144C7A',         
        'indigo': '#0B4472',         
        'charcoal': '#2E3F4D',         
        'gunmetal': '#212B33',       
      },     
    },   
  },
  plugins: [],
}
