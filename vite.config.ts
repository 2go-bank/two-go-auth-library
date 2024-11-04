import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'

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
            name: '2go-base-auth',
            formats: ['es', 'umd'],
            fileName: (format) => `2go-base-auth.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
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
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    define: {
        'process.env': {
            VITE_AUTH_API_URL: JSON.stringify('https://api.2gopag.com/access/auth'),
            VITE_API_BASE_URL: JSON.stringify('https://api.2gopag.com'),
            VITE_ENVIRONMENT: JSON.stringify('production'),
            VITE_LOGO_URL: JSON.stringify('https://2gobank.com.br/wp-content/uploads/2023/05/logo-2go-bank.png')
        }
    }
})