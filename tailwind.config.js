import defaultTheme from 'tailwindcss/defaultTheme';
// import forms from '@tailwindcss/forms';

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
                'custom-primary': '#171c20',
                'custom-secondary': '#AFAFAF'
            },
        },
    },

    plugins: [require("daisyui")],

    daisyui: {
        themes: ["dark"],
    }
};
