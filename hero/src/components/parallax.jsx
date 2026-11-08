import { createContext, useContext } from 'react'
import { motion, useTransform } from 'framer-motion'

export const ParallaxContext = createContext(null)

/**
 * Camada que deriva com o ponteiro. `depth` é o deslocamento máximo em px
 * (negativo = contra o cursor), `rotate` a inclinação máxima em graus.
 * Não ponha transform CSS no mesmo elemento: o framer-motion é dono de `transform`.
 * `as` troca o elemento (ex.: 'a' para o CTA, que é link de checkout).
 */
export function Layer({ depth = 10, rotate = 0, tilt = 0, as = 'div', className, style, children, ...rest }) {
  const { px, py } = useContext(ParallaxContext)
  const x = useTransform(px, (v) => v * depth)
  const y = useTransform(py, (v) => v * depth)
  const rotateZ = useTransform(px, (v) => v * rotate)
  const rotateY = useTransform(px, (v) => v * tilt)
  const rotateX = useTransform(py, (v) => -v * tilt * 0.6)
  const Tag = motion[as]

  return (
    <Tag className={className} style={{ x, y, rotateZ, rotateY, rotateX, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
