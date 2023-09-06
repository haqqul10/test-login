module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      primary: "Inter",
    },
    container: {
      padding: {
        DEFAULT: "30px",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#3E334E",
        secondary: "#F5E6E0",
      },
      backgroundImage: {
        hero: "url('./assets/Background Saldo.png')",
      },
    },
  },
  plugins: [],
};
