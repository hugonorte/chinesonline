import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './PlanCard.module.scss'

/**
 * Comparação Lite × Premium em dois cards, não numa <table>.
 *
 * Tabela é o formato semanticamente certo quando há muitas linhas e vários
 * planos para cruzar. Aqui são dois planos e uma lista curta, e tabela de
 * comparação no celular ou vira scroll horizontal ou desmonta. Dois cards
 * empilham naturalmente e deixam o CTA junto de cada plano.
 */
export function PlanGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.grid, className)}>{children}</div>
}

export type PlanCardProps = {
  name: ReactNode
  price: ReactNode
  /** Ex.: "pagamento único". Fica junto ao preço, não na lista. */
  note?: ReactNode
  badge?: ReactNode
  features: ReactNode[]
  action?: ReactNode
  featured?: boolean
  className?: string
}

export function PlanCard({
  name,
  price,
  note,
  badge,
  features,
  action,
  featured = false,
  className,
}: PlanCardProps) {
  return (
    <div className={cx(styles.card, featured && styles.featured, className)}>
      <div className={styles.head}>
        <span className={styles.name}>{name}</span>
        {badge}
      </div>

      <div>
        <p className={styles.price}>{price}</p>
        {note && <p className={styles.note}>{note}</p>}
      </div>

      <ul className={styles.features} role="list">
        {features.map((feature, i) => (
          <li key={i} className={styles.feature}>
            <svg className={styles.check} viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="m4.5 10.5 3.5 3.5 7.5-8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
