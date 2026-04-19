import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'b9cc-2401-4900-cac9-c505-e585-f820-cce4-739c.ngrok-free.app'
    ]
  }
})
