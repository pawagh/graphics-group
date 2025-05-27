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
        // Official UNC Brand Colors from https://identity.unc.edu/brand/color-palette/
        "carolina-blue": "#4B9CD3", // Primary Carolina Blue
        "unc-navy": "#13294B", // Navy
        "unc-black": "#151515", // UNC Black
        "unc-white": "#FFFFFF", // White
        "unc-gray": "#F8F8F8", // Light Gray
        
        // UNC Secondary Palette
        "basin-slate": "#4F758B",
        "campus-sandstone": "#F4E8DD",
        "longleaf-pine": "#00594C",
        "azalea-pink": "#EF426F",
        "tile-teal": "#00A5AD",
        "sunburst-yellow": "#FFD100",
        "davie-green": "#C4D600",
        
        // Orange hover colors (custom accent for interactions)
        "orange": "#FF6B35",
        "orange-light": "#FF8C69",
        "orange-dark": "#E5541C",
        "orange-50": "#FFF4F0",
        "orange-100": "#FFE4D6",
        
        // Neutral grays for UI
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
