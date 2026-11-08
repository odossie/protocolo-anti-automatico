const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

/** Olho-selo da marca. */
export const Seal = (p) => (
  <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden {...p}>
    <path d="M6 32c6.5-11 15.2-16.5 26-16.5S51.5 21 58 32c-6.5 11-15.2 16.5-26 16.5S12.5 43 6 32Z" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="32" cy="32" r="8" fill="var(--accent)" />
  </svg>
)
export const Arrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Menu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
)
export const Unlock = (p) => (
  <svg {...base} {...p}><rect x="5" y="11" width="14" height="10" rx="1.5" /><path d="M8 11V7.5a4 4 0 0 1 7.6-1.7" /><path d="M12 15v2" /></svg>
)
export const Scan = (p) => (
  <svg {...base} {...p}><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" /><path d="M4 12h16" /></svg>
)
export const Eye = (p) => (
  <svg {...base} {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const Doc = (p) => (
  <svg {...base} {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></svg>
)
