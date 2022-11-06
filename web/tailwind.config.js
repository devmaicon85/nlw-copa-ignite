/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: "Roboto,sans-serif",
            },

            backgroundImage: {
                app: "url(/app-bg.png)",
            },

            screens:{
                'xs': '440px',
            },

            colors: {
                gray: {
                    100: "#E1e1e6",
                    300: "#8D8D99",
                    600: "#323238",
                    800: "#202024",
                    900: "#121214",
                },

                yellow: {
                    500: "#f7dd43",
                },
                ignite: {
                    500: "#129E57",
                },
            },
        },
    },
    plugins: [],
};
