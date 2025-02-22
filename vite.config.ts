import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'process.env.VITE_IMGBB_API_KEY': JSON.stringify(env.VITE_IMGBB_API_KEY),
      'process.env.VITE_UPLOADCARE_PUBLIC_KEY': JSON.stringify(env.VITE_UPLOADCARE_PUBLIC_KEY),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
