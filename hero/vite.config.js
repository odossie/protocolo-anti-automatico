import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Modo "artifact": um único HTML autocontido (JS, CSS e imagens embutidos)
// e SEM o Meta Pixel, para pré-visualizar sem sujar os dados de campanha.
const stripPixel = {
  name: 'strip-meta-pixel',
  transformIndexHtml: (html) =>
    html
      .replace(/<!-- Meta Pixel Code[\s\S]*?End Meta Pixel Code -->/, '')
      .replace(/<noscript><img[^>]*facebook\.com\/tr[^>]*\/><\/noscript>/, ''),
}

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact'
  return {
    plugins: [react(), ...(artifact ? [stripPixel, viteSingleFile()] : [])],
    build: artifact ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000 } : {},
  }
})
