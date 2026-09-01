import { useI18n } from '../i18n/i18nContext'
import { Header } from '../components/Header/Header'
import { LegalHero } from '../components/LegalHero/LegalHero'
import { Footer } from '../components/Footer/Footer'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { LegalContent } from '../components/LegalContent/LegalContent'
import { Container } from '../components/Container/Container'
import styles from './Legal.module.scss'

export function Terms() {
  const { t } = useI18n()

  return (
    <>
      <Header brand={<LogoBrand />} />

      <LegalHero
        id="termos-de-uso"
        title={t('terms.title')}
        lastUpdated={t('terms.lastUpdated')}
        lastUpdatedLabel={t('terms.lastUpdatedLabel')}
      />

      <main className={styles.legalContent}>
        <Container>
          <LegalContent type="terms" />
        </Container>
      </main>

      <Footer />
    </>
  )
}
