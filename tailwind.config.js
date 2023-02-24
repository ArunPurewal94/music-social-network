/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",

            md: "768px",

            lg: "1024px",

            xl: "1280px",
        },
    },
    plugins: [require("@tailwindcss/forms", "tw-elements/dist/plugin")],
};
