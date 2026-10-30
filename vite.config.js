import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
    base: '/Fia-O/', 
  plugins: [react()],
  resolve: {
    alias: {
      // El atajo "@/" significa "src/" (antes lo daba el plugin de Base44)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});