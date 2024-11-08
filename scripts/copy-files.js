#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const projectRoot = process.cwd();

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
    try {
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
    } catch (error) {
        console.error(`Error copying ${source} to ${destination}:`, error);
        throw error;
    }
}

async function main() {
    try {
        console.log('Project root:', projectRoot);

        for (const file of filesToCopy) {
            const source = path.join(projectRoot, file);
            const destination = path.join(projectRoot, 'dist', file);

            await copyFileOrDirectory(source, destination);
            console.log(`Copied ${file} to dist folder`);
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