import { createContext, useContext, useEffect, useState } from 'react'
import translations, { defaultLanguage, languages } from './translations'

const STORAGE_KEY = 'elFinDelOlvidoLang'

function getInitialLanguage() {
  if (typeof window === 'undefined') return defaultLanguage
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && languages.includes(stored)) return stored
  } catch {
    // localStorage not available (private mode, etc.) — fall back below
  }
  const browserLang = window.navigator?.language?.slice(0, 2)
  return languages.includes(browserLang) ? browserLang : defaultLanguage
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore write failures
    }
  }, [lang])

  const value = { lang, setLang, t: translations[lang], languages, translations }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
