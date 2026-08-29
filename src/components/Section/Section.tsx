import type { ReactNode } from 'react'
import { Container } from '../Container/Container'
import type { ContainerProps } from '../Container/Container'
import { cx } from '../../lib/cx'
import styles from './Section.module.scss'

type SectionTone = 'default' | 'subtle' | 'inverse'
type SectionSpacing = 'default' | 'tight' | 'flush'

export type SectionProps = {
  children: ReactNode
  /** `inverse` inverte os tokens de texto para os filhos — ver Section.module.scss. */
  tone?: SectionTone
  spacing?: SectionSpacing
  /** Envolve o conteúdo num Container. Desligue para seções full-bleed. */
  contained?: boolean
  containerSize?: ContainerProps['size']
  id?: string
  className?: string
}

export function Section({
  children,
  tone = 'default',
  spacing = 'default',
  contained = true,
  containerSize = 'default',
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx(
        styles.section,
        styles[tone],
        spacing !== 'default' && styles[spacing],
        className,
      )}
    >
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  )
}
