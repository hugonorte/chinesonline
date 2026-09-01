import { useI18n } from '../../i18n/i18nContext'
import { legalTranslations } from '../../i18n/legal-translations'
import styles from '../../pages/Legal.module.scss'

type LegalContentProps = {
  type: 'privacy' | 'terms'
}

export function LegalContent({ type }: LegalContentProps) {
  const { language } = useI18n()
  const content = (legalTranslations[language] as any)[type]

  if (!content) return null

  if (type === 'privacy') {
    return (
      <article className={styles.article}>
        <section className={styles.section}>
          <h2>{content.section1}</h2>
          <p>{content.intro}</p>
          <p>{content.introRecommendation}</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section2}</h2>
          <p>{content.dataCollected}</p>

          <h3 className={styles.subheading}>{content.dataProvidedByYou}</h3>
          <ul className={styles.list}>
            <li>{content.accountInfo}</li>
            <li>{content.profileInfo}</li>
            <li>{content.contactInfo}</li>
            <li>{content.feedback}</li>
          </ul>

          <h3 className={styles.subheading}>{content.dataCollectedAutomatically}</h3>
          <ul className={styles.list}>
            <li>{content.learningProgress}</li>
            <li>{content.deviceInfo}</li>
            <li>{content.usageData}</li>
            <li>{content.networkInfo}</li>
            <li>{content.cookies}</li>
            <li>{content.adIds}</li>
          </ul>

          <h3 className={styles.subheading}>{content.sensitiveData}</h3>
          <p><strong>{content.noSensitive}</strong></p>
          <p>{content.noPaymentData}</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section3}</h2>
          <p>{content.howWeUse}</p>
          <ul className={styles.list}>
            <li>{content.provideService}</li>
            <li>{content.personalizeExperience}</li>
            <li>{content.respondQueries}</li>
            <li>{content.sendNotifications}</li>
            <li>{content.analyzePatterns}</li>
            <li>{content.legalCompliance}</li>
            <li>{content.preventFraud}</li>
            <li>{content.enforceTerms}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{content.section4}</h2>
          <p>{content.sharing}</p>
          <ul className={styles.list}>
            <li><strong>Provedores de Serviço:</strong> {content.serviceProviders}</li>
            <li><strong>Conformidade Legal:</strong> {content.legalRequirement}</li>
            <li><strong>Proteção de Direitos:</strong> {content.protectRights}</li>
            <li><strong>Redes de Publicidade (Google AdMob):</strong> {content.admob} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>{content.privacyPolicy}</a>.</li>
          </ul>
          <p><strong>Rastreamento e Publicidade (App Tracking Transparency - iOS):</strong> {content.appTracking}</p>
          <p>{content.noSellData}</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section5}</h2>
          <p>{content.securityMeasures}</p>
          <ul className={styles.list}>
            <li>{content.encryption}</li>
            <li>{content.secureAuth}</li>
            <li>{content.restrictedAccess}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{content.section6}</h2>
          <p>{content.accountDeletion}</p>
          <ul className={styles.list}>
            <li><strong>{content.deleteInApp}</strong></li>
            <li><strong>{content.deleteByEmail}</strong> <a href="mailto:support@chinesonline.com.br" className={styles.link}>support@chinesonline.com.br</a>.</li>
          </ul>
          <p>{content.deletionTimeline}</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section7}</h2>
          <p>{content.userRights}</p>
          <ul className={styles.list}>
            <li><strong>{content.accessRight}</strong></li>
            <li><strong>{content.rectificationRight}</strong></li>
            <li><strong>{content.forgottenRight}</strong></li>
            <li><strong>{content.portabilityRight}</strong></li>
            <li><strong>{content.objectionRight}</strong></li>
          </ul>
          <p>{content.exerciseRights} <a href="mailto:support@chinesonline.com.br" className={styles.link}>support@chinesonline.com.br</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section8}</h2>
          <p>{content.childrenPrivacy}</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section9}</h2>
          <p>{content.policyChanges}</p>
        </section>

        <section className={styles.section}>
          <h2>{content.section10}</h2>
          <p>{content.contactUs}</p>
          <p><strong>{content.email}</strong> <a href="mailto:support@chinesonline.com.br" className={styles.link}>support@chinesonline.com.br</a></p>
          <p><strong>{content.address}</strong></p>
        </section>
      </article>
    )
  }

  return (
    <article className={styles.article}>
      <section className={styles.section}>
        <h2>{content.section1}</h2>
        <p>{content.intro}</p>
        <p><strong>Importante:</strong> {content.importantNote}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section2}</h2>
        <dl className={styles.definitions}>
          <dt>"Aplicativo"</dt>
          <dd>{content.appDefinition}</dd>

          <dt>"Usuário" ou "Você"</dt>
          <dd>{content.userDefinition}</dd>

          <dt>"Conteúdo"</dt>
          <dd>{content.contentDefinition}</dd>
        </dl>
      </section>

      <section className={styles.section}>
        <h2>{content.section3}</h2>
        <p>{content.eligibility}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section4}</h2>
        <p>{content.license}</p>
        <p>{content.restrictions}</p>
        <ul className={styles.list}>
          <li>{content.restriction1}</li>
          <li>{content.restriction2}</li>
          <li>{content.restriction3}</li>
          <li>{content.restriction4}</li>
          <li>{content.restriction5}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>{content.section5}</h2>
        <p>{content.accounts}</p>
        <p><strong>Suspensão ou Encerramento:</strong> {content.suspension}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section6}</h2>
        <p><strong>Versão Gratuita (Lite) e Anúncios:</strong> {content.liteVersion}</p>
        <p><strong>Versão Premium:</strong> {content.premiumVersion}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section7}</h2>
        <p>{content.userContent}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section8}</h2>
        <p>{content.intellectualProperty}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section9}</h2>
        <p>{content.disclaimerTitle}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section10}</h2>
        <p>{content.productClaims}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section11}</h2>
        <p>{content.thirdPartyBeneficiaries}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section12}</h2>
        <p>{content.modifications}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section13}</h2>
        <p>{content.governingLaw}</p>
      </section>

      <section className={styles.section}>
        <h2>{content.section14}</h2>
        <p>{content.contactUsTerms} <a href="mailto:support@chinesonline.com.br" className={styles.link}>support@chinesonline.com.br</a></p>
      </section>
    </article>
  )
}
