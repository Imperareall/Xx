import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/experiencepic/**', '**/meetpic/**', '**/合照pic/**', '**/xx/**', '**/Forever/**', '**/pets/**', '**/*.~tmp'],
    },
  },
})
