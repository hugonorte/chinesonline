import { useI18n } from '../../i18n/i18nContext'
import styles from './Features.module.scss'

type Feature = {
  id: string
  labelKey?: string
  titleKey?: string
  descriptionKey?: string
  label?: string
  title?: string
  description?: string
  icon: React.ReactNode
}

/**
 * Icons com IDs únicos para evitar colisão de filters SVG em múltiplas instâncias
 */
const GameplayIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <filter id="neonGlow-gameplay" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>
    <g filter="url(#neonGlow-gameplay)">
      <rect x="40" y="55" width="40" height="15" rx="2" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="60" cy="55" r="4" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <line x1="60" y1="51" x2="60" y2="35" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="60" cy="32" r="6" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="60" cy="32" r="3" fill="#60A5FA" opacity="0.5" />
    </g>
    <circle cx="35" cy="45" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="45" cy="28" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="75" cy="32" r="1.5" fill="#60A5FA" opacity="0.6" />
    <circle cx="85" cy="50" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="80" cy="75" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="40" cy="85" r="1" fill="#60A5FA" opacity="0.5" />
  </svg>
)

const AlgorithmIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="algoGrad-algorithm" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#5ab7c4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#308894" stopOpacity="0.4" />
      </radialGradient>
      <filter id="algoGlow-algorithm">
        <feGaussianBlur result="blur" stdDeviation="2.5" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="60" cy="60" r="35" fill="url(#algoGrad-algorithm)" opacity="0.3" />
    <circle cx="60" cy="60" r="28" fill="none" stroke="rgba(53, 164, 179, 0.4)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="18" fill="none" stroke="rgba(53, 164, 179, 0.5)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="8" fill="#5ab7c4" filter="url(#algoGlow-algorithm)" />
    <circle cx="85" cy="40" r="3" fill="#3da4b3" filter="url(#algoGlow-algorithm)" opacity="0.8" />
    <circle cx="35" cy="50" r="2" fill="#5ab7c4" opacity="0.6" />
    <circle cx="70" cy="85" r="2.5" fill="#3da4b3" filter="url(#algoGlow-algorithm)" />
    <path d="M 60 52 L 85 40 M 60 68 L 35 50 M 60 60 L 70 85" stroke="rgba(93, 183, 196, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
  </svg>
)

const VersionsIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <filter id="diamondGlow-versions" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>
    <g filter="url(#diamondGlow-versions)">
      <path d="M 60 25 L 85 50 L 75 85 L 45 85 L 35 50 Z" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 60 25 L 60 55" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 85 50 L 60 55" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 35 50 L 60 55" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 60 55 L 45 85" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 60 55 L 75 85" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
    </g>
    <circle cx="60" cy="20" r="1.5" fill="#60A5FA" opacity="0.8" />
    <circle cx="92" cy="45" r="1" fill="#60A5FA" opacity="0.6" />
    <circle cx="28" cy="48" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="75" cy="95" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="45" cy="95" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="60" cy="65" r="1.5" fill="#60A5FA" opacity="0.6" />
  </svg>
)

const AudioIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <filter id="waveGlow-audio" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>
    <g filter="url(#waveGlow-audio)">
      <path d="M 30 60 Q 35 45 40 60 T 50 60 T 60 60 T 70 60 T 80 60 T 90 60" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 25 60 Q 30 35 35 60 T 45 60 T 55 60 T 65 60 T 75 60 T 85 60 T 95 60" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 35 60 Q 40 50 45 60 T 55 60 T 65 60 T 75 60 T 85 60" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </g>
    <circle cx="28" cy="50" r="1" fill="#60A5FA" opacity="0.6" />
    <circle cx="42" cy="35" r="1.5" fill="#60A5FA" opacity="0.8" />
    <circle cx="60" cy="25" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="78" cy="40" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="92" cy="55" r="1" fill="#60A5FA" opacity="0.6" />
    <circle cx="50" cy="85" r="1.5" fill="#60A5FA" opacity="0.6" />
  </svg>
)

const FEATURES_CONFIG: Array<{ id: string; titleKey: string; descriptionKey: string; icon: React.ReactNode }> = [
  {
    id: 'gameplay',
    titleKey: 'features.gameification',
    descriptionKey: 'features.gameificationDesc',
    icon: <GameplayIcon />,
  },
  {
    id: 'algorithm',
    titleKey: 'features.spacedRepetition',
    descriptionKey: 'features.spacedRepetitionDesc',
    icon: <AlgorithmIcon />,
  },
  {
    id: 'versions',
    titleKey: 'features.customCharacters',
    descriptionKey: 'features.customCharactersDesc',
    icon: <VersionsIcon />,
  },
  {
    id: 'audio',
    titleKey: 'features.nativePronunciation',
    descriptionKey: 'features.nativePronunciationDesc',
    icon: <AudioIcon />,
  },
]

export type FeaturesProps = {
  className?: string
}

export function Features({ className }: FeaturesProps) {
  const { t } = useI18n()

  const FEATURES: Feature[] = FEATURES_CONFIG.map((config) => ({
    ...config,
    label: t(config.titleKey),
    title: t(config.titleKey),
    description: t(config.descriptionKey),
  }))

  return (
    <section
      className={`${styles.features} ${className || ''}`}
      id="features"
      aria-labelledby="features-heading"
      itemScope
      itemType="https://schema.org/Collection"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t('features.title'),
            description: t('features.subtitle'),
            itemListElement: FEATURES.map((feature, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: feature.title,
              description: feature.description,
              item: {
                '@type': 'Thing',
                name: feature.title,
                category: feature.label,
              },
            })),
          }),
        }}
      />

      <div className={styles.container}>
        {/* Cabeçalho semântico com contexto claro */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title} id="features-heading" itemProp="name">
              {t('features.title')}
              <br />
              {t('features.subtitle')}
            </h2>
            <p className={styles.subtitle} itemProp="description">
              {t('features.subtitle')}
            </p>
          </div>
        </header>

        {/* Grid semântico de funcionalidades */}
        <div
          className={styles.grid}
          role="region"
          aria-labelledby="features-heading"
          itemProp="itemListElement"
        >
          {FEATURES.map((feature, index) => (
            <article
              key={feature.id}
              className={styles.card}
              itemScope
              itemType="https://schema.org/Thing"
              itemProp="item"
              role="listitem"
            >
              <div className={styles.cardBorder} aria-hidden="true" />
              <div className={styles.cardGradientLine} aria-hidden="true" />

              {/* Ícone com acessibilidade */}
              <div className={styles.iconContainer} aria-hidden="true">
                <div className={styles.iconGlow} aria-hidden="true" />
                <div className={styles.icon} role="img" aria-label={`Ícone: ${feature.title}`}>
                  {feature.icon}
                </div>
              </div>

              {/* Label de categoria */}
              <span className={styles.label} itemProp="category">
                {feature.label}
              </span>

              {/* Título da funcionalidade */}
              <h3 className={styles.cardTitle} itemProp="name">
                {feature.title}
              </h3>

              {/* Descrição da funcionalidade */}
              <p className={styles.cardDescription} itemProp="description">
                {feature.description}
              </p>

              {/* Metadata para schema */}
              <meta itemProp="position" content={String(index + 1)} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
