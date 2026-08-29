import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Heading.module.scss'

type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm'

export type HeadingProps = {
  children: ReactNode
  /** Nível semântico do documento — escolha pela hierarquia, não pelo tamanho. */
  level?: 1 | 2 | 3 | 4
  /** Tamanho visual. Padrão derivado do nível; sobrescreva quando divergirem. */
  size?: HeadingSize
  tone?: 'default' | 'muted' | 'brand'
  id?: string
  className?: string
}

const sizeForLevel: Record<1 | 2 | 3 | 4, HeadingSize> = {
  1: 'display',
  2: 'xl',
  3: 'lg',
  4: 'md',
}

export function Heading({
  children,
  level = 2,
  size,
  tone = 'default',
  id,
  className,
}: HeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag
      id={id}
      className={cx(
        styles.heading,
        styles[size ?? sizeForLevel[level]],
        tone !== 'default' && styles[tone],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
