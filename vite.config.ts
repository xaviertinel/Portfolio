import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Le site est servi à la racine (Cloudflare Pages)
  base: '/',
  plugins: [react()],
})
