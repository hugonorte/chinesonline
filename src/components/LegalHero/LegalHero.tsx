import { useI18n } from '../../i18n/i18nContext'
import { Container } from '../Container/Container'
import styles from './LegalHero.module.scss'

export type LegalHeroProps = {
  title: string
  lastUpdated?: string
  lastUpdatedLabel?: string
  className?: string
  id?: string
}

export function LegalHero({ title, lastUpdated, lastUpdatedLabel, className, id }: LegalHeroProps) {
  const { t } = useI18n()
  const label = lastUpdatedLabel || t('privacy.lastUpdatedLabel')

  return (
    <section
      className={`${styles.legalHero} ${className || ''}`}
      aria-label={title}
      id={id}
    >
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {lastUpdated && <p className={styles.lastUpdated}>{label} {lastUpdated}</p>}
        </div>
      </Container>
    </section>
  )
}
