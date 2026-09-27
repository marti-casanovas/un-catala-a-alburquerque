import { useLanguage } from '../LanguageContext.jsx'

function Enllacos() {
  const { t } = useLanguage()
  return (
    <section className="content-section page-enter">
      <h2>{t.enllacos.title}</h2>
      {t.enllacos.sections.map((section) => (
        <div key={section.heading} className="ref-section">
          <h3>{section.heading}</h3>
          <ul className="links-list">
            {section.items.map((item) => (
              <li key={item.url} className="ref-item">
                {item.date && <span className="ref-date">{item.date}</span>}
                <span className="ref-body">
                  <span className="ref-source">{item.source}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default Enllacos
