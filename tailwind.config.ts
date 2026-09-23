import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary, #6B4EFF)",
        "primary-dark": "var(--primary-dark, #5538EE)",
        "primary-light": "var(--primary-light, #856BFF)",
        "primary-subtle": "var(--primary-subtle, #F0EDFF)",
        success: "var(--success, #10B981)",
        warning: "var(--warning, #F59E0B)",
        danger: "var(--danger, #EF4444)",
        "text-dark": "var(--text-dark, #111827)",
        "text-medium": "var(--text-medium, #4B5563)",
        "text-muted": "var(--text-muted, #9CA3AF)",
        "border-default": "var(--border-default, #E5E7EB)",
        surface: "var(--surface, #FFFFFF)",
        bg: "var(--bg, #F8F9FC)",
        "sidebar-bg": "var(--sidebar-bg, #FFFFFF)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(107,78,255,.06), 0 4px 16px rgba(107,78,255,.08)",
        popup: "0 8px 32px rgba(107,78,255,.16)",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
        btn: "10px",
      },
    },
  },
  plugins: [],
};

export default config;

