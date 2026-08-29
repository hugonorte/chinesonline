import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import googlePlayPtBr from '../../assets/badges/google-play-pt-br.png'
import styles from './StoreBadge.module.scss'

/**
 * Badge oficial do Google Play.
 *
 * O asset é o PNG que o Google distribui, sem alteração — recolorir, redesenhar
 * ou recortar viola as diretrizes de marca. O componente cuida do que é nosso:
 * a área de respiro obrigatória, o alvo de toque e o texto alternativo.
 *
 * O alt repete o texto que está dentro da imagem, de propósito: para quem usa
 * leitor de tela, o link precisa dizer a mesma coisa que o badge diz.
 */
export type StoreBadgeProps = {
  /** URL da ficha do app na Play Store. */
  href: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StoreBadge({ href, size = 'md', className }: StoreBadgeProps) {
  return (
    <a
      className={cx(styles.badge, styles[size], className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={googlePlayPtBr}
        alt="Disponível no Google Play"
        width={646}
        height={250}
      />
    </a>
  )
}

/**
 * Slot para loja onde o app ainda não está.
 *
 * Não usa o badge da Apple: a marca "Download on the App Store" anuncia um app
 * publicado, e o ChinesOnline ainda não está lá. Exibi-la seria afirmar algo
 * que não é verdade — e, na prática, um motivo de recusa na revisão.
 */
export function StoreSoon({ children }: { children: ReactNode }) {
  return (
    <span className={styles.soon}>
      <svg className={styles.soonIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6v4l2.5 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  )
}
