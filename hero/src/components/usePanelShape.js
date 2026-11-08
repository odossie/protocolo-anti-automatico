import { useLayoutEffect } from 'react'

/**
 * Recorta o contorno do painel de vidro em volta do CTA (entalhe redondo na
 * borda superior) e da coluna de fichas (baía arredondada no canto inferior
 * direito). Usa geometria offset*, que ignora os transforms do parallax, então
 * os recortes ficam parados enquanto os elementos dentro deles derivam.
 */
export default function usePanelShape(heroRef, panelRef, ctaRef, thumbsRef) {
  useLayoutEffect(() => {
    const hero = heroRef.current
    const panel = panelRef.current

    const update = () => {
      const cta = ctaRef.current
      const thumbs = thumbsRef.current
      if (!panel || !cta || !thumbs) return
      if (getComputedStyle(panel).display === 'none') {
        panel.style.clipPath = ''
        return
      }

      const W = panel.offsetWidth
      const H = panel.offsetHeight
      const R = parseFloat(getComputedStyle(panel).borderTopLeftRadius) || 24
      const d = cta.offsetWidth
      const gap = d * 0.13

      // entalhe do CTA na borda superior
      const cx = cta.offsetLeft - panel.offsetLeft + d / 2
      const rn = d / 2 + gap

      // baía das fichas: aberta para a direita e para baixo
      const bx = thumbs.offsetLeft - panel.offsetLeft - gap
      const by = thumbs.offsetTop - panel.offsetTop - gap
      const r = Math.max(0, Math.min(R, (W - bx) / 2, (H - by) / 2))

      const f = (n) => n.toFixed(2)
      const path = [
        `M ${f(R)} 0`,
        `L ${f(cx - rn)} 0`,
        `A ${f(rn)} ${f(rn)} 0 0 0 ${f(cx + rn)} 0`,
        `L ${f(W - R)} 0`,
        `A ${f(R)} ${f(R)} 0 0 1 ${f(W)} ${f(R)}`,
        `L ${f(W)} ${f(by - r)}`,
        `A ${f(r)} ${f(r)} 0 0 1 ${f(W - r)} ${f(by)}`,
        `L ${f(bx + r)} ${f(by)}`,
        `A ${f(r)} ${f(r)} 0 0 0 ${f(bx)} ${f(by + r)}`,
        `L ${f(bx)} ${f(H - r)}`,
        `A ${f(r)} ${f(r)} 0 0 1 ${f(bx - r)} ${f(H)}`,
        `L ${f(R)} ${f(H)}`,
        `A ${f(R)} ${f(R)} 0 0 1 0 ${f(H - R)}`,
        `L 0 ${f(R)}`,
        `A ${f(R)} ${f(R)} 0 0 1 ${f(R)} 0`,
        'Z',
      ].join(' ')
      panel.style.clipPath = `path('${path}')`
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(hero)
    return () => ro.disconnect()
  }, [heroRef, panelRef, ctaRef, thumbsRef])
}
