import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Meat } from 'tabler-icons-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    _global: ({}),
  },
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_SERVER_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/api/, '')

      }
    }
  }
})