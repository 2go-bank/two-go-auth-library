import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import {resolve} from 'path';

export default defineConfig({
    base: '/',
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index'
        },
        rollupOptions: {
            external: ['react-router-dom'],
            output: {
                globals: {
                    'react-router-dom': 'ReactRouterDOM',
                },
            },
        },
    },
    server: {
        port: 3000,
        host: true
    },
    preview: {
        port: 3000,
        host: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
