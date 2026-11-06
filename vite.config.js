import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // The app is served from https://<user>.github.io/myweatherapp/
  base: '/myweatherapp/',
  plugins: [react()],
})
