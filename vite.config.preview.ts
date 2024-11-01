import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
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