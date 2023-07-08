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
        target: 'https://chatbot-server-vo8v.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/api/, '')

      }
    }
  }
})