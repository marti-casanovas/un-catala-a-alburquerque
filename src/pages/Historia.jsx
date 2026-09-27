import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../LanguageContext.jsx'

import carrerMartiCasanovas from '../assets/galeria/03-carrer-marti-casanovas.jpg'
import portaladaFabricaSuro from '../assets/galeria/04-portalada-fabrica-suro.jpg'
import portaladaFabricaSuroCarrer from '../assets/galeria/05-portalada-fabrica-suro-carrer.jpg'
import martiSerafinaHistorica from '../assets/galeria/06-marti-serafina-historica.jpg'
import mapaMemoriaHistorica from '../assets/galeria/07-mapa-memoria-historica.jpg'
import carrerAlburquerque from '../assets/galeria/08-carrer-alburquerque.jpg'
import grupErmitaRosario from '../assets/galeria/09-grup-ermita-rosario.jpg'
import escoltantErmitaRosario from '../assets/galeria/10-escoltant-ermita-rosario.jpg'
import placaVictimes from '../assets/galeria/11-placa-victimes.jpg'
import homenatgeCementiri from '../assets/galeria/12-homenatge-cementiri.jpg'
import ceremoniaCementiri from '../assets/galeria/13-ceremonia-cementiri.jpg'
import conversaAjuntament from '../assets/galeria/14-conversa-ajuntament.jpg'
import equipAjuntament from '../assets/galeria/15-equip-ajuntament.jpg'
import saloPlensAjuntament from '../assets/galeria/16-salo-plens-ajuntament.jpg'
import equipSaloBandera from '../assets/galeria/17-equip-salo-bandera.jpg'
import llibreCoberta from '../assets/galeria/18-llibre-coberta.jpg'
import carrerSerafinaRoca from '../assets/galeria/19-carrer-serafina-roca.jpg'
import familiaCasanovasHistorica from '../assets/galeria/20-familia-casanovas-historica.jpg'

const IMAGES = {
  'carrer-marti-casanovas': carrerMartiCasanovas,
  'portalada-fabrica-suro': portaladaFabricaSuro,
  'portalada-fabrica-suro-carrer': portaladaFabricaSuroCarrer,
  'marti-serafina-historica': martiSerafinaHistorica,
  'mapa-memoria-historica': mapaMemoriaHistorica,
  'carrer-alburquerque': carrerAlburquerque,
  'grup-ermita-rosario': grupErmitaRosario,
  'escoltant-ermita-rosario': escoltantErmitaRosario,
  'placa-victimes': placaVictimes,
  'homenatge-cementiri': homenatgeCementiri,
  'ceremonia-cementiri': ceremoniaCementiri,
  'conversa-ajuntament': conversaAjuntament,
  'equip-ajuntament': equipAjuntament,
  'salo-plens-ajuntament': saloPlensAjuntament,
  'equip-salo-bandera': equipSaloBandera,
  'llibre-coberta': llibreCoberta,
  'carrer-serafina-roca': carrerSerafinaRoca,
  'familia-casanovas-historica': familiaCasanovasHistorica,
}

function NextArrow({ onClick, label }) {
  return (
    <button type="button" className="next-arrow" onClick={onClick} aria-label={label}>
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 9l6 6 6-6M6 14l6 6 6-6"
        />
      </svg>
    </button>
  )
}

function Historia() {
  const { t } = useLanguage()
  const { chapters } = t.historia
  const sectionRefs = useRef({})
  const [activeId, setActiveId] = useState(chapters[0]?.id)
  const [navOpen, setNavOpen] = useState(false)
  const activeChapter = chapters.find((chapter) => chapter.id === activeId) || chapters[0]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.35 },
    )
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [chapters])

  const scrollToChapter = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' })
    setNavOpen(false)
  }

  return (
    <div className="historia-layout">
      <nav className={`historia-sidenav${navOpen ? ' open' : ''}`} aria-label={t.historia.sideNavLabel}>
        <span className="historia-sidenav-label">{t.historia.sideNavLabel}</span>
        <button
          type="button"
          className="historia-sidenav-toggle"
          onClick={() => setNavOpen((open) => !open)}
          aria-expanded={navOpen}
        >
          <span className="historia-sidenav-toggle-text">
            <span className="historia-sidenav-toggle-eyebrow">{t.historia.sideNavLabel}</span>
            <span className="historia-sidenav-current">{activeChapter?.title}</span>
          </span>
          <svg
            className={`historia-sidenav-chevron${navOpen ? ' open' : ''}`}
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                type="button"
                className={chapter.id === activeId ? 'active' : ''}
                onClick={() => scrollToChapter(chapter.id)}
              >
                {chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="historia-scroller">
        {chapters.map((chapter, index) => {
          const nextChapter = chapters[index + 1]
          return (
            <section
              key={chapter.id}
              id={chapter.id}
              ref={(el) => {
                sectionRefs.current[chapter.id] = el
              }}
              className="historia-chapter page-enter"
            >
              <div className="historia-chapter-inner">
                <h2>{chapter.title}</h2>
                <div className="prose">
                  {chapter.intro && (
                    <p>
                      {chapter.intro}
                      <button
                        type="button"
                        className="book-link"
                        onClick={() => scrollToChapter(chapter.bookMention.targetId)}
                      >
                        {chapter.bookMention.linkText}
                      </button>
                      {chapter.bookMention.after}
                    </p>
                  )}
                  {chapter.paragraphs?.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
                {chapter.photos && (
                  <div className="content-photos">
                    {chapter.photos.map((photo) => (
                      <figure
                        key={photo.id}
                        className={`${photo.full ? 'full' : ''}${photo.rect ? ' rect' : ''}`.trim() || undefined}
                      >
                        <img
                          src={IMAGES[photo.id]}
                          alt={photo.alt}
                          loading="lazy"
                          style={photo.bg ? { backgroundColor: photo.bg } : undefined}
                        />
                        <figcaption>{photo.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
              {nextChapter && (
                <NextArrow
                  label={t.historia.nextLabel}
                  onClick={() => scrollToChapter(nextChapter.id)}
                />
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default Historia
