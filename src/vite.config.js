import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'rapt0r-portfolio'  // Replace with your actual repository name
})

