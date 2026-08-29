import { cx } from '../../lib/cx'
import styles from './LogoBrand.module.scss'

export type LogoBrandProps = {
  className?: string
}

export function LogoBrand({ className }: LogoBrandProps) {
  return (
    <div className={cx(styles.brand, className)}>
      ChinesOnline
    </div>
  )
}
