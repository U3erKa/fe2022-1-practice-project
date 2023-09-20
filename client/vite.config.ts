import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: { target: browserslistToEsbuild(), sourcemap: true },
  css: { devSourcemap: true },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      devOptions: { enabled: true },
      registerType: 'autoUpdate',
      manifest: false,
    }),
  ],
});
