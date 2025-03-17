import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/watchlyHub',
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      path: '/ws',  
    },
  },
});
