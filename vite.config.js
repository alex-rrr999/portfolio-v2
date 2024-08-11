import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default defineConfig({
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server: {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: '../static/.well-known/', // Replace with the path to the folder you want to copy
                    dest: '' // Destination within the dist directory
                }
            ]
        })
    ]
});