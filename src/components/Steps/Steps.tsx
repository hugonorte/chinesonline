import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Steps.module.scss'

/**
 * Passos são uma sequência, não um conjunto — por isso <ol>/<li> e não divs.
 * Leitor de tela anuncia "item 2 de 3" de graça.
 */
export function Steps({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ol className={cx(styles.steps, className)}>
      {children}
    </ol>
  )
}

export type StepProps = {
  number: number
  title: ReactNode
  children: ReactNode
}

export function Step({ number, title, children }: StepProps) {
  return (
    <li className={styles.step}>
      {/* aria-hidden: o número já vem da semântica do <ol>, repeti-lo é ruído. */}
      <span className={styles.marker} aria-hidden="true">{number}</span>
      <span className={styles.title}>{title}</span>
      <span className={styles.body}>{children}</span>
    </li>
  )
}
