import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/i18nContext'
import styles from './Screenshots.module.scss'
import loginImg from '../../assets/screenshots/login.webp'
import quizImg from '../../assets/screenshots/quiz.webp'

const SCREENSHOTS_CONFIG: Array<{ id: string; titleKey: string; subtitleKey: string; image: string }> = [
  { id: 'login', titleKey: 'screenshots.screenshot1Title', subtitleKey: 'screenshots.screenshot1Subtitle', image: loginImg },
  { id: 'quiz', titleKey: 'screenshots.screenshot2Title', subtitleKey: 'screenshots.screenshot2Subtitle', image: quizImg },
]

export type ScreenshotsProps = {
  className?: string
}

/** Quanto o visual se desloca em relação ao scroll, e o teto desse deslocamento. */
const PARALLAX_FACTOR = 0.5
const PARALLAX_MAX_PX = 28

export function Screenshots({ className }: ScreenshotsProps) {
  const { t } = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0)
  const visualRef = useRef<HTMLDivElement>(null)
  const [parallaxY, setParallaxY] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const SCREENSHOTS = SCREENSHOTS_CONFIG.map((item) => ({
    ...item,
    title: t(item.titleKey),
    subtitle: t(item.subtitleKey),
  }))

  /**
   * Parallax discreto: mede a distância do centro do visual até o centro da
   * viewport e converte num deslocamento pequeno e limitado. O movimento
   * constante de flutuação fica por conta do CSS (animation: floatPhone).
   */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    let frame = 0

    const update = () => {
      frame = 0
      const el = visualRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const distanceFromCenter = window.innerHeight / 2 - (rect.top + rect.height / 2)
      const offset = (distanceFromCenter / window.innerHeight) * PARALLAX_FACTOR * PARALLAX_MAX_PX * 2

      setParallaxY(Math.max(-PARALLAX_MAX_PX, Math.min(PARALLAX_MAX_PX, offset)))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /**
   * Suporta navegação por teclado: ArrowLeft (anterior), ArrowRight (próxima)
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SCREENSHOTS.length)
  }

  const current = SCREENSHOTS[currentIndex]

  return (
    <section
      className={`${styles.screenshots} ${className || ''}`}
      id="screenshots"
      aria-label="Interface do aplicativo ChinesOnline"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Interface do Aplicativo ChinesOnline',
            description:
              'Galeria de telas do app ChinesOnline demonstrando autenticação, aprendizado gamificado e pronúncia nativa de caracteres chineses.',
            image: current.image,
            associatedMedia: SCREENSHOTS.map((item) => ({
              '@type': 'MediaObject',
              name: item.title,
              url: item.image,
            })),
          }),
        }}
      />

      <div className={styles.container}>
        {/* Cabeçalho semântico com título e propósito da seção */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>{t('screenshots.title')}</h2>
            <p className={styles.subtitle}>{t('screenshots.subtitle')}</p>
          </div>
        </header>

        {/* Palco com carrossel de imagens — estrutura semântica para screenshot viewer */}
        <div className={styles.stage} role="region" aria-label="Carrossel de screenshots do aplicativo">
          <button
            type="button"
            className={`${styles.navButton} ${styles.navPrev}`}
            onClick={goToPrevious}
            aria-label={`Ver screenshot anterior: ${SCREENSHOTS[(currentIndex - 1 + SCREENSHOTS.length) % SCREENSHOTS.length]?.title || 'screenshot'}`}
            aria-controls="carousel-region"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className={styles.carousel} ref={carouselRef} id="carousel-region" role="tablist">
            {/* Card de texto — sobreposto, contextualiza o screenshot */}
            <article
              className={styles.card}
              key={current.id}
              aria-labelledby={`screenshot-title-${currentIndex}`}
              role="tabpanel"
              aria-hidden="false"
            >
              <div className={styles.cardGlow} aria-hidden="true" />

              {/* Subtítulo como context/eyebrow */}
              <p className={styles.cardEyebrow}>{current.subtitle}</p>

              {/* Rodapé com título e navegação */}
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle} id={`screenshot-title-${currentIndex}`}>
                  {current.title}
                </h3>

                {/* Indicadores como abas — mais semântico para carrossel */}
                <nav className={styles.indicators} aria-label="Navegação entre screenshots">
                  {SCREENSHOTS.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Ver ${item.title}: ${item.subtitle}`}
                      aria-selected={index === currentIndex}
                      aria-controls="carousel-region"
                      role="tab"
                    />
                  ))}
                </nav>
              </div>
            </article>

            {/* Visual — telefone flutuando mostrando a screenshot */}
            <div
              className={styles.visual}
              ref={visualRef}
              style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
              aria-hidden="false"
            >
              <div className={styles.visualGlows} aria-hidden="true">
                <span className={styles.glowBlob1} />
                <span className={styles.glowBlob2} />
              </div>

              {/* Mockup de telefone com screenshot */}
              <figure className={styles.phoneMockup} role="img" aria-label={`Telefone exibindo: ${current.title || ''}`}>
                <div className={styles.phoneNotch} aria-hidden="true" />
                <div className={styles.phoneScreen}>
                  <img
                    src={current.image}
                    alt={`Screenshot do ${(current.title || '').toLowerCase()}: ${(current.subtitle || '').toLowerCase()}`}
                    className={styles.phoneImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.phoneFrame} aria-hidden="true" />

                {/* Badge de status — visual indicator */}
                <figcaption className={styles.visualBadge}>
                  <i className={styles.visualBadgeDot} aria-hidden="true" />
                  <span>{current.id === 'login' ? 'Tela de acesso' : 'Tela de quiz'}</span>
                </figcaption>
              </figure>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={goToNext}
            aria-label={`Ver próximo screenshot: ${SCREENSHOTS[(currentIndex + 1) % SCREENSHOTS.length]?.title || 'screenshot'}`}
            aria-controls="carousel-region"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
