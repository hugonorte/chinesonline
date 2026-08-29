import type { ElementType, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Text.module.scss'

export type TextProps = {
  children: ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
  tone?: 'default' | 'muted' | 'brand' | 'heading'
  /** Limita a 72ch. Ligue em parágrafos corridos, desligue em legendas curtas. */
  measure?: boolean
  as?: ElementType
  className?: string
}

export function Text({
  children,
  size = 'base',
  tone = 'default',
  measure = false,
  as: Tag = 'p',
  className,
}: TextProps) {
  return (
    <Tag
      className={cx(
        styles.text,
        styles[size],
        tone !== 'default' && styles[tone],
        measure && styles.measure,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
