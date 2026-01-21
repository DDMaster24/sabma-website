import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Shadcn CSS variable colors (mapped to SABMA palette)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Warm Ivory Heritage - Light Theme Palette
        // Primary backgrounds - warm, easy on eyes
        ivory: {
          DEFAULT: '#FDFBF7',
          50: '#FFFFFF',
          100: '#FDFBF7',
          200: '#F8F4EC',
          300: '#F0E9DD',
          400: '#E5DCCC',
          500: '#D4C8B4',
        },
        // Text colors - deep but not harsh black
        espresso: {
          DEFAULT: '#2C2418',
          50: '#5C4D3A',
          100: '#4A3E2E',
          200: '#3D3326',
          300: '#2C2418',
          400: '#1F1A11',
          500: '#14110B',
        },
        // Premium bronze/gold accents (kept from before)
        bronze: {
          50: '#FDF8F0',
          100: '#F5E6D3',
          200: '#E8C9A0',
          300: '#D4A65A',
          400: '#C9A55C',
          500: '#B8860B',
          600: '#9A7209',
          700: '#7C5C07',
          800: '#5E4505',
          900: '#402F04',
        },
        // Warm copper highlights
        copper: {
          DEFAULT: '#B87333',
          light: '#CD8B4A',
          dark: '#8B5A2B',
        },
        // Warm neutral grays (not cold)
        warm: {
          50: '#FAF9F7',
          100: '#F5F3EF',
          200: '#E8E4DD',
          300: '#D4CEC3',
          400: '#B5AC9E',
          500: '#958A7A',
          600: '#756A5C',
          700: '#5A5145',
          800: '#3E3830',
          900: '#262220',
        },
        // Keep obsidian for dark sections if needed
        obsidian: {
          DEFAULT: '#1A1714',
          50: '#2C2722',
          100: '#231F1A',
          200: '#1A1714',
          300: '#14110E',
          400: '#0A0908',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Slightly larger base sizes for readability
        'display-2xl': ['7rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-xl': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-bronze': 'linear-gradient(135deg, #C9A55C 0%, #B8860B 50%, #9A7209 100%)',
        'gradient-warm': 'linear-gradient(180deg, #FDFBF7 0%, #F8F4EC 50%, #F0E9DD 100%)',
        'mesh-light': 'radial-gradient(at 40% 20%, rgba(201, 165, 92, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(184, 115, 51, 0.05) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(201, 165, 92, 0.04) 0px, transparent 50%)',
      },
      boxShadow: {
        'soft': '0 2px 20px -3px rgba(44, 36, 24, 0.08), 0 10px 30px -5px rgba(44, 36, 24, 0.05)',
        'soft-lg': '0 15px 50px -5px rgba(44, 36, 24, 0.1), 0 25px 40px -5px rgba(44, 36, 24, 0.05)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(44, 36, 24, 0.04)',
        'bronze': '0 10px 50px -10px rgba(201, 165, 92, 0.3)',
        'bronze-lg': '0 25px 80px -15px rgba(201, 165, 92, 0.4)',
        'bronze-glow': '0 0 60px -10px rgba(201, 165, 92, 0.5)',
        'card': '0 4px 30px -5px rgba(44, 36, 24, 0.08)',
        'card-hover': '0 20px 50px -10px rgba(44, 36, 24, 0.12)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
