const fs = require('fs');
const path = require('path');

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

try {
    // Get the path to the root of the project that installed this package
    const projectRoot = process.env.INIT_CWD;

    if (!projectRoot) {
        console.error('Could not determine project root directory');
        process.exit(1);
    }

    // Get the path to this package's files
    const packageRoot = path.resolve(__dirname, '..');

    // Copy each file/directory
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