import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import mikrotik from './src/lib/mikrotik-plugin'
import { viteSingleFile } from 'vite-plugin-singlefile'

export const config: UserConfig = {
  plugins: [vue(), vueJsx(), tailwindcss(), vueDevTools(), mikrotik(), viteSingleFile()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        alogin: fileURLToPath(new URL('./alogin.html', import.meta.url)),
        login: fileURLToPath(new URL('./login.html', import.meta.url)),
        logout: fileURLToPath(new URL('./logout.html', import.meta.url)),
        status: fileURLToPath(new URL('./status.html', import.meta.url)),
        error: fileURLToPath(new URL('./error.html', import.meta.url)),
        redirect: fileURLToPath(new URL('./redirect.html', import.meta.url)),
      },
    },
  },
}

export default defineConfig(config)
