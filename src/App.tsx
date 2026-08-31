import { Cta } from './components/Cta/Cta'
import { Faq } from './components/Faq/Faq'
import { Features } from './components/Features/Features'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { LogoBrand } from './components/LogoBrand/LogoBrand'
import { Screenshots } from './components/Screenshots/Screenshots'
import { StoreBadge } from './components/StoreBadge/StoreBadge'
import { DesignSystemPage } from './design-system/DesignSystemPage'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'

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

  if (window.location.pathname === '/terms') {
    return <Terms />
  }

  if (window.location.pathname === '/privacy') {
    return <Privacy />
  }

  return (
    <>
      <Header
        brand={<LogoBrand />}
        links={[
          { label: 'Home', href: '#' },
          { label: 'Features', href: '#features' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Termos', href: '#termos-de-uso' },
          { label: 'Privacidade', href: '#privacidade' },
        ]}
        action={<StoreBadge href={PLAY_STORE_URL} size="sm" />}
      />
      <Hero />
      <Features />
      <Screenshots />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}

export default App
