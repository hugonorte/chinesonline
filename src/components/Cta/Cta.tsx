import { StoreBadge, StoreSoon } from '../StoreBadge/StoreBadge'
import styles from './Cta.module.scss'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

export type CtaProps = {
  className?: string
}

export function Cta({ className }: CtaProps) {
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
            description: 'Aprenda caracteres chineses jogando com repetição espaçada baseada em neurociência.',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Android',
            downloadUrl: PLAY_STORE_URL,
            offers: [
              {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'BRL',
                name: 'Versão Lite',
              },
              {
                '@type': 'Offer',
                price: '19.00',
                priceCurrency: 'USD',
                name: 'Versão Premium',
              },
            ],
          }),
        }}
      />

      <div className={styles.container}>
        {/* Conteúdo motivacional */}
        <header className={styles.header}>
          <h2 className={styles.heading} id="cta-heading" itemProp="headline">
            Comece sua jornada no aprendizado de mandarim hoje
          </h2>
          <p className={styles.description} itemProp="description">
            Baixe agora o ChinesOnline e acesse a versão Lite gratuitamente. Decore seus primeiros caracteres em minutos
            e suba de nível com nossa tecnologia de repetição espaçada.
          </p>
        </header>

        {/* Badges de download oficiais */}
        <div className={styles.downloadsContainer} role="region" aria-labelledby="cta-heading">
          {/* Google Play — Logo oficial e linkável */}
          <StoreBadge href={PLAY_STORE_URL} size="md" className={styles.googlePlayBadge} />

          {/* Apple App Store — Em breve */}
          <StoreSoon>
            <span className={styles.soonText}>Disponível em breve na App Store</span>
          </StoreSoon>
        </div>

        {/* Nota informativa */}
        <div className={styles.disclaimer}>
          <p>
            Versão Android disponível para dispositivos com Android 8.0 ou superior. A versão iOS está em
            desenvolvimento.
          </p>
        </div>
      </div>
    </section>
  )
}
