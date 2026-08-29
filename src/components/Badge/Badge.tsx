import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Badge.module.scss'

export type BadgeProps = {
  children: ReactNode
  /** `free` = Lite, `premium` = pago, `soon` = ainda não disponível (iOS). */
  tone?: 'neutral' | 'free' | 'premium' | 'soon'
  className?: string
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return <span className={cx(styles.badge, styles[tone], className)}>{children}</span>
}
