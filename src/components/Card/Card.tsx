import type { ElementType, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Card.module.scss'

export type CardProps = {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  /** Adiciona hover elevado. Use junto com `as="a"` ou `as="button"`. */
  interactive?: boolean
  as?: ElementType
  href?: string
  className?: string
}

export function Card({
  children,
  padding = 'md',
  interactive = false,
  as: Tag = 'div',
  href,
  className,
}: CardProps) {
  return (
    <Tag
      href={href}
      className={cx(styles.card, styles[padding], interactive && styles.interactive, className)}
    >
      {children}
    </Tag>
  )
}
