import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert()
  ],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://172.20.10.3:8000',
        changeOrigin: true,
        secure: false,      
      },
      // '/images': {
      //   target:'http://172.20.10.3:9000',
      //   changeOrigin: true,
      //   secure: false,      
      // }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization'
    }
  },
})