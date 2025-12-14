import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base set to './' allows the app to run in any subdirectory (e.g. /gry/dopasowanie/)
  base: './', 
})