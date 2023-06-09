const colors = require("tailwindcss/colors");

function getSemanticColors(color) {
  return {
    light: color[100],
    DEFAULT: color[500],
    dark: color[600],
  };
}

module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: ["./next/**/*.tsx", "./**/*.tsx"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      backgroundImage:{
        freestyle: "url(/images/bg.jpeg)",
      },
      colors: {
        primary: {
          light: "#A91079",
          DEFAULT: "#570A57",
          dark: "#2E0249",
        },
        seconds: {
          light: "#fff",
          DEFAULT: "#f5f5f5",
          dark: "#011f31",
        },
        accent: {
          light: "#FFF5DC",
          DEFAULT: "#F9B514",
          dark: "#E4A511",
        },
        info: getSemanticColors(colors.blue),
        success: getSemanticColors(colors.green),
        warning: getSemanticColors(colors.yellow),
        danger: getSemanticColors(colors.red),
      },
      fontSize: {
        10: "10px",
        12: "12px",
        13: "13px",
        14: "14px",
        15: "15px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        40: "40px",
        48: "48px",
        64: "64px",
      },
      maxWidth: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        "4xs": "8rem",
        "3xs": "12rem",
        "2xs": "16rem",
      },
      minWidth: {
        none: "none",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        "4xs": "8rem",
        "3xs": "12rem",
        "2xs": "16rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },
      height: {
        min: "min-content",
        max: "max-content",
      },
      minHeight: {
        none: "none",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        "4xs": "8rem",
        "3xs": "12rem",
        "2xs": "16rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        min: "min-content",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        emerge: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fade: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        emergeUp: {
          from: { opacity: 0, transform: "translateY(4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(100%)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: 1, transform: "translateY(0)" },
          to: { opacity: 0, transform: "translateY(100%)" },
        },
        scaleUp: {
          from: { opacity: 0, transform: "scale(0)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        scaleDown: {
          from: { opacity: 1, transform: "scale(1)" },
          to: { opacity: 0, transform: "scale(0)" },
        },
      },
      zIndex: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        emerge: "emerge 0.2s ease-in",
        fade: "fade .2s ease-out forwards",
        "emerge-up": "emergeUp .2s ease-in",
        "slide-up": "slideUp .2s ease-in",
        "slide-down": "slideDown .2s ease-out forwards",
        "scale-up": "scaleUp .2s ease-in",
        "scale-down": "scaleDown .2s ease-out forwards",
      },
    },
  },
  variants: {
    extend: {
      pointerEvents: ["disabled"],
      cursor: ["disabled"],
      opacity: ["disabled"],
      fill: ["hover", "focus"],
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      textColor: ["checked"],
      scale: ["active", "group-hover"],
    },
  },
  plugins: [],
  // corePlugins: {
  //   // ...
  //   borderColor: false,
  // }
};
