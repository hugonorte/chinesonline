import { useI18n } from '../../i18n/i18nContext'
import { StoreBadge, StoreSoon } from '../StoreBadge/StoreBadge'
import styles from './Cta.module.scss'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

export type CtaProps = {
  className?: string
}

export function Cta({ className }: CtaProps) {
  const { t } = useI18n()

  return (
    <section
      className={`${styles.cta} ${className || ''}`}
      id="download"
      aria-labelledby="cta-heading"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ChinesOnline',
            description: t('hero.description'),
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Android',
            downloadUrl: PLAY_STORE_URL,
            offers: [
              {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
                name: t('cta.versaoLite'),
              },
              {
                '@type': 'Offer',
                price: '19.00',
                priceCurrency: 'USD',
                name: t('cta.versaoPremium'),
              },
            ],
          }),
        }}
      />

      <div className={styles.container}>
        {/* Conteúdo motivacional */}
        <header className={styles.header}>
          <h2 className={styles.heading} id="cta-heading" itemProp="headline">
            {t('cta.title')}
          </h2>
          <p className={styles.description} itemProp="description">
            {t('cta.description')}
          </p>
        </header>

        {/* Badges de download oficiais */}
        <div className={styles.downloadsContainer} role="region" aria-labelledby="cta-heading">
          {/* Google Play — Logo oficial e linkável */}
          <StoreBadge href={PLAY_STORE_URL} size="md" className={styles.googlePlayBadge} />

          {/* Apple App Store — Em breve */}
          <StoreSoon>
            <span className={styles.soonText}>{t('cta.comingSoonAppStore')}</span>
          </StoreSoon>
        </div>

        {/* Nota informativa */}
        <div className={styles.disclaimer}>
          <p>{t('cta.disclaimer')}</p>
        </div>
      </div>
    </section>
  )
}
