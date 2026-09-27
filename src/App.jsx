import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { useLanguage } from './LanguageContext.jsx'
import Home from './pages/Home.jsx'
import Historia from './pages/Historia.jsx'
import Alburquerque from './pages/Alburquerque.jsx'
import Enllacos from './pages/Enllacos.jsx'
import Galeria from './pages/Galeria.jsx'
import './App.css'

function BrandIcon() {
  return (
    <svg
      className="brand-icon"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      role="presentation"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 3c-3.5 0-6.5 1-9 3v13c2.5-2 5.5-3 9-3s6.5 1 9 3V6c-2.5-2-5.5-3-9-3z"
        opacity="0.15"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        d="M12 5.2v13.6M3 6c2.5-2 5.5-3 9-3s6.5 1 9 3v13c-2.5-2-5.5-3-9-3s-6.5 1-9 3z"
      />
    </svg>
  )
}

function App() {
  const { lang, setLang, t, languages, translations } = useLanguage()

  const navItems = [
    { to: '/historia', label: t.nav.historia },
    { to: '/alburquerque', label: t.nav.alburquerque },
    { to: '/enllacos', label: t.nav.enllacos },
    { to: '/galeria', label: t.nav.galeria },
  ]

  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" aria-label={t.nav.menu}>
          <BrandIcon />
          <span>{t.siteTitle}</span>
        </Link>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="lang-switch" role="group" aria-label="Idioma / Language">
          {languages.map((code) => (
            <button
              key={code}
              type="button"
              className={code === lang ? 'active' : ''}
              onClick={() => setLang(code)}
              aria-pressed={code === lang}
            >
              {translations[code].langName}
            </button>
          ))}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/alburquerque" element={<Alburquerque />} />
          <Route path="/enllacos" element={<Enllacos />} />
          <Route path="/galeria" element={<Galeria />} />
        </Routes>
      </main>
    </>
  )
}

export default App
