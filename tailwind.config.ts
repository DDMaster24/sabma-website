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
        // Shadcn CSS variable colors
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

        // ========================================
        // HERITAGE NOIR - Premium Dark Palette
        // Inspired by the majestic Black Mastiff
        // ========================================

        // Primary: Deep Noir (the dog's coat)
        noir: {
          DEFAULT: '#0D0D0D',
          50: '#1A1A1A',
          100: '#141414',
          200: '#0D0D0D',
          300: '#080808',
          400: '#050505',
          500: '#000000',
        },

        // Warm Charcoal (depth without harshness)
        charcoal: {
          DEFAULT: '#1C1917',
          50: '#292524',
          100: '#1C1917',
          200: '#171412',
          300: '#12100E',
          400: '#0C0A09',
        },

        // Amber/Gold Accent (warmth, prestige)
        amber: {
          DEFAULT: '#D97706',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // Warm Cream (contrast, readability)
        cream: {
          DEFAULT: '#FAF7F2',
          50: '#FFFFFF',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EDE5D8',
          400: '#E0D5C4',
          500: '#D4C9B5',
        },

        // Stone (neutral text on dark)
        stone: {
          DEFAULT: '#A8A29E',
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },

        // Copper (warm metallic accent)
        copper: {
          DEFAULT: '#C77B48',
          50: '#FDF4EE',
          100: '#F9E4D6',
          200: '#F2C8AC',
          300: '#E8A577',
          400: '#DD8246',
          500: '#C77B48',
          600: '#A8623A',
          700: '#8B4E31',
          800: '#6E3D28',
          900: '#522D1E',
        },

        // Deep Bronze (heritage feel)
        bronze: {
          DEFAULT: '#B8860B',
          50: '#FDF8F0',
          100: '#F5E6D3',
          200: '#E8C9A0',
          300: '#D4A65A',
          400: '#C9A55C',
          500: '#B8860B',
          600: '#9A7209',
          700: '#7C5C07',
        },

        // Legacy colors for compatibility
        ivory: {
          DEFAULT: '#FAF7F2',
          50: '#FFFFFF',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EDE5D8',
          400: '#E0D5C4',
          500: '#D4C9B5',
        },
        espresso: {
          DEFAULT: '#1C1917',
        },
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
        forest: {
          DEFAULT: '#1B4332',
          50: '#D8F3DC',
          100: '#B7E4C7',
          200: '#95D5B2',
          300: '#52B788',
          400: '#2D6A4F',
          500: '#1B4332',
          600: '#14352A',
          700: '#0D2818',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF7E8',
          100: '#F5EBC4',
          200: '#EDDA8C',
          300: '#E5C954',
          400: '#D4AF37',
          500: '#B8962F',
          600: '#9A7D27',
          700: '#7C641F',
        },
        ink: {
          DEFAULT: '#1C1917',
          50: '#44403C',
          100: '#3B3835',
          200: '#2C2926',
          300: '#1C1917',
        },
        earth: {
          bark: {
            50: '#FAF5F0',
            100: '#F0E6D8',
            200: '#E0CDB1',
            300: '#C9A97A',
            400: '#A67C52',
            500: '#5D4037',
            600: '#4E3630',
            700: '#3E2A25',
            800: '#2F1F1B',
            900: '#1F1410',
          },
          sand: {
            50: '#FDFAF5',
            100: '#F9F3E8',
            200: '#F5E6D3',
            300: '#EDD9BE',
            400: '#E2C79F',
            500: '#D4B07A',
          },
          grass: {
            50: '#ECFDF5',
            100: '#D1FAE5',
            200: '#A7F3D0',
            300: '#6EE7B7',
            400: '#34D399',
            500: '#10B981',
            600: '#059669',
            700: '#047857',
          },
        },
      },
      fontFamily: {
        // Dramatic display font - editorial luxury
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        // Clean body font - modern legibility
        body: ['var(--font-dmsans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Dramatic display sizes
        'hero': ['clamp(3.5rem, 12vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '400' }],
        'display-2xl': ['7rem', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-xl': ['5rem', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'reveal-up': 'revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'draw-line': 'drawLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'text-reveal': 'textReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-80px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(80px)' },
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
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(100%)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(217, 119, 6, 0.2)' },
          '50%': { borderColor: 'rgba(217, 119, 6, 0.6)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-amber': 'linear-gradient(135deg, #D97706 0%, #B45309 50%, #92400E 100%)',
        'gradient-noir': 'linear-gradient(180deg, #1C1917 0%, #0D0D0D 100%)',
        'gradient-warm': 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 50%, #EDE5D8 100%)',
        // Noise texture
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'soft': '0 2px 20px -3px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 15px 50px -5px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'amber': '0 10px 50px -10px rgba(217, 119, 6, 0.4)',
        'amber-lg': '0 25px 80px -15px rgba(217, 119, 6, 0.5)',
        'amber-glow': '0 0 60px -10px rgba(217, 119, 6, 0.6)',
        'card': '0 4px 30px -5px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 50px -10px rgba(0, 0, 0, 0.2)',
        'dramatic': '0 50px 100px -20px rgba(0, 0, 0, 0.5)',
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
        'dramatic': 'cubic-bezier(0.4, 0, 0, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
