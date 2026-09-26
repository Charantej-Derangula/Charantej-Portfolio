import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'Public',
  server: {
    port: 5173,
    host: true
  }
});
