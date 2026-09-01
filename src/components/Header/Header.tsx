import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../Container/Container'
import { useI18n, type Language } from '../../i18n/i18nContext'
import { cx } from '../../lib/cx'
import styles from './Header.module.scss'

export type HeaderProps = {
  brand: ReactNode
  /** CTA persistente: normalmente o badge da loja ou um Button. */
  action?: ReactNode
  /** `dark` é o padrão porque o wordmark do ChinesOnline é branco. */
  tone?: 'dark' | 'light'
  className?: string
}

const navigationLinks = [
  { labelKey: 'header.homeLink', href: '#' },
  { labelKey: 'header.featuresLink', href: '#features' },
  { labelKey: 'header.faqLink', href: '#faq' },
  { labelKey: 'header.contactLink', href: '/contact' },
  { labelKey: 'header.termsLink', href: '/terms' },
  { labelKey: 'header.privacyLink', href: '/privacy' },
]

const languages: Array<{ code: Language }> = [
  { code: 'pt-BR' },
  { code: 'es' },
  { code: 'en' },
]

export function Header({ brand, action, tone = 'dark', className }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, language, setLanguage } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Não fechar se clicar no botão hamburguer
      if (target.closest(`[aria-controls="mobile-menu"]`)) {
        return
      }
      // Fechar se clicar fora do menu
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false)
      }
    }

    // Pequeno delay para evitar conflitos de evento
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className={cx(styles.header, styles[tone], isScrolled && styles.scrolled, className)} ref={headerRef}>
        <Container>
          <div className={styles.inner}>
            <a className={styles.brand} href="/">
              {brand}
            </a>

            <nav className={styles.nav} aria-label={t('header.homeLink')}>
              {navigationLinks.map((link) => (
                <a key={link.href} className={styles.link} href={link.href}>
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>

            <div className={styles.rightSection}>
              <select
                className={styles.languageSelector}
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                aria-label={t('header.languageLabel')}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code}
                  </option>
                ))}
              </select>

              {action && <div className={styles.action}>{action}</div>}

              <button
                className={styles.hamburger}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? t('header.closeMenuLabel') : t('header.menuToggleLabel')}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Overlay - Fundo escuro quando menu está aberto */}
      {isMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu (slideover) - Fora do header para position fixed funcionar */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cx(styles.mobileMenu, isMenuOpen && styles.open)}
        role="navigation"
      >
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileLogo}>{brand}</div>

          <select
            className={styles.mobileLanguageSelector}
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            aria-label={t('header.languageLabel')}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.code}
              </option>
            ))}
          </select>

          <nav className={styles.mobileNav}>
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                className={styles.mobileLink}
                href={link.href}
                onClick={handleMenuClick}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
