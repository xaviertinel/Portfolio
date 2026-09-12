import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Le site est servi sous https://xaviertinel.github.io/Portfolio/
  base: '/Portfolio/',
  plugins: [react()],
})
