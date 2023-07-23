module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': "#ffffff",
        'black': "#000000",
        'primary': "#ffffff",
        'secondary': "#000000",
        'error': "#e35335",
        'blue': "#4ba6ff",
        'accent': "#bff22d",
        'lime': "#bff22d",
        'dark': "#000000",
        'gray': "#f5f5f5",
        "light-theme-gray": "rgb(182, 206, 173)",
        "light-button-gray": "#bfbfbf",
        "light-font": "#474747"
      },
      borderRadius: {
        card: "10px"
      },
      boxShadow: {
        "light-card":
          "12px 12px 16px 0 rgba(255, 255, 255, 0.3), -8px -8px 12px 0 rgba(0, 0, 0, .25)",
        "light-button":
          "6px 6px 8px 0 rgba(255, 255, 255, 0.3), -4px -4px 6px 0 rgba(0, 0, 0, .25)"
      },
      height: {
        card: "300px",
        button: "40px"
      },
      width: {
        card: "250px",
        button: "100px"
      }
    },
  },
  plugins: [],
};
