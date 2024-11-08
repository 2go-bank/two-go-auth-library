#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filesToCopy = [
    'public',
    'src',
    'components.json',
    'eslint.config.js',
    'index.html',
    'package.json',
    'package-lock.json',
    'postcss.config.js',
    'README.md',
    'tailwind.config.ts',
    'tsconfig.app.json',
    'tsconfig.json',
    'vite.config.ts'
];

function copyFileOrDirectory(source, destination) {
    if (fs.existsSync(source)) {
        if (fs.lstatSync(source).isDirectory()) {
            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination, { recursive: true });
            }

            const files = fs.readdirSync(source);
            files.forEach(file => {
                const sourcePath = path.join(source, file);
                const destPath = path.join(destination, file);
                copyFileOrDirectory(sourcePath, destPath);
            });
        } else {
            fs.copyFileSync(source, destination);
        }
    }
}

// Aguarda um pequeno intervalo para garantir que os arquivos estejam disponíveis
setTimeout(() => {
    try {
        // Obtém o caminho do projeto que instalou o pacote
        const projectRoot = process.cwd();
        
        if (!projectRoot) {
            console.error('Could not determine project root directory');
            process.exit(1);
        }

        // Obtém o caminho para os arquivos deste pacote
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const packageRoot = path.resolve(__dirname, '..');

        // Verifica se o diretório node_modules existe
        const nodeModulesPath = path.join(projectRoot, 'node_modules');
        if (!fs.existsSync(nodeModulesPath)) {
            console.error('node_modules directory not found. Waiting for installation to complete...');
            process.exit(1);
        }

        // Copia cada arquivo/diretório
        filesToCopy.forEach(file => {
            const source = path.join(packageRoot, file);
            const destination = path.join(projectRoot, file);

            copyFileOrDirectory(source, destination);
            console.log(`Copied ${file} to project root`);
        });

        console.log('All files copied successfully!');
    } catch (error) {
        console.error('Error copying files:', error);
        process.exit(1);
    }
}, 2000); // Aguarda 2 segundos antes de executar