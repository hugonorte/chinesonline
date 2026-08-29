import type { ReactNode } from 'react'
import styles from './specimens.module.scss'

/**
 * Os specimens nunca imprimem valores literais (hex, rem) — só o NOME do token,
 * com a cor/medida aplicada via `var()`. Duas razões: o valor nunca desatualiza,
 * e o que você copia da vitrine é o token, que é o que se deve usar no código.
 */

export function Stack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>
}

export function Row({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}

export function Label({ children }: { children: ReactNode }) {
  return <span className={styles.specLabel}>{children}</span>
}

export function VariantCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.variantCell}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

export function Swatch({ token }: { token: string }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.chip} style={{ background: `var(${token})` }} />
      <Label>{token}</Label>
    </div>
  )
}

export function ColorRamp({ title, prefix, steps }: { title: string; prefix: string; steps: number[] }) {
  return (
    <div>
      <p className={styles.rampTitle}>{title}</p>
      <div className={styles.ramp}>
        {steps.map((step) => (
          <Swatch key={step} token={`${prefix}-${step}`} />
        ))}
      </div>
    </div>
  )
}

export function SpaceRow({ token }: { token: string }) {
  return (
    <div className={styles.spaceRow}>
      <Label>{token}</Label>
      <div className={styles.spaceBar} style={{ width: `var(${token})` }} />
    </div>
  )
}

export function ShapeTile({ token, kind }: { token: string; kind: 'radius' | 'shadow' }) {
  const style =
    kind === 'radius'
      ? { borderRadius: `var(${token})` }
      : { boxShadow: `var(${token})`, borderRadius: 'var(--radius-md)' }

  return (
    <div className={styles.swatch}>
      <div className={styles.shapeTile} style={style} />
      <Label>{token}</Label>
    </div>
  )
}
