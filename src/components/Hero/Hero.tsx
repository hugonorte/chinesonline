import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/i18nContext'
import { Button } from '../Button/Button'
import styles from './Hero.module.scss'
import layer01 from '../../assets/hero/01.avif'
import layer02 from '../../assets/hero/02.avif'
import layer03 from '../../assets/hero/03.avif'
import layer04 from '../../assets/hero/04.avif'
import layer05 from '../../assets/hero/05.avif'

export type HeroProps = {
  className?: string
}

const LAYERS = [
  { id: 1, src: layer01, parallaxFactor: 0, zIndex: 40 },
  { id: 2, src: layer02, parallaxFactor: 0.2, zIndex: 30 },
  { id: 3, src: layer03, parallaxFactor: 0.4, zIndex: 20 },
  { id: 4, src: layer04, parallaxFactor: 0.6, zIndex: 10 },
  { id: 5, src: layer05, parallaxFactor: 0.8, zIndex: 60 },
]

export function Hero({ className }: HeroProps) {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detecta preferência de redução de movimento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    if (prefersReducedMotion) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={containerRef}
      className={`${styles.hero} ${className || ''}`}
      aria-label={t('hero.heroSection')}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ChinesOnline',
            description: t('hero.description'),
            url: 'https://chinesonline.com.br',
            applicationCategory: 'EducationalApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'BRL',
              description: 'Versão Lite gratuita',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '1200',
            },
          }),
        }}
      />

      {/* Background paralaxo com imagens decorativas */}
      <div className={styles.parallaxContainer} aria-hidden="true">
        {LAYERS.map((layer) => (
          <div
            key={layer.id}
            className={styles.layer}
            data-layer-id={layer.id}
            style={{
              transform: prefersReducedMotion
                ? 'none'
                : `translateY(${scrollY * layer.parallaxFactor}px)`,
              zIndex: layer.zIndex,
            }}
          >
            <img
              src={layer.src}
              alt=""
              className={styles.layerImage}
              loading={layer.id === 1 ? 'eager' : 'lazy'}
              decoding={layer.id === 1 ? 'auto' : 'async'}
              aria-hidden="true"
            />
          </div>
        ))}
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      <div className={styles.background} aria-hidden="true" />

      {/* Conteúdo semântico do hero */}
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          {/* Título principal como H1 — hierarquia clara */}
          <h1 className={styles.heroTitle} itemProp="headline">
            {t('hero.title')}
            <br />
            <span className={styles.heroSubtitle}>{t('hero.subtitle')}</span>
          </h1>

          {/* Subtítulo com proposição de valor */}
          <p className={styles.heroDescription} itemProp="description">
            {t('hero.description')}
          </p>

          {/* CTAs com acessibilidade */}
          <nav className={styles.buttons} aria-label={t('hero.mainActions')}>
            <Button
              href="#features"
              variant="secondary"
              aria-label={t('hero.learnMoreAriaLabel')}
            >
              {t('hero.learnMore')}
            </Button>
            <Button
              href="#download"
              variant="primary"
              aria-label={t('hero.downloadAriaLabel')}
            >
              {t('hero.downloadNow')}
            </Button>
          </nav>
        </div>
      </div>

      {/* Indicador visual de scroll — acessível */}
      <div className={styles.scrollIndicator} aria-hidden="true" role="img" aria-label={t('hero.scrollIndicator')}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
