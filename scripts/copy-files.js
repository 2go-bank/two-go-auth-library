#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Only run if this is being executed as an installed package
const isPackage = process.env.INIT_CWD && process.env.INIT_CWD !== process.cwd();

if (!isPackage) {
    console.log('Skipping copy files script - running in development mode');
    process.exit(0);
}

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

async function copyFileOrDirectory(source, destination) {
    if (fs.existsSync(source)) {
        if (fs.lstatSync(source).isDirectory()) {
            if (!fs.existsSync(destination)) {
                fs.mkdirSync(destination, { recursive: true });
            }

            const files = fs.readdirSync(source);
            for (const file of files) {
                const sourcePath = path.join(source, file);
                const destPath = path.join(destination, file);
                await copyFileOrDirectory(sourcePath, destPath);
            }
        } else {
            fs.copyFileSync(source, destination);
        }
    }
}

async function main() {
    try {
        const projectRoot = process.env.INIT_CWD || process.cwd();

        if (!projectRoot) {
            console.error('Could not determine project root directory');
            process.exit(1);
        }

        const __dirname = path.dirname(__filename);
        const packageRoot = path.resolve(__dirname, '..');

        for (const file of filesToCopy) {
            const source = path.join(packageRoot, file);
            const destination = path.join(projectRoot, file);

            await copyFileOrDirectory(source, destination);
            console.log(`Copied ${file} to project root`);
        }

        console.log('All files copied successfully!');
    } catch (error) {
        console.error('Error copying files:', error);
        process.exit(1);
    }
}

main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});