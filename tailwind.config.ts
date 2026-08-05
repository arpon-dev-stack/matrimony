import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000d22",
        "primary-container": "#002349",
        "primary-fixed": "#d5e3ff",
        "primary-fixed-dim": "#adc8f6",
        secondary: "#775a19",
        "secondary-container": "#fed488",
        "secondary-fixed": "#ffdea5",
        background: "#fbf9f8",
        surface: "#fbf9f8",
        "surface-container-low": "#f5f3f3",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#43474e",
        "outline-variant": "#c4c6cf",
        "tertiary-container": "#222320",
        "on-tertiary-container": "#8b8a86",
      },
      spacing: {
        "stack-sm": "12px",
        "stack-md": "24px",
        "stack-lg": "48px",
        gutter: "24px",
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        "container-max": "1280px",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;