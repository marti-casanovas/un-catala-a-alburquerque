import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext.jsx'
import mapaViatge from '../assets/mapa-viatge.jpg'

function Home() {
  const { t } = useLanguage()
  return (
    <section className="hero page-enter">
      <h1>{t.home.heading}</h1>
      <p className="subtitle">{t.home.subtitle}</p>
      <img className="hero-map" src={mapaViatge} alt={t.home.mapAlt} />
      <Link className="cta" to="/historia">
        {t.home.cta}
      </Link>
    </section>
  )
}

export default Home
