import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed under pg-tool.taufik.fyi/followup/
export default defineConfig({
  plugins: [react()],
  base: '/followup/',
})
