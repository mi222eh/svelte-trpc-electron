import { defineConfig, defineViteConfig } from 'electron-vite'
import { resolve } from 'path'
import viteConfig from './vite.config'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/main/index.ts'),
        },
        output:{
            entryFileNames: '[name].cjs',
        }
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/preload/index.ts')
        },
        output:{
            entryFileNames: '[name].cjs',
        }
      }
    }
  },
  renderer: viteConfig
})