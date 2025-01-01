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
                primary: "hsl(var(--primary))",
                green: "hsl(var(--green))",
                blue: "hsl(var(--blue))",
                red: "hsl(var(--red))",
                gray: "hsl(var(--gray))",
            },
        },
    },
    plugins: [],
} satisfies Config;
