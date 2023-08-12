import { defineConfig, defineViteConfig } from 'electron-vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/main/index.ts'),
        },
        output: {
          entryFileNames: '[name].cjs',
        }
      },
      outDir: 'dist/main'
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'electron/preload/index.ts')
        },
        output: {
          entryFileNames: '[name].cjs',
        }
      },
      outDir: 'dist/preload'
    }
  },
  renderer: defineViteConfig({
    root: resolve(__dirname),
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
        },
      },
      outDir: 'dist/renderer'
    },
    server: {
      port: 3000,
    },
    plugins: [svelte({
      inspector: true,
      compilerOptions: {
        outputFilename: 'dist/renderer/build/bundle.js',
      }
    })],
  })
})