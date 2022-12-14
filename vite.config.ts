import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@routes': path.resolve(__dirname, './src/routes/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
    },
  },
  // https://github.com/pd4d10/vite-plugin-svgr
  plugins: [react(), svgr()],
  build: {
    sourcemap: true,
  },
  base: 'https://osmberlin.github.io/osm-tag-updater/',
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
