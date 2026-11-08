import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ART, MARKS } from '../data.js'

const HOVER_RADIUS = 0.46 // fração da largura da arte; a maior parte é pluma

// Grade e feixe recortados pela silhueta: a máscara é o próprio recorte.
const silhouette = {
  WebkitMaskImage: `url("${ART.subject}")`,
  maskImage: `url("${ART.subject}")`,
}

/** Canal alfa reduzido do recorte, para a varredura só abrir sobre o personagem. */
function useAlphaMap(src) {
  const map = useRef(null)
  useEffect(() => {
    map.current = null
    const img = new Image()
    img.onload = () => {
      const w = 160
      const h = Math.round((w * img.naturalHeight) / img.naturalWidth)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(img, 0, 0, w, h)
      map.current = { w, h, data: ctx.getImageData(0, 0, w, h).data }
    }
    img.src = src
  }, [src])

  return (u, v) => {
    const m = map.current
    if (!m) return true // ainda não decodificou: vale a caixa inteira
    const x = Math.min(m.w - 1, Math.max(0, Math.floor(u * m.w)))
    const y = Math.min(m.h - 1, Math.max(0, Math.floor(v * m.h)))
    return m.data[(y * m.w + x) * 4 + 3] > 24
  }
}

/** Marcações do ciclo, desenhadas em coordenadas da arte. */
function Marks() {
  return (
    <svg className="marks" viewBox={`0 0 ${ART.width} ${ART.height}`} aria-hidden>
      {MARKS.map((m, i) => {
        const [x, y, w, h] = m.box
        const c = 22 // comprimento do canto
        const midY = y + h / 2
        let lx1, lx2, tx, anchor, ty
        if (m.side === 'top') {
          lx1 = lx2 = x + 14
          tx = x + 14
          ty = y - 40
          anchor = 'start'
        } else if (m.side === 'left') {
          lx1 = x
          lx2 = x - 46
          tx = x - 56
          ty = midY - 4
          anchor = 'end'
        } else {
          lx1 = x + w
          lx2 = x + w + 46
          tx = x + w + 56
          ty = midY - 4
          anchor = 'start'
        }
        return (
          <g key={m.id} className="mark" style={{ '--i': i }}>
            <path
              className="mark__box"
              d={`M${x} ${y + c}V${y}H${x + c} M${x + w - c} ${y}H${x + w}V${y + c} M${x + w} ${y + h - c}V${y + h}H${x + w - c} M${x + c} ${y + h}H${x}V${y + h - c}`}
            />
            <rect className="mark__fill" x={x} y={y} width={w} height={h} />
            {m.side === 'top' ? (
              <line className="mark__lead" x1={lx1} y1={y} x2={lx2} y2={y - 22} />
            ) : (
              <line className="mark__lead" x1={lx1} y1={midY} x2={lx2} y2={midY} />
            )}
            <text className="mark__n" x={tx} y={ty} textAnchor={anchor}>
              {m.n} · {m.label.toUpperCase()}
            </text>
            <text className="mark__note" x={tx} y={ty + 30} textAnchor={anchor}>
              {m.note}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/**
 * O personagem. Passar o cursor sobre ele abre um círculo de varredura que
 * segue o ponteiro e revela a camada de dados (raio-x + marcações do ciclo);
 * clicar fixa a varredura no corpo inteiro (é também como funciona no toque).
 */
export default function SubjectScan({ onScanChange, onLockChange }) {
  const [ready, setReady] = useState(false)
  const [hover, setHover] = useState(false)
  const [locked, setLocked] = useState(false)
  const hitRef = useRef(null)
  const isOpaque = useAlphaMap(ART.subject)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const r = useMotionValue(0)
  // Seguimento macio: o círculo arrasta atrás do cursor em vez de grudar.
  const sx = useSpring(mx, { stiffness: 120, damping: 22 })
  const sy = useSpring(my, { stiffness: 120, damping: 22 })
  const sr = useSpring(r, { stiffness: 80, damping: 20 })

  // Núcleo sólido e queda longa: um pincel com pluma, sem borda dura.
  const s0 = useTransform(sr, (v) => v * 0.38)
  const s1 = useTransform(sr, (v) => v * 0.58)
  const s2 = useTransform(sr, (v) => v * 0.75)
  const s3 = useTransform(sr, (v) => v * 0.9)
  const showMask = useMotionTemplate`radial-gradient(circle at ${sx}px ${sy}px, #000 ${s0}px, rgba(0,0,0,.8) ${s1}px, rgba(0,0,0,.45) ${s2}px, rgba(0,0,0,.15) ${s3}px, transparent ${sr}px)`

  // Reporta o estado para cima com 140 ms de tolerância na saída, para a copy
  // não piscar quando o cursor raspa a borda da silhueta.
  const scanning = ready && (hover || locked)
  useEffect(() => {
    if (scanning) {
      onScanChange(true)
      return
    }
    const t = setTimeout(() => onScanChange(false), 140)
    return () => clearTimeout(t)
  }, [scanning, onScanChange])

  const hoverRadius = () => hitRef.current.offsetWidth * HOVER_RADIUS
  const fullRadius = () => Math.hypot(hitRef.current.offsetWidth, hitRef.current.offsetHeight) * 2

  const moveTo = (x, y) => {
    if (sr.get() < 1) {
      sx.jump(x)
      sy.jump(y)
    }
    mx.set(x)
    my.set(y)
  }

  const onMove = (e) => {
    if (locked) return
    const el = hitRef.current
    const { offsetX: x, offsetY: y } = e.nativeEvent
    const inside = isOpaque(x / el.offsetWidth, y / el.offsetHeight)
    moveTo(x, y)
    r.set(inside ? hoverRadius() : 0)
    setHover(inside)
  }
  const onLeave = () => {
    setHover(false)
    if (!locked) r.set(0)
  }
  const toggle = (x, y, pointerType) => {
    const next = !locked
    setLocked(next)
    onLockChange(next)
    moveTo(x, y)
    if (next) r.set(fullRadius())
    else r.set(pointerType === 'touch' ? 0 : hoverRadius())
  }
  const onClick = (e) => {
    const el = hitRef.current
    const { offsetX: x, offsetY: y } = e.nativeEvent
    if (!isOpaque(x / el.offsetWidth, y / el.offsetHeight) && !locked) return
    toggle(x, y, e.pointerType)
  }
  const onKey = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    const el = hitRef.current
    toggle(el.offsetWidth / 2, el.offsetHeight * 0.35, 'keyboard')
  }

  return (
    <div className={`subject ${scanning ? 'is-scanning' : ''} ${locked ? 'is-locked' : ''}`}>
      {/* filtro de varredura: luminância em duotom térmico na paleta da marca */}
      <svg className="subject__defs" aria-hidden focusable="false">
        <filter id="dossie-xray" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0" />
          <feComponentTransfer>
            {/* ergue os escuros: a arte é quase toda preta, sem isso vira mancha */}
            <feFuncR type="gamma" amplitude="1" exponent="0.5" offset="0" />
            <feFuncG type="gamma" amplitude="1" exponent="0.5" offset="0" />
            <feFuncB type="gamma" amplitude="1" exponent="0.5" offset="0" />
          </feComponentTransfer>
          <feComponentTransfer>
            {/* duotom glacial: abismo → turquesa → branco-esverdeado */}
            <feFuncR type="table" tableValues="0.01 0.03 0.12 0.55 0.92" />
            <feFuncG type="table" tableValues="0.07 0.3 0.88 0.98 1" />
            <feFuncB type="table" tableValues="0.07 0.27 0.76 0.92 0.97" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* placa: a arte original, mesmas coordenadas — halo e fumaça atrás do recorte */}
      <img src={ART.backdrop} alt="" aria-hidden draggable={false} className="subject__plate" />
      {/* anel de luz sobre o halo da arte (centro ~ 500,395 · raio ~345 px na arte) */}
      <span className="hero__subject-halo" aria-hidden />

      <div className="subject__layer">
        <img
          src={ART.subject}
          alt="Personagem oficial do Dossiê: cabelo preto desalinhado, máscara preta sobre nariz e boca, sobretudo preto"
          draggable={false}
          className="subject__img"
          onLoad={() => setReady(true)}
          onError={() => setReady(false)}
        />
      </div>

      <motion.div className="subject__layer subject__layer--scan" style={{ WebkitMaskImage: showMask, maskImage: showMask }} aria-hidden>
        <img src={ART.subject} alt="" draggable={false} className="subject__img subject__img--xray" />
        <span className="subject__grid" style={silhouette} />
        <span className="subject__sweep" style={silhouette} />
        <Marks />
      </motion.div>

      {ready && (
        <div
          ref={hitRef}
          className={`subject-hit ${hover || locked ? 'is-active' : ''}`}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onClick={onClick}
          onKeyDown={onKey}
          role="button"
          tabIndex={0}
          aria-pressed={locked}
          aria-label={locked ? 'Encerrar a varredura' : 'Fixar a varredura do personagem'}
        />
      )}
    </div>
  )
}
