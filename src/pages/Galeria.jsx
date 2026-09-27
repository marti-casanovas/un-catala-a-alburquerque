import { useEffect, useState } from 'react'
import { useLanguage } from '../LanguageContext.jsx'

import panoramicaCastell from '../assets/galeria/01-panoramica-castell.jpg'
import ermitaJardinsCastell from '../assets/galeria/02-ermita-jardins-castell.jpg'
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
  'panoramica-castell': panoramicaCastell,
  'ermita-jardins-castell': ermitaJardinsCastell,
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

function Galeria() {
  const { t } = useLanguage()
  const { items } = t.galeria
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (openIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % items.length)
      if (event.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openIndex, items.length])

  const current = openIndex === null ? null : items[openIndex]

  const goPrev = () => setOpenIndex((i) => (i - 1 + items.length) % items.length)
  const goNext = () => setOpenIndex((i) => (i + 1) % items.length)

  return (
    <section className="content-section page-enter">
      <h2>{t.galeria.title}</h2>
      <div className="prose">
        <p>{t.galeria.intro}</p>
      </div>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={`gallery-item${item.full ? ' full' : ''}${item.rect ? ' rect' : ''}`}
            onClick={() => setOpenIndex(index)}
          >
            <img
              src={IMAGES[item.id]}
              alt={item.alt}
              loading="lazy"
              style={item.bg ? { backgroundColor: item.bg } : undefined}
            />
          </button>
        ))}
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpenIndex(null)}>
          <button type="button" className="lightbox-close" aria-label="×" onClick={() => setOpenIndex(null)}>
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            aria-label={t.galeria.prevLabel}
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <img
            src={IMAGES[current.id]}
            alt={current.alt}
            className="lightbox-img"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            aria-label={t.galeria.nextLabel}
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <p className="lightbox-caption">{current.alt}</p>
        </div>
      )}
    </section>
  )
}

export default Galeria
