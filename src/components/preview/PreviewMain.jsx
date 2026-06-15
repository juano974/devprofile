import { useContext } from "react"
import { CVContext } from "../../context/CVContext"
import { FiBriefcase, FiBookOpen, FiLayers, FiCode, FiGithub, FiExternalLink } from "react-icons/fi"

function PreviewMain() {
  const { cvData, personalInfo } = useContext(CVContext)

  const skills = cvData?.skills || []
  const experience = cvData?.experience || []
  const projects = cvData?.projects || []
  const education = cvData?.education || []

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.categoria || "Otras Habilidades"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  const hasSkills = skills.length > 0
  const hasExperience = experience.length > 0
  const hasProjects = projects.length > 0
  const hasEducation = education.length > 0

  return (
    <main className="cv-main">
      {/* Encabezado */}
      <header className="cv-header">
        <h2 className="cv-name">{personalInfo?.nombre || "Tu Nombre"}</h2>
        <h3 className="cv-profession">{personalInfo?.profesion || "Tu Profesión / Especialidad"}</h3>
      </header>

      {/* Perfil / Resumen */}
      {personalInfo?.descripcion && (
        <section>
          <p className="cv-summary">{personalInfo.descripcion}</p>
        </section>
      )}

      {/* Habilidades */}
      {hasSkills && (
        <section>
          <h4 className="cv-section-title">
            <FiCode size={18} /> Habilidades
          </h4>
          <div className="cv-skills-grid">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div key={category} className="cv-skills-category">
                <span className="cv-skills-category-title">{category}</span>
                <div className="cv-skills-chips">
                  {items.map(item => (
                    <span key={item.id} className="cv-skill-chip" title={item.descripcion}>
                      {item.nombre} <span style={{ fontSize: "11px", color: "var(--accent)", fontWeight: "bold" }}>({item.nivel})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experiencia Laboral */}
      {hasExperience && (
        <section>
          <h4 className="cv-section-title">
            <FiBriefcase size={18} /> Experiencia Laboral
          </h4>
          <div className="cv-timeline">
            {experience.map(exp => (
              <div key={exp.id} className="cv-timeline-item">
                <div className="cv-timeline-header">
                  <div>
                    <h5 className="cv-timeline-title">{exp.puesto}</h5>
                    <span className="cv-timeline-subtitle">{exp.empresa}</span>
                  </div>
                  <span className="cv-timeline-date">{exp.periodo}</span>
                </div>
                {exp.descripcion && <p className="cv-timeline-description">{exp.descripcion}</p>}
                {exp.tecnologias && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                    {exp.tecnologias.split(",").map((tech, idx) => (
                      <span key={idx} style={{ fontSize: "11px", color: "var(--accent)", fontStyle: "italic" }}>
                        #{tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Proyectos */}
      {hasProjects && (
        <section>
          <h4 className="cv-section-title">
            <FiLayers size={18} /> Proyectos Destacados
          </h4>
          <div className="cv-projects-list">
            {projects.map(proj => {
              const techList = proj.tecnologias
                ? proj.tecnologias.split(",").map(t => t.trim()).filter(t => t)
                : []
              return (
                <div key={proj.id} className="cv-project-item">
                  <div>
                    <h5 className="cv-project-name">{proj.nombre}</h5>
                    <div className="cv-project-techs">
                      {techList.join(" | ")}
                    </div>
                    <p className="cv-project-desc">{proj.descripcion}</p>
                  </div>
                  <div className="cv-project-links">
                    {proj.repoUrl && (
                      <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="card-link" style={{ fontSize: "12px" }}>
                        <FiGithub size={12} /> Código
                      </a>
                    )}
                    {proj.deployUrl && (
                      <a href={proj.deployUrl} target="_blank" rel="noopener noreferrer" className="card-link" style={{ fontSize: "12px" }}>
                        <FiExternalLink size={12} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Educación */}
      {hasEducation && (
        <section>
          <h4 className="cv-section-title">
            <FiBookOpen size={18} /> Educación y Certificaciones
          </h4>
          <div className="cv-timeline">
            {education.map(edu => (
              <div key={edu.id} className="cv-timeline-item">
                <div className="cv-timeline-header">
                  <div>
                    <h5 className="cv-timeline-title">{edu.programa}</h5>
                    <span className="cv-timeline-subtitle">{edu.institucion}</span>
                  </div>
                  <span className="cv-timeline-date">{edu.periodo}</span>
                </div>
                {edu.descripcion && <p className="cv-timeline-description">{edu.descripcion}</p>}
                {edu.evidencia && (
                  <a href={edu.evidencia} target="_blank" rel="noopener noreferrer" className="card-link" style={{ fontSize: "12px", marginTop: "4px" }}>
                    Ver comprobante
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default PreviewMain
