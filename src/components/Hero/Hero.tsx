import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.scss'
import layer01 from '../../assets/hero/01.avif'
import layer02 from '../../assets/hero/02.avif'
import layer03 from '../../assets/hero/03.avif'
import layer04 from '../../assets/hero/04.avif'

export type HeroProps = {
  className?: string
}

const LAYERS = [
  { id: 1, src: layer01, parallaxFactor: 0, zIndex: 40 },
  { id: 2, src: layer02, parallaxFactor: 0.2, zIndex: 30 },
  { id: 3, src: layer03, parallaxFactor: 0.4, zIndex: 20 },
  { id: 4, src: layer04, parallaxFactor: 0.6, zIndex: 10 },
]

export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className={`${styles.hero} ${className || ''}`}>
      <div className={styles.parallaxContainer}>
        {LAYERS.map((layer) => (
          <div
            key={layer.id}
            className={styles.layer}
            style={{
              transform: `translateY(${scrollY * layer.parallaxFactor}px)`,
              zIndex: layer.zIndex,
            }}
          >
            <img
              src={layer.src}
              alt=""
              className={styles.layerImage}
              loading={layer.id === 1 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>
      <div className={styles.background} />
    </div>
  )
}
