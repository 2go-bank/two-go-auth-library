import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'TGAuthSkeleton',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-router-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM',
                },
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});