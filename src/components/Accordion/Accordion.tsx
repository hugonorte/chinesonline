import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Accordion.module.scss'

/**
 * Construído sobre <details>/<summary>, não sobre estado em React.
 *
 * Três ganhos concretos: funciona sem JavaScript, já vem com a semântica de
 * expansão que leitores de tela esperam, e — decisivo aqui — **abre nos
 * previews estáticos do Claude Design**, que são HTML puro sem runtime.
 *
 * O atributo `name` faz os itens se fecharem mutuamente, nativo. Em navegador
 * antigo que não o suporta, o acordeão simplesmente permite vários abertos:
 * degrada para algo utilizável, não para algo quebrado.
 */
export type AccordionItem = {
  id: string
  question: ReactNode
  answer: ReactNode
}

export type AccordionProps = {
  items: AccordionItem[]
  /** Agrupa os itens para abertura exclusiva. */
  name?: string
  className?: string
}

export function Accordion({ items, name = 'accordion', className }: AccordionProps) {
  return (
    <div className={cx(styles.accordion, className)}>
      {items.map((item) => (
        <details key={item.id} name={name} className={styles.item}>
          <summary className={styles.summary}>
            {item.question}
            <svg
              className={styles.chevron}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 7.5 10 12.5 15 7.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className={styles.answer}>{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
