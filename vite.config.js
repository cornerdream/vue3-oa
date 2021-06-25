import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    open: true,
    cors: true,
    proxy: {
          '/api': {
            target: 'http://192.168.1.212:8000/',
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
  },
  },
  // 生产环境移除console
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})
