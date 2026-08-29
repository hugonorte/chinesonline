import { Heading } from '../components/Heading/Heading'
import { Text } from '../components/Text/Text'
import { catalog, groups } from './catalog'
import styles from './DesignSystemPage.module.scss'

/**
 * Vitrine de desenvolvimento. Renderiza o catálogo com os componentes REAIS —
 * se um primitivo quebrar, esta página quebra junto, que é exatamente o que
 * se quer de uma vitrine. Não adicione exemplos aqui: adicione ao catálogo.
 */
export function DesignSystemPage() {
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <span className={styles.brand}>Design System</span>

        <nav aria-label="Seções do design system">
          {groups.map((group) => (
            <div key={group}>
              <p className={styles.groupName}>{group}</p>
              <ul className={styles.navList} role="list">
                {catalog
                  .filter((entry) => entry.group === group)
                  .map((entry) => (
                    <li key={entry.id}>
                      <a className={styles.navLink} href={`#${entry.id}`}>
                        {entry.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <Heading level={1} size="xl">chinesonline — design system</Heading>
          <Text tone="muted" measure>
            {catalog.length} entradas. Tudo aqui vem de{' '}
            <code>src/design-system/catalog.tsx</code>, a mesma fonte que o passo 3
            usa para gerar os HTML estáticos do Claude Design.
          </Text>
        </header>

        {catalog.map((entry) => (
          <section key={entry.id} id={entry.id} className={styles.entry}>
            <div className={styles.entryHead}>
              <Heading level={2} size="lg">{entry.name}</Heading>
              <span className={styles.entryId}>{entry.group} · #{entry.id}</span>
            </div>
            {entry.subtitle && (
              <Text tone="muted">{entry.subtitle}</Text>
            )}
            <div style={{ marginBlockStart: 'var(--space-6)' }}>{entry.render()}</div>
          </section>
        ))}
      </main>
    </div>
  )
}
