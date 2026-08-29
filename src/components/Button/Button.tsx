import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    /** Com `href` o componente vira <a> — CTAs de seção continuam sendo links. */
    href?: string
    target?: string
    rel?: string
  }

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  target,
  rel,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  )

  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        // Fecha a brecha de segurança de target="_blank" sem exigir isso de quem usa.
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
