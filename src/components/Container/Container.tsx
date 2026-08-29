import type { ElementType, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Container.module.scss'

type ContainerSize = 'content' | 'default' | 'wide'

export type ContainerProps = {
  children: ReactNode
  /** `content` = largura de leitura (72ch); `default` = 1200px; `wide` = 1440px. */
  size?: ContainerSize
  /** Remove o gutter lateral — para quando o filho controla o próprio recuo. */
  flush?: boolean
  as?: ElementType
  className?: string
}

export function Container({
  children,
  size = 'default',
  flush = false,
  as: Tag = 'div',
  className,
}: ContainerProps) {
  return (
    <Tag className={cx(styles.container, styles[size], flush && styles.flush, className)}>
      {children}
    </Tag>
  )
}
