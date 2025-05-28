import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Official UNC Primary Brand Colors from https://identity.unc.edu/brand/color-palette/
        "carolina-blue": "#4B9CD3", // Web Carolina Blue (Hex #4B9CD3, RGB 75, 156, 211) - for digital use
        "unc-navy": "#13294B", // Navy (PMS 2767, Hex #13294B, RGB 19, 41, 75)
        "unc-black": "#151515", // Black (PMS Black 3, Hex #151515, RGB 21, 21, 21)
        "unc-white": "#FFFFFF", // White
        "unc-gray": "#F8F8F8", // Gray (CMYK 4, 3, 3, 0, Hex #F8F8F8, RGB 248, 248, 248)
        
        // Official UNC Secondary Brand Colors from https://identity.unc.edu/brand/color-palette/
        "basin-slate": "#4F758B", // Basin Slate (PMS 5405, Hex #4F758B, RGB 79, 117, 139)
        "campus-sandstone": "#F4E8DD", // Campus Sandstone (PMS 2309 at 50%, Hex #F4E8DD, RGB 244, 232, 221)
        "longleaf-pine": "#00594C", // Longleaf Pine (PMS 561, Hex #00594C, RGB 0, 89, 76)
        "azalea-pink": "#EF426F", // Azalea Pink (PMS 191, Hex #EF426F, RGB 239, 68, 111)
        "tile-teal": "#00A5AD", // Tile Teal (PMS 7466, Hex #00A5AD, RGB 0, 165, 173)
        "sunburst-yellow": "#FFD100", // Sunburst Yellow (PMS 109, Hex #FFD100, RGB 255, 209, 0)
        "davie-green": "#C4D600", // Davie Green (PMS 382, Hex #C4D600, RGB 196, 214, 0)
        
        // Orange accent colors - using a UNC-appropriate orange tone for hover effects
        "orange": "#FF6B35", // Custom orange for interactions (warm, accessible)
        "orange-light": "#FF8C69",
        "orange-dark": "#E5541C",
        "orange-50": "#FFF4F0",
        "orange-100": "#FFE4D6",
        
        // Neutral grays for UI elements
        "neutral-50": "#f9fafb",
        "neutral-100": "#f3f4f6",
        "neutral-200": "#e5e7eb",
        "neutral-300": "#d1d5db",
        "neutral-400": "#9ca3af",
        "neutral-500": "#6b7280",
        "neutral-600": "#4b5563",
        "neutral-700": "#374151",
        "neutral-800": "#1f2937",
        "neutral-900": "#111827",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;
