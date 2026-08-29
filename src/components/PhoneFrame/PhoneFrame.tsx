import type { CSSProperties } from 'react'
import { cx } from '../../lib/cx'
import styles from './PhoneFrame.module.scss'

/**
 * Moldura de celular com a tela em 9:16.
 *
 * A proporção fica reservada mesmo sem imagem: o slot ocupa o espaço final
 * desde o primeiro render, então quando os screenshots chegarem o layout não
 * muda de altura — nada de conteúdo pulando embaixo do hero.
 */
export type PhoneFrameProps = {
  /** Screenshot do app. Ausente, o slot mostra seu estado vazio. */
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  /**
   * Proporção da tela, em sintaxe CSS. Padrão `9 / 16`. Os screenshots reais do
   * ChinesOnline são mais altos que isso — passe a proporção do arquivo para
   * não perder topo e base no `object-fit: cover`.
   */
  ratio?: string
  className?: string
}

export function PhoneFrame({ src, alt = '', size = 'md', ratio, className }: PhoneFrameProps) {
  return (
    <div className={cx(styles.frame, styles[size], className)}>
      <div
        className={styles.screen}
        style={ratio ? ({ '--frame-ratio': ratio } as CSSProperties) : undefined}
      >
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <span className={styles.placeholder}>
            <span className={styles.ratio}>9 : 16</span>
            screenshot do app
          </span>
        )}
      </div>
    </div>
  )
}
