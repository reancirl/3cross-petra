import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny, google } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Work Sans', {
                    weights: [400, 500, 600],
                }),
                google('Barlow Condensed', {
                    weights: [500, 600, 700, 800, 900],
                }),
                google('Montserrat', {
                    weights: [700, 800, 900],
                }),
            ],
        }),
        tailwindcss(),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        hmr: {
            host: 'localhost',
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
