import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import {resolve} from 'path'
import {componentTagger} from "lovable-tagger";


export default defineConfig(({mode}) => ({
    server: {
        host: "::",
        port: 8080,
    },
    plugins: [
        react(),
        mode === 'development' && componentTagger(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '2goBaseAuth',
            formats: ['es', 'umd'],
            fileName: (format) => `2go-base-auth.${format}.js`,
        },
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            external: [],
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
}));