/** Miniatura de arquivo: foto de fichamento (casos) ou pasta (protocolo). Arte 100% vetorial. */
export default function FileThumb({ file }) {
  if (file.kind === 'protocol') {
    return (
      <svg className="thumb__art" viewBox="0 0 100 100" aria-hidden>
        <rect width="100" height="100" fill="#121217" />
        <g transform="translate(50 54) rotate(-7)">
          <path d="M-34 -20 H-12 L-8 -26 H8 L12 -20 H34 V26 H-34 Z" fill="#b89c68" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="-28" y="-30" width="54" height="34" fill="#f4efe4" stroke="#000" strokeWidth="2" transform="rotate(5)" />
          <rect x="-34" y="-10" width="68" height="36" fill="#d9c49a" stroke="#000" strokeWidth="2.5" />
          <rect x="-28" y="-3" width="36" height="3" fill="#1a1712" />
          <rect x="-28" y="4" width="26" height="3" fill="#1a1712" />
          <g transform="translate(6 15) rotate(-12)">
            <rect x="-22" y="-6" width="44" height="12" rx="1.5" fill="none" stroke="#2ee8c8" strokeWidth="2" />
            <text x="0" y="3" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="6.4" fontWeight="700" fill="#2ee8c8" letterSpacing=".6">CONFIDENCIAL</text>
          </g>
        </g>
      </svg>
    )
  }
  return (
    <svg className="thumb__art" viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`mug-${file.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1c22" />
          <stop offset="1" stopColor="#0c0c10" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#mug-${file.id})`} />
      {/* régua de altura */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="0" x2="100" y1={8 + i * 11} y2={8 + i * 11} stroke="#fff" strokeOpacity={i % 3 === 0 ? 0.16 : 0.07} strokeWidth={i % 3 === 0 ? 1.2 : 0.6} />
      ))}
      {/* silhueta */}
      <g fill="#050507">
        <circle cx="50" cy="44" r="15" />
        <path d="M50 61c-6 0-10-2-12-4-2 3-3 6-4 7-11 3-17 10-19 36h70c-2-26-8-33-19-36-1-1-2-4-4-7-2 2-6 4-12 4z" />
      </g>
      <path d="M38 41h24" stroke="#2ee8c8" strokeWidth="3" />
    </svg>
  )
}
