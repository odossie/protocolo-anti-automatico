import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { CHECKOUT_URL, FILES, NAV, PRICE, PRICE_ANCHOR, PRODUCT_ID } from '../data.js'
import { trackCheckout, trackOnce } from '../analytics.js'
import { Layer, ParallaxContext } from './parallax.jsx'
import usePanelShape from './usePanelShape.js'
import SubjectScan from './SubjectScan.jsx'
import FileThumb from './FileThumb.jsx'
import { Arrow, Doc, Eye, Menu, Scan, Seal, Unlock } from './Icons.jsx'
import './Hero.css'

const spring = { stiffness: 110, damping: 16, mass: 0.7 }
const ease = [0.2, 0.7, 0.2, 1]

// Campo de partículas determinístico: não reembaralha a cada render.
const DUST = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37.3) % 100,
  top: (i * 53.7) % 100,
  size: 2 + ((i * 7) % 4),
  delay: (i % 7) * 0.7,
  near: i % 3 === 0,
  red: i % 5 === 0,
}))

// Toque (sem hover): a dica precisa falar em tocar, não em passar o cursor.
const COARSE = '(hover: none)'
function subscribeCoarse(cb) {
  const mq = window.matchMedia(COARSE)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const useCoarse = () => useSyncExternalStore(subscribeCoarse, () => window.matchMedia(COARSE).matches, () => false)

function today() {
  const n = new Date()
  const p = (v) => String(v).padStart(2, '0')
  return `${n.getFullYear()}.${p(n.getMonth() + 1)}.${p(n.getDate())}`
}

export default function Hero() {
  const ref = useRef(null)
  const panelRef = useRef(null)
  const ctaRef = useRef(null)
  const thumbsRef = useRef(null)
  usePanelShape(ref, panelRef, ctaRef, thumbsRef)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, spring)
  const py = useSpring(my, spring)
  const parallax = useMemo(() => ({ px, py }), [px, py])

  const [activeId, setActiveId] = useState(FILES[0].id)
  const [scan, setScan] = useState(false)
  const [locked, setLocked] = useState(false)
  const onScanChange = useCallback((on) => {
    setScan(on)
    if (on) trackOnce('HeroScan', { page: PRODUCT_ID })
  }, [])
  const onLockChange = useCallback((on) => {
    setLocked(on)
    if (on) trackOnce('HeroScanLock', { page: PRODUCT_ID })
  }, [])
  const date = useMemo(today, [])
  const coarse = useCoarse()

  const active = FILES.find((f) => f.id === activeId)
  const copy = scan ? active.scan : active.surface
  const others = FILES.filter((f) => f.id !== activeId)

  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  const openFile = (id) => {
    setActiveId(id)
    trackOnce(`HeroFile_${id}`, { file: id })
  }

  return (
    <ParallaxContext.Provider value={parallax}>
      <section
        ref={ref}
        className="hero"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-scan={scan ? 'on' : 'off'}
        aria-label="Protocolo Anti-Automático — abertura do dossiê"
      >
        {/* luz ambiente */}
        <Layer depth={-28} className="hero__aura" aria-hidden>
          <span className="aura aura--a" />
          <span className="aura aura--b" />
          <span className="aura aura--c" />
          <span className="aura aura--scan" />
        </Layer>
        <div className="hero__scanlines" aria-hidden />

        <Nav date={date} />

        {/* manchete: duas palavras emoldurando a cabeça do personagem */}
        <Layer depth={-10} className="hero__title-wrap">
          <h1 className="hero__title">
            <span className="hero__title-a">Padrão</span>{' '}
            <span className="hero__title-swap">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={scan ? 'scan' : 'surface'}
                  initial={{ y: '45%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '-45%', opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.35, ease }}
                >
                  {scan ? 'Exposto' : 'Oculto'}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="hero__kicker">
            <span className="hero__kicker-dot" aria-hidden />
            {scan ? 'Varredura em curso' : 'Tem um padrão decidindo por você'}
          </p>
        </Layer>

        <div ref={panelRef} className="hero__panel" aria-hidden />

        <Layer depth={-38} className="dust dust--far" aria-hidden>
          {DUST.filter((d) => !d.near).map((d, i) => <Speck key={i} {...d} />)}
        </Layer>

        {/* bloco de informação */}
        <Layer depth={6} className="hero__info">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-${scan ? 'scan' : 'surface'}`}
              initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease }}
            >
              <span className="pill">
                {scan ? <Scan width={14} height={14} /> : <Doc width={14} height={14} />} {copy.pill}
              </span>
              <h2 className="hero__name">{copy.name}</h2>
              <p className="hero__blurb">{copy.blurb}</p>
            </motion.div>
          </AnimatePresence>
          <div className="hero__buy">
            <span className="hero__price">
              <s>R${PRICE_ANCHOR}</s>R${PRICE}
            </span>
            <a className="btn btn--primary" href={CHECKOUT_URL} onClick={() => trackCheckout('hero-info')}>
              Liberar o Dossiê <Arrow width={16} height={16} />
            </a>
          </div>
          <div className="hero__terms">Acesso imediato · Vitalício · Garantia de 7 dias</div>
        </Layer>

        {/* personagem */}
        <div className="hero__stage">
          <Layer depth={-18} rotate={1.2} tilt={7} className="hero__subject-layer">
            <div className="hero__subject-float">
              <span className="hero__subject-glow" aria-hidden />
              <SubjectScan onScanChange={onScanChange} onLockChange={onLockChange} />
            </div>
          </Layer>
        </div>

        {/* fichas técnicas, cada uma na sua profundidade */}
        <DataChip k="a" spec={copy.chips.a} depth={34} rotate={-2} />
        <DataChip k="b" spec={copy.chips.b} depth={42} rotate={-1.5} />
        <DataChip k="c" spec={copy.chips.c} depth={26} rotate={2} />
        <DataChip k="d" spec={copy.chips.d} depth={30} rotate={2.5} />

        <Layer depth={22} rotate={2} className="hero__hint" aria-hidden>
          <span className={`hint ${scan ? 'is-scan' : ''}`}>
            {scan ? <Scan width={14} height={14} /> : <Eye width={14} height={14} />}
            {locked
              ? coarse ? 'Toque no sujeito para encerrar' : 'Clique no sujeito para encerrar'
              : coarse ? 'Toque no sujeito para a varredura'
              : scan ? 'Varredura ativa · clique para fixar' : 'Passe o cursor sobre o sujeito'}
          </span>
        </Layer>

        <Layer depth={48} className="dust dust--near" aria-hidden>
          {DUST.filter((d) => d.near).map((d, i) => <Speck key={i} {...d} />)}
        </Layer>

        {/* CTA de checkout, no entalhe do painel */}
        <Layer
          ref={ctaRef}
          as="a"
          href={CHECKOUT_URL}
          depth={7}
          rotate={-4}
          className="hero__cta"
          onClick={() => trackCheckout('hero-notch')}
          aria-label={`Liberar o Dossiê por R$${PRICE}`}
        >
          <motion.span className="cta" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }}>
            <span className="cta__ring" aria-hidden />
            <Unlock width={26} height={26} />
            <span className="cta__label">Liberar</span>
            <span className="cta__price">R${PRICE}</span>
          </motion.span>
        </Layer>

        {/* arquivos: protocolo + três fichas documentadas */}
        <Layer ref={thumbsRef} depth={6} className="hero__thumbs">
          {others.map((f) => (
            <motion.button
              layout
              key={f.id}
              type="button"
              className="thumb"
              onClick={() => openFile(f.id)}
              whileHover={{ y: -4, rotate: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label={`Abrir ${f.kind === 'protocol' ? 'o protocolo' : 'a ficha'} ${f.plate}`}
            >
              <FileThumb file={f} />
              <span className="thumb__plate">{f.plate}</span>
            </motion.button>
          ))}
        </Layer>
      </section>
    </ParallaxContext.Provider>
  )
}

function Nav({ date }) {
  return (
    <header className="nav">
      <a className="brand" href="#">
        <Seal className="brand__seal" />
        <span className="brand__text">
          <span className="brand__name">O Dossiê<sup>™</sup></span>
          <small>Divisão de Inteligência Comportamental</small>
        </span>
      </a>
      <nav className="nav__links" aria-label="Seções do dossiê">
        {NAV.map((n) => (
          <a key={n.href} href={n.href}>{n.label}</a>
        ))}
      </nav>
      <div className="nav__actions">
        <span className="nav__id">{PRODUCT_ID} / {date}</span>
        <span className="nav__class">Confidencial</span>
        <button className="icon-btn nav__menu" type="button" aria-label="Menu"><Menu /></button>
      </div>
    </header>
  )
}

function DataChip({ k, spec, depth, rotate }) {
  return (
    <Layer depth={depth} rotate={rotate} className={`chip-wrap chip-wrap--${k}`}>
      <div className="chip">
        <span className="chip__dot" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={spec.value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <span className="chip__label">{spec.label}</span>
            <span className="chip__value">{spec.value}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layer>
  )
}

function Speck({ left, top, size, delay, red }) {
  return (
    <span
      className={`speck ${red ? 'speck--red' : ''}`}
      style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${delay}s` }}
    />
  )
}
