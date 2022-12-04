/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      backgroundImage: {
        textGradient:
          "linear-gradient(94.69deg, #373B44 0%, #73C8A9 54.3%, #373B44 106.38%)",
        gradient:
          "linear-gradient(90.58deg,#373b44 0%,#73c8a9 50.52%, #373b44 100%)",
        buttonGradient:
          "linear-gradient(120.58deg,#373b44 0%,#73c8a9 50.52%, #373b44 100%)",
      },
      colors: {
        primary: "#73C8A9", //metallic green
        secondary: "#73C8A980",
        deskBackground: "#E5E5E5",
        inputText: "text-gray-500",
        primaryText: "#3C3C3C",
        secondaryText: "#616161", //blackText,
        background: "#FAFAFA",
        iconColor: "bg-gray-500",
        selectedButton: "#D7E7CB",
        bigBackground: "#F1F1F1",
        selectedText: "#6B8828",
        profileEmpty: "#FFFADD",
        profileEmpty2: "#FCDFC5",
        opaque: "#ACB1B6",
        card: "#F3F4F6", //bg-gray-200(light mode)
        background2: "#FFFFFF", //bg-white(light mode)
        iconColor: "#9CA3AF", //bg-gray-400(light mode)
        message: "#4B5563",
      },

      maxWidth: {
        monitor: "1560px",
        messageCard: "360px",
      },
      minWidth: {
        36: "9rem",
        48: "12rem",
      },
      padding: {
        18: "4.5rem",
      },
      borderWidth: {
        DEFAULT: "1px",
        "1px": "1px",
        "2px": "2px",
        0.5: "2px",
        "0.5px": "0.5px",
      },
      lineHeight: {
        heading: "5rem",
      },
      height: {
        height: "calc(100vh - 160px)",
        consult: "27rem",
        about: "2000px",
        160: "40rem",
        1600: "1600px",
      },
      width: {
        68: "272px",
        about: "2000px",
        108: "432px",
        120: "495px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
