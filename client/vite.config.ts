import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts()
  ],
  build: {
    cssCodeSplit: true, // explicitly enable CSS code splitting
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (
            name &&
            (name.endsWith('.png') ||
             name.endsWith('.jpg') ||
             name.endsWith('.jpeg') ||
             name.endsWith('.svg'))
          ) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
