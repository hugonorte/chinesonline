import type { ReactNode } from 'react'
import { Container } from '../Container/Container'
import { cx } from '../../lib/cx'
import styles from './Footer.module.scss'

export type FooterProps = {
  brand: ReactNode
  tagline?: ReactNode
  /**
   * Privacidade e termos moram aqui. Não é decoração: o Google Play exige URL
   * pública de política de privacidade para publicar o app.
   */
  links?: Array<{ label: string; href: string }>
  note?: ReactNode
  className?: string
}

export function Footer({ brand, tagline, links = [], note, className }: FooterProps) {
  return (
    <footer className={cx(styles.footer, className)}>
      <Container>
        <div className={styles.inner}>
          <div>
            <p className={styles.brand}>{brand}</p>
            {tagline && <p className={styles.tagline}>{tagline}</p>}
          </div>

          {links.length > 0 && (
            <nav aria-label="Links institucionais">
              <ul className={styles.links} role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <a className={styles.link} href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {note && <p className={styles.note}>{note}</p>}
      </Container>
    </footer>
  )
}
