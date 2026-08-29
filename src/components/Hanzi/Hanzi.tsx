import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Hanzi.module.scss'

/** 1º a 4º tom, 5 = neutro. */
export type Tone = 1 | 2 | 3 | 4 | 5

export type HanziProps = {
  /** Os caracteres. Sempre texto chinês — nunca use este componente em português. */
  children: ReactNode
  /** Quando presente, vira anotação ruby acima dos caracteres. */
  pinyin?: string
  /** Colore caractere e pinyin pela convenção de tom. */
  tone?: Tone
  size?: 'inline' | 'lg' | 'display'
  className?: string
}

export function Hanzi({ children, pinyin, tone, size = 'inline', className }: HanziProps) {
  const classes = cx(styles.hanzi, styles[size], tone && styles.toned, className)
  const style = tone ? { color: `var(--color-tone-${tone})` } : undefined

  if (!pinyin) {
    return (
      <span className={classes} style={style} lang="zh-Hans">
        {children}
      </span>
    )
  }

  return (
    <ruby className={classes} style={style} lang="zh-Hans">
      {children}
      {/* <rp> é o fallback para navegadores sem ruby: mostra o pinyin entre parênteses. */}
      <rp>(</rp>
      <rt lang="zh-Latn-pinyin">{pinyin}</rt>
      <rp>)</rp>
    </ruby>
  )
}
