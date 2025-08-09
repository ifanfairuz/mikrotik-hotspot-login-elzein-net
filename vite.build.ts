import { build, InlineConfig } from 'vite'
import { config } from './vite.config'
import { fileURLToPath } from 'node:url'
import { existsSync, mkdirSync, rmSync } from 'node:fs'

function buildConfigFor(entrypoint: string): InlineConfig {
  return {
    logLevel: 'error',
    build: {
      ...(config.build ?? {}),
      emptyOutDir: false,
      rollupOptions: {
        ...(config.build?.rollupOptions ?? {}),
        input: fileURLToPath(new URL(`./${entrypoint}.html`, import.meta.url)),
      },
    },
  }
}

if (existsSync('dist')) {
  rmSync('dist', { recursive: true })
}
mkdirSync('dist')

await Promise.all([
  build(buildConfigFor('alogin')),
  build(buildConfigFor('login')),
  build(buildConfigFor('logout')),
  build(buildConfigFor('status')),
  build(buildConfigFor('error')),
  build(buildConfigFor('redirect')),
])
