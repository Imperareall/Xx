import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.WEBP'],
  server: {
    watch: {
      ignored: ['**/*.~tmp', '**/*.mp4', '**/*.mov', '**/*.MOV', '**/HongKong/**', '**/Yunnan/**', '**/Macau/**', '**/Shanghai/**', '**/Nanjing/**', '**/Chongqing/**', '**/Beijing/**', '**/SGMYTH/**'],
    },
  },
})
