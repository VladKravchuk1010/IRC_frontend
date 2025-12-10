import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Industrial Reagent Calculator",
        short_name: "IRC",
        start_url: "/",
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#db4938",
        orientation: "portrait-primary",
        icons: [
          {

            "src": "/logo192.png",
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/logo512.png",
            "type": "image/png",
            "sizes": "512x512"
          }
        ],
      }
    })
  ],
  base: '/WEB_54B_2025_frontend',
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://172.25.192.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://172.25.192.1:9000',
        changeOrigin: true,
        secure: false,
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization'
    }
  },
})