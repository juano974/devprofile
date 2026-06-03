import { useContext } from "react"
import { CVContext } from "../../context/CVContext"
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiGlobe, FiFolder } from "react-icons/fi"

function PreviewSidebar() {
  const { cvData, personalInfo } = useContext(CVContext)
  
  const languages = cvData?.languages || []
  
  const hasContactInfo = personalInfo?.email || personalInfo?.telefono || personalInfo?.ciudad
  const hasLinks = personalInfo?.github || personalInfo?.linkedin || personalInfo?.portfolio || personalInfo?.repositorio
  const hasLanguages = languages.length > 0

  return (
    <aside className="cv-sidebar">
      {/* Avatar circular */}
      <div className="cv-avatar-container">
        <img
          src={personalInfo?.imagenUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
          alt={personalInfo?.nombre || "Avatar"}
          className="cv-avatar"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"
          }}
        />
      </div>

      {/* Sección de Contacto */}
      {hasContactInfo && (
        <div className="cv-sidebar-section">
          <h4 className="cv-sidebar-title">Contacto</h4>
          {personalInfo?.email && (
            <div className="cv-contact-item">
              <FiMail className="cv-contact-icon" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.telefono && (
            <div className="cv-contact-item">
              <FiPhone className="cv-contact-icon" />
              <span>{personalInfo.telefono}</span>
            </div>
          )}
          {personalInfo?.ciudad && (
            <div className="cv-contact-item">
              <FiMapPin className="cv-contact-icon" />
              <span>{personalInfo.ciudad}</span>
            </div>
          )}
        </div>
      )}

      {/* Enlaces y Redes */}
      {hasLinks && (
        <div className="cv-sidebar-section">
          <h4 className="cv-sidebar-title">Enlaces</h4>
          {personalInfo?.github && (
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="cv-link-item">
              <FiGithub className="cv-contact-icon" />
              <span>GitHub</span>
            </a>
          )}
          {personalInfo?.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="cv-link-item">
              <FiLinkedin className="cv-contact-icon" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo?.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="cv-link-item">
              <FiGlobe className="cv-contact-icon" />
              <span>Portafolio</span>
            </a>
          )}
          {personalInfo?.repositorio && (
            <a href={personalInfo.repositorio} target="_blank" rel="noopener noreferrer" className="cv-link-item">
              <FiFolder className="cv-contact-icon" />
              <span>Repositorio</span>
            </a>
          )}
        </div>
      )}

      {/* Idiomas */}
      {hasLanguages && (
        <div className="cv-sidebar-section">
          <h4 className="cv-sidebar-title">Idiomas</h4>
          {languages.map((lang) => (
            <div key={lang.id} className="cv-language-item">
              <span className="cv-language-name">{lang.idioma}</span>
              <span className="cv-language-level">
                {lang.nivel} {lang.descripcion ? `(${lang.descripcion})` : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default PreviewSidebar
