import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Builds SSR normalmente descartam o CSS. O gerador do design system
    // precisa dele: o HTML e o CSS têm que sair do MESMO build, senão os
    // hashes dos CSS Modules divergem e o preview sai sem estilo.
    ssrEmitAssets: true,
  },
})
