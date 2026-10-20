/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Roboto", "'Noto Sans SC'", "'PingFang SC'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
