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
      <Screenshots />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}

export default App
