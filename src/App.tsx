import { Button } from './components/Button/Button'
import { Features } from './components/Features/Features'
import { Heading } from './components/Heading/Heading'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { LogoBrand } from './components/LogoBrand/LogoBrand'
import { Section } from './components/Section/Section'
import { StoreBadge } from './components/StoreBadge/StoreBadge'
import { Text } from './components/Text/Text'
import { DesignSystemPage } from './design-system/DesignSystemPage'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

/**
 * Roteamento provisório por pathname — o site ainda não tem router.
 * Trocar por react-router quando as seções reais começarem a existir.
 *
 * Em dev o Vite serve o index.html para qualquer rota (fallback SPA), então
 * /design-system funciona direto. Em produção precisa de rewrite no host.
 */
function App() {
  if (window.location.pathname.startsWith('/design-system')) {
    return <DesignSystemPage />
  }

  return (
    <>
      <Header
        brand={<LogoBrand />}
        links={[
          { label: 'Home', href: '#' },
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ]}
        action={<StoreBadge href={PLAY_STORE_URL} size="sm" />}
      />
      <Hero />
      <Features />
      <Section>
        <Heading level={1}>chinesonline.com.br</Heading>
        <Text size="lg" tone="muted" measure>
          Placeholder. As seções do site ainda não existem — o que está pronto é o
          design system que vai gerá-las.
        </Text>
        <div style={{ marginBlockStart: 'var(--space-6)' }}>
          <Button href="/design-system" size="lg">
            Abrir o design system
          </Button>
        </div>
      </Section>
    </>
  )
}

export default App
