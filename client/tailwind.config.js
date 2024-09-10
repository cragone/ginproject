/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        wedding: {
          "primary": "#E9D8A6",   // Soft gold accent color
          "secondary": "#F4E1D2", // Light peach for background and accents
          "accent": "#A6C9C9",    // Soft muted teal for accents
          "neutral": "#FDF5F1",   // Off-white for background
          "base-100": "#FFFFFF",  // Pure white for main areas
          "info": "#A0DDE6",      // Light blue for info elements
          "success": "#A6D4B6",   // Muted green for success elements
          "warning": "#EACDA3",   // Soft yellow for warning elements
          "error": "#E58A8A",     // Light pinkish red for errors
        },
      },
      "light", // Include default light theme
      "dark",  // Include default dark theme
    ],
  }
}
