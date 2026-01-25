/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00bfff",
                dark: "#111827",
                bg: "#1f2937",
                "content-bg": "#374151",
                border: "#4b5563",
                "text-light": "#f9fafb",
                "text-muted": "#9ca3af",
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
