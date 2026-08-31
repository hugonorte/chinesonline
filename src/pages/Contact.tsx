import { Header } from '../components/Header/Header'
import { LegalHero } from '../components/LegalHero/LegalHero'
import { Footer } from '../components/Footer/Footer'
import { ContactForm } from '../components/ContactForm/ContactForm'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { StoreBadge } from '../components/StoreBadge/StoreBadge'
import { Container } from '../components/Container/Container'
import styles from './Contact.module.scss'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

export function Contact() {
  return (
    <>
      <Header
        brand={<LogoBrand />}
        links={[
          { label: 'Home', href: '/' },
          { label: 'Features', href: '/#features' },
          { label: 'FAQ', href: '/#faq' },
          { label: 'Termos', href: '/terms' },
          { label: 'Privacidade', href: '/privacy' },
        ]}
        action={<StoreBadge href={PLAY_STORE_URL} size="sm" />}
      />

      <LegalHero
        id="contact"
        title="Entre em Contato"
        lastUpdated={undefined}
      />

      <main className={styles.contactPage}>
        <Container>
          <div className={styles.content}>
            {/* Left column - Info */}
            <section className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Vamos conversar</h2>
              <p className={styles.sectionDescription}>
                Tem dúvidas sobre o ChinesOnline? Encontrou um bug? Quer sugerir uma nova feature? Entre em contato
                conosco! Respondemos todas as mensagens dentro de 24 horas.
              </p>

              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <h3 className={styles.infoTitle}>Email</h3>
                  <a href="mailto:support@chinesonline.com.br" className={styles.infoLink}>
                    support@chinesonline.com.br
                  </a>
                </div>

                <div className={styles.infoItem}>
                  <h3 className={styles.infoTitle}>Redes Sociais</h3>
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
                  <h3 className={styles.infoTitle}>Resposta</h3>
                  <p className={styles.infoText}>
                    Respondemos a todos os emails dentro de <strong>24 horas úteis</strong>. Se não receber resposta,
                    verifique a pasta de spam.
                  </p>
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
