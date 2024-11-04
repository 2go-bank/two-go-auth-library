import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
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
            name: '2goBaseAuth',
            formats: ['es', 'umd'],
            fileName: (format) => `2go-base-auth.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'firebase/app', 'firebase/messaging', 'react-google-recaptcha'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'firebase/app': 'firebase',
                    'firebase/messaging': 'firebaseMessaging',
                    'react-google-recaptcha': 'ReCAPTCHA'
                }
            }
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    optimizeDeps: {
        include: ['firebase/app', 'firebase/messaging', 'react-google-recaptcha']
    },
    server: {
        port: 5173,
        host: true
    }
})