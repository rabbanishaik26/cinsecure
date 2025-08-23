import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cinsecure/',   // 👈 important for GitHub Pages
  build: {
    outDir: "docs",      // 👈 build output to docs/
  },
})
