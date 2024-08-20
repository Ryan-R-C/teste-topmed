/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color": "var(--main-color)",
        "secondary-color": "var(--secondary-color)",
        "neutral": "var(--neutral)",
        "error-color": "var(--error-color)",
        "error-background": "var(--error-background)",
        "success-color": "var(--sucess-color)",
        "sucess-background": "var(--sucess-background)",
        "main-text-color": "var(--main-text-color)",
        "secondary-text-color": "var(--secondary-text-color)",
        "alternative-text-color": "var(--alternative-text-color)",
        "secondary-alternative-color": "var(--secondary-alternative-color)",
        "default-background": "var(--default-background)",
      },
    },
  },
  plugins: [],
}

