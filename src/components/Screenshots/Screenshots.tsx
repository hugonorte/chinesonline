import { useEffect, useRef, useState } from 'react'
import styles from './Screenshots.module.scss'
import loginImg from '../../assets/screenshots/login.webp'
import quizImg from '../../assets/screenshots/quiz.webp'

type ScreenshotItem = {
  id: string
  title: string
  subtitle: string
  badge: string
  image: string
  description: string
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'login',
    title: 'Comece sua jornada',
    subtitle: 'Acesso rápido e seguro',
    badge: 'Tela de acesso',
    image: loginImg,
    description:
      'Autenticação inteligente com suporte para múltiplos idiomas. Escolha entre espanhol ou inglês ao iniciar.',
  },
  {
    id: 'quiz',
    title: 'Aprenda jogando',
    subtitle: 'Quiz interativo e envolvente',
    badge: 'Tela de quiz',
    image: quizImg,
    description:
      'Responda perguntas sobre caracteres chineses de forma divertida. Ganhe XP e suba de nível.',
  },
]

export type ScreenshotsProps = {
  className?: string
}

/** Quanto o visual se desloca em relação ao scroll, e o teto desse deslocamento. */
const PARALLAX_FACTOR = 0.5
const PARALLAX_MAX_PX = 28

export function Screenshots({ className }: ScreenshotsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visualRef = useRef<HTMLDivElement>(null)
  const [parallaxY, setParallaxY] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

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
              description: item.description,
              url: item.image,
            })),
          }),
        }}
      />

      <div className={styles.container}>
        {/* Cabeçalho semântico com título e propósito da seção */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h2 className={styles.title}>Interface Intuitiva. Experiência Imersiva.</h2>
            <p className={styles.subtitle}>
              Descubra como o ChinesOnline transforma o aprendizado em uma experiência
              divertida e envolvente. Cada tela foi projetada para maximizar seu aprendizado.
            </p>
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

              {/* Descrição principal — SEO-friendly */}
              <p className={styles.cardDescription}>{current.description}</p>

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
              <figure className={styles.phoneMockup} role="img" aria-label={`Telefone exibindo: ${current.title}`}>
                <div className={styles.phoneNotch} aria-hidden="true" />
                <div className={styles.phoneScreen}>
                  <img
                    src={current.image}
                    alt={`Screenshot do ${current.title.toLowerCase()}: ${current.subtitle.toLowerCase()}`}
                    className={styles.phoneImage}
                    loading="lazy"
                  />
                </div>
                <div className={styles.phoneFrame} aria-hidden="true" />

                {/* Badge de status — visual indicator */}
                <figcaption className={styles.visualBadge}>
                  <i className={styles.visualBadgeDot} aria-hidden="true" />
                  <span>{current.badge}</span>
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
