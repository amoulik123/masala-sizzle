import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555,
    host: true,
    proxy: {
      '/ws': {
        target: 'ws://localhost:20778',
        ws: true,
        rewriteWsOrigin: true,
      },
      '/api': {
        target: 'http://localhost:20779',
        changeOrigin: true,
      },
    },
  },
})
