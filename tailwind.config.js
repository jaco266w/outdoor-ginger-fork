/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}", "./layouts/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      dropShadow: {
        'up': '0 -5px 6px rgba(0, 0, 0, 0.2)',
      },
      backgroundSize: {
        zoom: "150%",
      },
      backgroundPosition: {
        "top-left-center": "left top 120rem",
      },
      screens: {
        md: "912px",
        cart: "1280px",
        "vh-sm": { raw: "(max-height: 595px)" },
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
      },
      gridTemplateRows: {
        latestYT: "1fr 3fr",
      },
      gridTemplateColumns: {
        cartLayout: "1fr 3fr 1fr",
        blogLayout: "2fr 1fr",
        checkoutLayout: "1.3fr 1fr",
      },
      spacing: {
        108: "26rem",
        144: "36rem",
      },
      colors: {
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: {
          DEFAULT: "hsl(var(--border))",
          bg: "oklch(var(--og-border-bg))",
          button: "oklch(var(--border-button))",
          input: "oklch(var(--border-input))",
          card: "oklch(var(--border-card))",
        },
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
        ogPrimary: {
          DEFAULT: "oklch(var(--og-primary))",
          light: "oklch(var(--og-primary-light))",
          lighter: "oklch(var(--og-primary-lighter))",
          lightest: "oklch(var(--og-primary-lightest))",
          dark: "oklch(var(--og-primary-dark))",
          darker: "oklch(var(--og-primary-darker))",
          darkest: "oklch(var(--og-primary-darkest))",
        },
        ogSuccess: {
          DEFAULT: "oklch(var(--og-success))",
          light: "oklch(var(--og-success-light))",
          lighter: "oklch(var(--og-success-lighter))",
          lightest: "oklch(var(--og-success-lightest))",
          dark: "oklch(var(--og-success-dark))",
          darker: "oklch(var(--og-success-darker))",
          darkest: "oklch(var(--og-success-darkest))",
        },
        ogWarning: {
          DEFAULT: "oklch(var(--og-warning))",
          light: "oklch(var(--og-warning-light))",
          lighter: "oklch(var(--og-warning-lighter))",
          lightest: "oklch(var(--og-warning-lightest))",
          dark: "oklch(var(--og-warning-dark))",
          darker: "oklch(var(--og-warning-darker))",
          darkest: "oklch(var(--og-warning-darkest))",
        },
        ogDestructive: {
          DEFAULT: "oklch(var(--og-destructive))",
          light: "oklch(var(--og-destructive-light))",
          lighter: "oklch(var(--og-destructive-lighter))",
          lightest: "oklch(var(--og-destructive-lightest))",
          dark: "oklch(var(--og-destructive-dark))",
          darker: "oklch(var(--og-destructive-darker))",
          darkest: "oklch(var(--og-destructive-darkest))",
        },
        ogBG: {
          base: "oklch(var(--og-bg-base))",
          sub: "oklch(var(--og-bg-sub))",
          hover: "oklch(var(--og-bg-hover))",
        },
        ogLabel: {
          base: "oklch(var(--og-label-base))",
          title: "oklch(var(--og-label-title))",
          muted: "oklch(var(--og-label-muted))",
          faint: "oklch(var(--og-label-faint))",
          link: "oklch(var(--og-label-link))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        desktop: "var(--og-radius-desktop)",
        mobile: "var(--og-radius-mobile)",
      },
      backgroundImage: {
        "footer-image": "url('/footer_img.webp')",
        "banner-image": "url('/leftsidedAugust.png')",
        "mobileBanner-image": "url('/orangeAugustInto.png')",
        yourmembership: "url('/yourmembership.webp')",
        forsideMobil: "url('/forsideheromobil.webp')",
        forside: "url('/forsidehero2.webp')",
        blog: "url('/bloghero.webp')",
        equipment: "url('/equipmenthero.webp')",
        about: "url('/abouthero.webp')",
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    fontFamily: {
      sans: ["var(--font-inter)"],
      display: ["var(--font-syne)"],
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), require("@tailwindcss/container-queries"), require("tailwind-scrollbar")],
};
