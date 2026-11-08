import { PRICE } from './data.js'

/* Wrapper do Meta Pixel — nunca lança se o pixel estiver bloqueado. */
function fbq(...args) {
  try {
    if (typeof window.fbq === 'function') window.fbq(...args)
  } catch {
    /* pixel ausente ou bloqueado: a navegação segue */
  }
}

let lastCheckout = 0

/** InitiateCheckout com dedupe de 800 ms (duplo clique não conta duas vezes). */
export function trackCheckout(source) {
  const now = Date.now()
  if (now - lastCheckout < 800) return
  lastCheckout = now
  fbq('track', 'InitiateCheckout', { value: PRICE, currency: 'BRL', content_name: source })
}

/** Eventos próprios — mesma proteção. Disparados uma vez por sessão. */
const fired = new Set()
export function trackOnce(event, params) {
  if (fired.has(event)) return
  fired.add(event)
  fbq('trackCustom', event, params)
}
