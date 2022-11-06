/// <reference types="vitest" />

import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@routes': path.resolve(__dirname, './src/routes/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
    },
  },
  test: {
    // https://vitest.dev/config/#globals
    // globals: true,
    // https://vitest.dev/config/#environment
    // environment: 'happy-dom',
  },
})
