import styles from './Features.module.scss'

type Feature = {
  id: string
  label: string
  title: string
  description: string
  icon: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    id: 'gameplay',
    label: 'Gamificação',
    title: 'Aprenda Jogando',
    description: 'Transformamos o aprendizado de caracteres chineses em um jogo envolvente. Cada sessão é curta, divertida e viciante.',
    icon: '🎮',
  },
  {
    id: 'algorithm',
    label: 'Neurociência',
    title: 'Algoritmo Otimizado',
    description: 'Usa repetição espaçada e curva do esquecimento para garantir que os caracteres ficam na memória para sempre.',
    icon: '🧠',
  },
  {
    id: 'versions',
    label: 'Flexibilidade',
    title: 'Lite e Premium',
    description: 'Comece gratuitamente com a versão Lite. Evolua para Premium e desbloqueie mais características e conteúdo exclusivo.',
    icon: '💎',
  },
  {
    id: 'audio',
    label: 'Pronúncia',
    title: 'Áudio Nativo',
    description: 'Cada caractere vem acompanhado de áudio falado por falantes chineses. Aprenda a pronunciar corretamente.',
    icon: '🔊',
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
