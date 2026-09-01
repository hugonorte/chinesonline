import { useI18n } from '../i18n/i18nContext'
import { Header } from '../components/Header/Header'
import { LegalHero } from '../components/LegalHero/LegalHero'
import { Footer } from '../components/Footer/Footer'
import { ContactForm } from '../components/ContactForm/ContactForm'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { Container } from '../components/Container/Container'
import styles from './Contact.module.scss'

export function Contact() {
  const { t } = useI18n()

  return (
    <>
      <Header brand={<LogoBrand />} />

      <LegalHero
        id="contact"
        title={t('contact.title')}
        lastUpdated={undefined}
      />

      <main className={styles.contactPage}>
        <Container>
          <div className={styles.content}>
            {/* Left column - Info */}
            <section className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>{t('contact.letsTalk')}</h2>
              <p className={styles.sectionDescription}>{t('contact.description')}</p>

              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <h3 className={styles.infoTitle}>{t('contact.email')}</h3>
                  <a href="mailto:support@mail.chinesonline.com.br" className={styles.infoLink}>
                    {t('contact.supportEmail')}
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <h3 className={styles.infoTitle}>{t('contact.socialNetworks')}</h3>
                  <div className={styles.socialLinks}>
                    <a href="https://twitter.com/chinesonline" className={styles.socialLink} aria-label="Twitter/X">
                      Twitter/X
                    </a>
                    <a href="https://instagram.com/chinesonline" className={styles.socialLink} aria-label="Instagram">
                      Instagram
                    </a>
                    <a href="https://facebook.com/chinesonline" className={styles.socialLink} aria-label="Facebook">
                      Facebook
                    </a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <h3 className={styles.infoTitle}>{t('contact.response')}</h3>
                  <p className={styles.infoText}>{t('contact.responseText')}</p>
                </div>
              </div>
            </section>

            {/* Right column - Form */}
            <section className={styles.formSection}>
              <ContactForm />
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  )
}
