import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'login.html'),
        alogin: resolve(__dirname, 'alogin.html'),
        status: resolve(__dirname, 'status.html'),
        logout: resolve(__dirname, 'logout.html'),
        error: resolve(__dirname, 'error.html'),
        redirect: resolve(__dirname, 'redirect.html'),
      },
    },
  },
})
