import { useI18n } from '../i18n/i18nContext'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { Container } from '../components/Container/Container'
import { Card } from '../components/Card/Card'
import { Text } from '../components/Text/Text'
import styles from './Legal.module.scss'

export function DeleteAccount() {
  const { t } = useI18n()

  return (
    <>
      <Header brand={<LogoBrand />} />

      <main className={styles.legalContent}>
        <Container>
          <div className={styles.article} style={{ marginTop: '2rem' }}>
            <Card padding="lg">
              <div className={styles.section}>
                <h2>{t('deleteAccount.title')}</h2>
                <Text measure>
                  {t('deleteAccount.descriptionPart1')}
                  <a href="mailto:support@mail.chinesonline.com.br" className={styles.link}>
                    support@mail.chinesonline.com.br
                  </a>
                  {t('deleteAccount.descriptionPart2')}
                </Text>
              </div>
            </Card>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  )
}
