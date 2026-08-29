import type { ReactNode } from 'react'
import { Badge } from '../Badge/Badge'
import { PhoneFrame } from '../PhoneFrame/PhoneFrame'
import { cx } from '../../lib/cx'
import styles from './GameModeCard.module.scss'

export function GameModeGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(styles.grid, className)}>{children}</div>
}

export type GameModeCardProps = {
  title: ReactNode
  children: ReactNode
  /** Screenshot 9:16 do modo. Ausente, a moldura mostra o slot vazio. */
  screenshot?: string
  /** Descrição da tela. Obrigatória na prática sempre que houver screenshot. */
  screenshotAlt?: string
  /** Proporção da tela do screenshot. Ver PhoneFrame. */
  ratio?: string
  /** Marca o modo como exclusivo da versão paga. */
  premium?: boolean
  className?: string
}

export function GameModeCard({
  title,
  children,
  screenshot,
  screenshotAlt,
  ratio,
  premium = false,
  className,
}: GameModeCardProps) {
  return (
    <article className={cx(styles.card, className)}>
      <div className={styles.frameWrap}>
        <PhoneFrame size="sm" src={screenshot} alt={screenshotAlt ?? ''} ratio={ratio} />
      </div>
      <div className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        {premium && <Badge tone="premium">Premium</Badge>}
      </div>
      <p className={styles.body}>{children}</p>
    </article>
  )
}
