import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Meat } from 'tabler-icons-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    _global: ({}),
  },
})