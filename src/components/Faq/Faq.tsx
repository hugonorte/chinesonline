import { useEffect, useRef, useState } from 'react'
import styles from './Faq.module.scss'

type FaqItem = {
  id: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'compatibility',
    question: 'O ChinesOnline funciona no meu celular?',
    answer:
      'Sim! O ChinesOnline está disponível para Android (versão 8.0 ou superior) na Google Play Store. Contamos com versão iOS em desenvolvimento. O app funciona em qualquer smartphone com navegador moderno, ocupando cerca de 45MB de espaço.',
  },
  {
    id: 'offline',
    question: 'Posso usar o app sem conexão com a internet?',
    answer:
      'Sim! O ChinesOnline oferece modo offline completo. Após baixar o conteúdo, você pode estudar em qualquer lugar — no metrô, viagem ou em áreas sem sinal. Sua progressão é sincronizada automaticamente assim que você se conectar novamente.',
  },
  {
    id: 'languages',
    question: 'Em quais idiomas o app ChinesOnline está disponível?',
    answer:
      'O ChinesOnline está disponível em português (Brasil), inglês e espanhol. Você escolhe o idioma na primeira vez que abre o app e pode alterá-lo a qualquer momento nas configurações. O conteúdo de aprendizado é o mesmo em todos os idiomas.',
  },
  {
    id: 'lite-vs-premium',
    question: 'Qual é a diferença entre a versão Lite e Premium?',
    answer:
      'A versão Lite (gratuita) oferece acesso a lições básicas com até 50 caracteres chineses e flashcards limitados. O Premium (US$ 19,00, pagamento único) desbloqueia o catálogo completo com 3.000+ caracteres, pronúncia nativa de falantes chineses, estatísticas avançadas, sincronização em nuvem e atualizações vitalícias.',
  },
  {
    id: 'payment',
    question: 'Como funciona o pagamento do Premium?',
    answer:
      'É um pagamento único — você compra uma vez por US$ 19,00 e tem acesso vitalício ao Premium. Sem assinaturas, sem renovações automáticas, sem cobranças recorrentes. O pagamento é processado diretamente pela Google Play Store com todas as garantias de segurança.',
  },
  {
    id: 'pronunciation',
    question: 'Como aprender pronúncia correta dos caracteres chineses?',
    answer:
      'Cada caractere no app vem com áudio nativo gravado por falantes nativos de mandarim. Na versão Premium, você acessa pronúncia em pinyin (romanização) e tons de Mandarim. Pode ouvir quantas vezes precisar e praticar com reconhecimento de voz (funcionalidade em breve).',
  },
  {
    id: 'algorithm',
    question: 'Como funciona o algoritmo de aprendizado?',
    answer:
      'O ChinesOnline usa repetição espaçada baseada na Curva do Esquecimento de Ebbinghaus, uma técnica científica comprovada para retenção de memória de longo prazo. O app aprende seu ritmo de aprendizado, prioriza caracteres que você esqueceu e sugere revisões no momento perfeito para fixar na memória.',
  },
  {
    id: 'progress-sync',
    question: 'Posso sincronizar meu progresso entre dispositivos?',
    answer:
      'Sim! Na versão Premium, seu progresso é sincronizado automaticamente entre todos seus dispositivos via nuvem. Comece a estudar no smartphone, continue no tablet e finalize no computador sem perder nada. Na versão Lite, a sincronização fica local ao dispositivo.',
  },
  {
    id: 'reset-data',
    question: 'Como faço para resetar meu progresso ou deletar meus dados?',
    answer:
      'Você pode resetar seu progresso de aprendizado a qualquer momento nas configurações do app, voltando para o início sem perder a conta. Seus dados pessoais podem ser deletados completamente enviando uma solicitação ao suporte. Levamos sua privacidade a sério — confira nossa Política de Privacidade para detalhes.',
  },
  {
    id: 'support',
    question: 'Como faço para contatar o suporte do ChinesOnline?',
    answer:
      'Dúvidas ou problemas técnicos? Abra o app, vá em Configurações → Suporte ou envie um email para support@chinesonline.com.br. Respondemos em até 24 horas em dias úteis. Também estamos disponíveis em redes sociais para dúvidas rápidas.',
  },
]

export type FaqProps = {
  className?: string
}

export function Faq({ className }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

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
              target: 'support@chinesonline.com.br',
            },
          }),
        }}
      />

      <div className={styles.container}>
        {/* Cabeçalho semântico com hierarquia clara */}
        <header className={styles.header}>
          <h2 className={styles.title} id="faq-heading">
            Perguntas Frequentes sobre o ChinesOnline
          </h2>
          <p className={styles.subtitle}>
            Encontre respostas sobre compatibilidade, funcionalidades, planos e suporte técnico do app de aprendizado de
            caracteres chineses.
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
          <p>Não encontrou a resposta que procura?</p>
          <a
            href="mailto:support@chinesonline.com.br"
            className={styles.supportLink}
            itemProp="email"
            rel="noopener noreferrer"
          >
            Entre em contato conosco
          </a>
          <p className={styles.supportDetail}>Respondemos em até 24 horas em dias úteis</p>
        </footer>
      </div>
    </section>
  )
}
