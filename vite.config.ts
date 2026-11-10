import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker';
import { fileURLToPath } from 'url';
import path from 'path'

// https://vite.dev/config/
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true }), // Enable TypeScript checking
    
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5175,
  },
  resolve: {
    alias: {
      '@configs': path.resolve(__dirname, 'src/configs'),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@src": path.resolve(__dirname, "src")
    },
  }
})
