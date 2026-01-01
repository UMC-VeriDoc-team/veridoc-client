/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand / main colors
        brand: {
          primary: "#2B7FFF", // main blue
          primarySoft: "#2B7FFF26", // main blue (15% opacity)
          green: "#33C894", // success
          yellow: "#FAE164", // warning
          orange: "#F17148", // accent
        },

        // Semantic colors
        error: {
          DEFAULT: "#FF3939",
        },

        // Gray (neutral)
        gray: {
          50: "#F7F7F8",
          100: "#E1E2E4",
          200: "#AEB0B6",
          600: "#5A5C63",
          900: "#292A2D",
          950: "#171719",
        },

        layout: {
          footerBg: "#FBFAFA",
          footerBorder: "#D9D9D9",
          footerTitle: "#212121",
          footerText: "#30333C",
        },
      },

      // Font system
      fontFamily: {
        kr: ["Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", "system-ui", "sans-serif"],
        en: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
