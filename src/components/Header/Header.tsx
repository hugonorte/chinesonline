import type { ReactNode } from 'react'
import { Container } from '../Container/Container'
import { cx } from '../../lib/cx'
import styles from './Header.module.scss'

export type HeaderProps = {
  brand: ReactNode
  /** Âncoras da landing. Ocultas abaixo de `md` — ver Header.module.scss. */
  links?: Array<{ label: string; href: string }>
  /** CTA persistente: normalmente o badge da loja ou um Button. */
  action?: ReactNode
  /** `dark` é o padrão porque o wordmark do ChinesOnline é branco. */
  tone?: 'dark' | 'light'
  className?: string
}

export function Header({ brand, links = [], action, tone = 'dark', className }: HeaderProps) {
  return (
    <header className={cx(styles.header, styles[tone], className)}>
      <Container>
        <div className={styles.inner}>
          <a className={styles.brand} href="/">{brand}</a>

          {links.length > 0 && (
            <nav className={styles.nav} aria-label="Seções da página">
              {links.map((link) => (
                <a key={link.href} className={styles.link} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {action}
        </div>
      </Container>
    </header>
  )
}
