import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { api_proxy_addr, img_proxy_addr, dest_root } from "./src/target_config"; // ❌ ДОБАВЛЕНО

export default defineConfig({
  plugins: [
    react(),
  ],
  base: dest_root,
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
      },
      "/images": {
        target: img_proxy_addr,
        changeOrigin: true,
      },
    },
  },
});