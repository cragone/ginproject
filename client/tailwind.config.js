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
          "primary": "#F4978E",   // Soft pastel pink for main elements (e.g., buttons)
          "secondary": "#F9C5D1", // Lighter blush pink for secondary backgrounds
          "accent": "#FFDFD3",    // Soft peach for accent areas (e.g., borders)
          "neutral": "#FFFFFF",   // Pure white for card backgrounds and form elements
          "base-100": "#FCE4EC",  // Very light pink for overall background
          "info": "#A7BED3",      // Muted light blue for info messages
          "success": "#A6E3E9",   // Soft teal for success elements
          "warning": "#FAD6A5",   // Soft gold for warning elements
          "error": "#FFB3B3",     // Pastel red for error messages
        },
      },
      "light", // Include default light theme
      "dark",  // Include default dark theme
    ],
  }
}
