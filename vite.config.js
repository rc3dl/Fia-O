import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Fia-O/' : '/',
  plugins: [react()],
  // ...el resto igual
  resolve: {
    alias: {
      // El atajo "@/" significa "src/" (antes lo daba el plugin de Base44)
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});