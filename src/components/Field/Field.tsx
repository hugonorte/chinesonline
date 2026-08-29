import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import styles from './Field.module.scss'

type BaseProps = {
  label: string
  /** Texto de apoio permanente. Suprimido quando há `error`. */
  hint?: string
  /** Mensagem de erro. Presente = campo em estado inválido. */
  error?: string
  className?: string
}

export type FieldProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseProps>

export function Field({ label, hint, error, className, id, ...rest }: FieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>

      <input
        id={inputId}
        className={cx(styles.input, error && styles.hasError)}
        // O leitor de tela precisa do vínculo explícito: a mensagem está fora do label.
        aria-describedby={message ? messageId : undefined}
        aria-invalid={error ? true : undefined}
        {...rest}
      />

      {message && (
        <span
          id={messageId}
          className={error ? styles.error : styles.hint}
          // Erro que aparece depois do submit precisa ser anunciado.
          role={error ? 'alert' : undefined}
        >
          {message}
        </span>
      )}
    </div>
  )
}
