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
    'postcss.config.js',
    'README.md',
    'tailwind.config.ts',
    'tsconfig.app.json',
    'tsconfig.json',
    'vite.config.ts',
    '.env'
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

try {
    const projectRoot = process.env.INIT_CWD || process.cwd();

    if (!projectRoot) {
        console.error('Could not determine project root directory');
        process.exit(1);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const packageRoot = path.resolve(__dirname, '..');

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