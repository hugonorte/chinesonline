import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/i18nContext'
import styles from './Faq.module.scss'

type FaqItem = {
  id: string
  questionKey: string
  answerKey: string
}

const FAQ_CONFIG: FaqItem[] = [
  { id: 'q1', questionKey: 'faq.faqQuestion1', answerKey: 'faq.faqAnswer1' },
  { id: 'q2', questionKey: 'faq.faqQuestion2', answerKey: 'faq.faqAnswer2' },
  { id: 'q3', questionKey: 'faq.faqQuestion3', answerKey: 'faq.faqAnswer3' },
  { id: 'q4', questionKey: 'faq.faqQuestion4', answerKey: 'faq.faqAnswer4' },
  { id: 'q5', questionKey: 'faq.faqQuestion5', answerKey: 'faq.faqAnswer5' },
  { id: 'q6', questionKey: 'faq.faqQuestion6', answerKey: 'faq.faqAnswer6' },
]

type FaqItemRender = {
  id: string
  question: string
  answer: string
}

export type FaqProps = {
  className?: string
}

export function Faq({ className }: FaqProps) {
  const { t } = useI18n()
  const [openId, setOpenId] = useState<string | null>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  const FAQ_ITEMS: FaqItemRender[] = FAQ_CONFIG.map((item) => ({
    ...item,
    question: t(item.questionKey),
    answer: t(item.answerKey),
  }))

  /**
   * Suporta navegação com teclado em accordion:
   * - Tab: navega entre botões
   * - Space/Enter: abre/fecha item
   * - Home/End: primeiro/último item
   * - ArrowDown/ArrowUp: próximo/anterior item
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!accordionRef.current?.contains(document.activeElement)) return

      const buttons = Array.from(
        accordionRef.current.querySelectorAll<HTMLButtonElement>('[class*="accordionTrigger"]')
      )
      const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)

      if (event.key === 'Home') {
        event.preventDefault()
        buttons[0]?.focus()
      } else if (event.key === 'End') {
        event.preventDefault()
        buttons[buttons.length - 1]?.focus()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        buttons[(currentIndex + 1) % buttons.length]?.focus()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        buttons[(currentIndex - 1 + buttons.length) % buttons.length]?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section
      className={`${styles.faq} ${className || ''}`}
      id="faq"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
            potentialAction: {
              '@type': 'ContactAction',
              name: 'Contato de Suporte',
              target: 'support@mail.chinesonline.com.br',
            },
          }),
        }}
      />

      <div className={styles.container}>
        {/* Cabeçalho semântico com hierarquia clara */}
        <header className={styles.header}>
          <h2 className={styles.title} id="faq-heading">
            {t('faq.title')}
          </h2>
          <p className={styles.subtitle}>
            {t('faq.subtitle')}
          </p>
        </header>

        {/* Lista semântica de accordion com estrutura declarativa para SR */}
        <div
          className={styles.accordionList}
          ref={accordionRef}
          role="region"
          aria-labelledby="faq-heading"
          aria-live="polite"
          aria-atomic="false"
        >
          {FAQ_ITEMS.map((item) => (
            <article
              key={item.id}
              className={`${styles.accordionItem} ${openId === item.id ? styles.open : ''}`}
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                id={`faq-trigger-${item.id}`}
                type="button"
                className={styles.accordionTrigger}
                onClick={() => toggle(item.id)}
                aria-expanded={openId === item.id}
                aria-controls={`faq-panel-${item.id}`}
              >
                <span className={styles.question} itemProp="name">
                  {item.question}
                </span>
                <span
                  className={styles.icon}
                  aria-hidden="true"
                  role="img"
                  aria-label={openId === item.id ? 'Fechar resposta' : 'Abrir resposta'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {/* Painel de conteúdo com metadata Schema.org */}
              <div
                id={`faq-panel-${item.id}`}
                className={styles.accordionContent}
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
                hidden={openId !== item.id}
              >
                <div
                  className={styles.accordionBody}
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{item.answer}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Seção de suporte com ContactPoint schema */}
        <footer className={styles.footer}>
          <p>{t('faq.notFoundQuestion')}</p>
          <a
            href="mailto:support@mail.chinesonline.com.br"
            className={styles.supportLink}
            itemProp="email"
            rel="noopener noreferrer"
          >
            {t('faq.contactSupport')}
          </a>
          <p className={styles.supportDetail}>{t('faq.supportDetail')}</p>
        </footer>
      </div>
    </section>
  )
}
