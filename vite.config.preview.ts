import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Carrega todas as variáveis de ambiente do arquivo .env
const envVars = {
    VITE_AUTH_API_URL: process.env.VITE_AUTH_API_URL || 'https://api.2gopag.com/access/auth',
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || 'https://api.2gopag.com',
    VITE_ENVIRONMENT: process.env.VITE_ENVIRONMENT || 'production',
    VITE_LOGO_URL: process.env.VITE_LOGO_URL || 'https://2gobank.com.br/wp-content/uploads/2023/05/logo-2go-bank.png'
}

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM'
                },
                format: 'umd',
                name: '2go-base-auth'
            }
        },
        copyPublicDir: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    define: {
        'process.env': envVars,
        'process': {
            env: envVars
        },
        'global.process.env': envVars,
        'window.process.env': envVars
    }
})