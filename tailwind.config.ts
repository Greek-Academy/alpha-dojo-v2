import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		width: {
			'100': '25rem'
		},
  		colors: {
  			background: 'rgb(var(--background))',
  			foreground: {
				DEFAULT: 'rgb(var(--foreground))',
				variant: 'rgb(var(--foreground-variant))'
			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'rgb(var(--primary))',
  				foreground: 'rgb(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'rgb(var(--secondary))',
  				foreground: 'rgb(var(--secondary-foreground))',
				container:  {
					DEFAULT: 'rgb(var(--secondary-container))',
					foreground: 'rgb(var(--secondary-container-foreground))'
				}
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: {
				DEFAULT: 'rgb(var(--border))',
				variant: 'rgb(var(--border-variant))'
			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
			status: {
				done: 'rgb(var(--status-done))',
				reviewed: 'rgb(var(--status-reviewed))'
			},
			difficulty: {
				easy: 'rgb(var(--difficulty-easy))',
				medium: 'rgb(var(--difficulty-medium))',
				hard: 'rgb(var(--difficulty-hard))'
			}
  		},
  		borderRadius: {
  			lg: 'calc(var(--radius))',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontSize: {
			"body-medium":            ['14px', {fontWeight: '400', letterSpacing: '0.25px', lineHeight: '20px'}],
			"label-medium-prominent": ['12px', {fontWeight: '600', letterSpacing: '0.5px', lineHeight: '16px'}]
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
