import { I18nProvider } from './i18n/i18nContext'
import { Cta } from './components/Cta/Cta'
import { Faq } from './components/Faq/Faq'
import { Features } from './components/Features/Features'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { LogoBrand } from './components/LogoBrand/LogoBrand'
import { Screenshots } from './components/Screenshots/Screenshots'
import { DesignSystemPage } from './design-system/DesignSystemPage'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { Contact } from './pages/Contact'

/**
 * Roteamento provisório por pathname — o site ainda não tem router.
 * Trocar por react-router quando as seções reais começarem a existir.
 *
 * Em dev o Vite serve o index.html para qualquer rota (fallback SPA), então
 * /design-system funciona direto. Em produção precisa de rewrite no host.
 */
function AppContent() {
  if (window.location.pathname.startsWith('/design-system')) {
    return <DesignSystemPage />
  }

  if (window.location.pathname === '/terms') {
    return <Terms />
  }

  if (window.location.pathname === '/privacy') {
    return <Privacy />
  }

  if (window.location.pathname === '/contact') {
    return <Contact />
  }

  return (
    <>
      <Header brand={<LogoBrand />} />
      <Hero />
      <Features />
      <Screenshots />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}

export default App
