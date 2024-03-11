import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': '', // 서버 주소 기입
    },
  },
  resolve: {
    alias: [
      // 절대경로로 접근
      { find: '~/components', replacement: '/src/components' },
      { find: '~/lib', replacement: '/src/lib' },
      { find: '~/router', replacement: '/src/router' },
      { find: '~/routes', replacement: '/src/routes' },
      { find: '~/store', replacement: '/src/store' },
      { find: '~/assets', replacement: '/src/assets' },
    ],
  },
})
