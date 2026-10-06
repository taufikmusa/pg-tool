import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed under pg-tool.taufik.fyi/registration/
export default defineConfig({
  plugins: [react()],
  base: '/registration/',
})
