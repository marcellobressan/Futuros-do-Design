import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Use the provided key if env var is missing, or override it.
  // Ideally, use env.API_KEY, but for this specific request we hardcode the fallback.
  const apiKey = env.API_KEY || 'AIzaSyCumxju4GUU3Og-hzcQL7zcvm-4xB4tEUE';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false
    },
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    server: {
      port: 3000,
      proxy: {
        '/.netlify/functions': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };
});