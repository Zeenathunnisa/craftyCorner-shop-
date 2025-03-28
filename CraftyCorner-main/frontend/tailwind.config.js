/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px"
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        checkmarkIn: {
          '0%': { opacity: '0', transform: 'rotate(45deg) scale(0)' },
          '100%': { opacity: '1', transform: 'rotate(45deg) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceHorizontal: {
          '0%, 100%': { transform: 'translateX(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      },
      animation: {
        scaleIn: 'scaleIn 0.8s ease-out forwards',
        checkmarkIn: 'checkmarkIn 0.5s 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.8s ease-out',
        bounceHorizontal: 'bounceHorizontal 1s infinite',
      }
    },
  },
  plugins: [],
};