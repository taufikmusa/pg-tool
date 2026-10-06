import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed under pg-tool.taufik.fyi/prospect/
export default defineConfig({
  plugins: [react()],
  base: '/prospect/',
})
