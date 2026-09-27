import { useLanguage } from '../LanguageContext.jsx'

import panoramicaCastell from '../assets/galeria/01-panoramica-castell.jpg'
import ermitaJardinsCastell from '../assets/galeria/02-ermita-jardins-castell.jpg'

const IMAGES = {
  'panoramica-castell': panoramicaCastell,
  'ermita-jardins-castell': ermitaJardinsCastell,
}

function Alburquerque() {
  const { t } = useLanguage()
  const { intro, sections, photos, linksHeading, links } = t.alburquerque

  return (
    <section className="content-section page-enter">
      <h2>{t.alburquerque.title}</h2>
      <div className="prose">
        <p>{intro}</p>
      </div>

      <div className="content-photos">
        {photos.map((photo) => (
          <figure key={photo.id}>
            <img src={IMAGES[photo.id]} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.alt}</figcaption>
          </figure>
        ))}
      </div>

      <div className="prose">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="ref-section">
        <h3>{linksHeading}</h3>
        <ul className="links-list">
          {links.map((link) => (
            <li key={link.url} className="ref-item">
              <span className="ref-body">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Alburquerque
