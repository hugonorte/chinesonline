import styles from './Features.module.scss'

type Feature = {
  id: string
  label: string
  title: string
  description: string
  icon: React.ReactNode
}

const GameplayIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>

    {/* Joystick principal */}
    <g filter="url(#neonGlow)">
      {/* Base quadrada */}
      <rect x="40" y="55" width="40" height="15" rx="2" fill="none" stroke="#60A5FA" strokeWidth="1.5" />

      {/* Pino central */}
      <circle cx="60" cy="55" r="4" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <line x1="60" y1="51" x2="60" y2="35" stroke="#60A5FA" strokeWidth="1.5" />

      {/* Cabeça do joystick */}
      <circle cx="60" cy="32" r="6" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <circle cx="60" cy="32" r="3" fill="#60A5FA" opacity="0.5" />
    </g>

    {/* Pontos decorativos */}
    <circle cx="35" cy="45" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="45" cy="28" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="75" cy="32" r="1.5" fill="#60A5FA" opacity="0.6" />
    <circle cx="85" cy="50" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="80" cy="75" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="40" cy="85" r="1" fill="#60A5FA" opacity="0.5" />
  </svg>
)

const AlgorithmIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="algoGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#5ab7c4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#308894" stopOpacity="0.4" />
      </radialGradient>
      <filter id="algoGlow">
        <feGaussianBlur result="blur" stdDeviation="2.5" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="60" cy="60" r="35" fill="url(#algoGrad)" opacity="0.3" />
    <circle cx="60" cy="60" r="28" fill="none" stroke="rgba(53, 164, 179, 0.4)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="18" fill="none" stroke="rgba(53, 164, 179, 0.5)" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="8" fill="#5ab7c4" filter="url(#algoGlow)" />
    <circle cx="85" cy="40" r="3" fill="#3da4b3" filter="url(#algoGlow)" opacity="0.8" />
    <circle cx="35" cy="50" r="2" fill="#5ab7c4" opacity="0.6" />
    <circle cx="70" cy="85" r="2.5" fill="#3da4b3" filter="url(#algoGlow)" />
    <path d="M 60 52 L 85 40 M 60 68 L 35 50 M 60 60 L 70 85" stroke="rgba(93, 183, 196, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
  </svg>
)

const VersionsIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="diamondGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>

    {/* Diamante principal */}
    <g filter="url(#diamondGlow)">
      <path d="M 60 25 L 85 50 L 75 85 L 45 85 L 35 50 Z" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Facetas internas do diamante */}
      <path d="M 60 25 L 60 55" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 85 50 L 60 55" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 35 50 L 60 55" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 60 55 L 45 85" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <path d="M 60 55 L 75 85" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
    </g>

    {/* Pontos decorativos */}
    <circle cx="60" cy="20" r="1.5" fill="#60A5FA" opacity="0.8" />
    <circle cx="92" cy="45" r="1" fill="#60A5FA" opacity="0.6" />
    <circle cx="28" cy="48" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="75" cy="95" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="45" cy="95" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="60" cy="65" r="1.5" fill="#60A5FA" opacity="0.6" />
  </svg>
)

const AudioIcon = () => (
  <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>

    {/* Onda sonora principal */}
    <g filter="url(#waveGlow)">
      <path d="M 30 60 Q 35 45 40 60 T 50 60 T 60 60 T 70 60 T 80 60 T 90 60" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Ondas secundárias */}
      <path d="M 25 60 Q 30 35 35 60 T 45 60 T 55 60 T 65 60 T 75 60 T 85 60 T 95 60" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 35 60 Q 40 50 45 60 T 55 60 T 65 60 T 75 60 T 85 60" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </g>

    {/* Pontos decorativos */}
    <circle cx="28" cy="50" r="1" fill="#60A5FA" opacity="0.6" />
    <circle cx="42" cy="35" r="1.5" fill="#60A5FA" opacity="0.8" />
    <circle cx="60" cy="25" r="1" fill="#60A5FA" opacity="0.5" />
    <circle cx="78" cy="40" r="1.5" fill="#60A5FA" opacity="0.7" />
    <circle cx="92" cy="55" r="1" fill="#60A5FA" opacity="0.6" />
    <circle cx="50" cy="85" r="1.5" fill="#60A5FA" opacity="0.6" />
  </svg>
)

const FEATURES: Feature[] = [
  {
    id: 'gameplay',
    label: 'Gamificação',
    title: 'Aprenda Jogando',
    description: 'Transformamos o aprendizado de caracteres chineses em um jogo envolvente. Cada sessão é curta, divertida e viciante.',
    icon: <GameplayIcon />,
  },
  {
    id: 'algorithm',
    label: 'Neurociência',
    title: 'Algoritmo Otimizado',
    description: 'Usa repetição espaçada e curva do esquecimento para garantir que os caracteres ficam na memória para sempre.',
    icon: <AlgorithmIcon />,
  },
  {
    id: 'versions',
    label: 'Flexibilidade',
    title: 'Lite e Premium',
    description: 'Comece gratuitamente com a versão Lite. Evolua para Premium e desbloqueie mais características e conteúdo exclusivo.',
    icon: <VersionsIcon />,
  },
  {
    id: 'audio',
    label: 'Pronúncia',
    title: 'Áudio Nativo',
    description: 'Cada caractere vem acompanhado de áudio falado por falantes chineses. Aprenda a pronunciar corretamente.',
    icon: <AudioIcon />,
  },
]

export type FeaturesProps = {
  className?: string
}

export function Features({ className }: FeaturesProps) {
  return (
    <section className={`${styles.features} ${className || ''}`}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            
            <h2 className={styles.title}>
              Aprenda caracteres chineses com uma abordagem
              <br />
              que realmente funciona
            </h2>
          </div>
        </header>

        {/* Features Grid */}
        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <article key={feature.id} className={styles.card}>
              <div className={styles.cardBorder} />
              <div className={styles.cardGradientLine} />

              <div className={styles.iconContainer}>
                <div className={styles.iconGlow} />
                <div className={styles.icon} role="img" aria-label={feature.title}>
                  {feature.icon}
                </div>
              </div>

              <span className={styles.label}>{feature.label}</span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
