import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'background': '#0E0D14',
                'foreground': '#18181B',
                'primary': '#FFE100',
                'secondary': '#232326'
            },
        },
    },

    plugins: [require("daisyui")],

    daisyui: {
        themes: ["dark"],
    }
};
