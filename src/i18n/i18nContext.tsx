import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { translations } from './translations'

export type Language = 'pt-BR' | 'es' | 'en'

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as Language | null
      return saved || 'pt-BR'
    }
    return 'pt-BR'
  })

  useEffect(() => {
    localStorage.setItem('preferred-language', language)
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === 'string' ? value : key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
