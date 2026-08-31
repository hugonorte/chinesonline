import { Container } from '../Container/Container'
import styles from './LegalHero.module.scss'

export type LegalHeroProps = {
  title: string
  lastUpdated?: string
  className?: string
  id?: string
}

export function LegalHero({ title, lastUpdated, className, id }: LegalHeroProps) {
  return (
    <section
      className={`${styles.legalHero} ${className || ''}`}
      aria-label={title}
      id={id}
    >
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {lastUpdated && <p className={styles.lastUpdated}>Última atualização: {lastUpdated}</p>}
        </div>
      </Container>
    </section>
  )
}
