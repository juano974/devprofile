import { FiCode, FiLayers, FiBriefcase, FiGlobe } from "react-icons/fi"

function DashboardStats({ cvData }) {
  const skills = cvData.skills || []
  const projects = cvData.projects || []
  const experience = cvData.experience || []
  const languages = cvData.languages || []

  // 1. Predominant Skill Category
  let majorCategory = "Ninguna"
  if (skills.length > 0) {
    const categoryCounts = skills.reduce((acc, skill) => {
      const cat = skill.categoria || "Otros"
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {})
    
    const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])
    if (sortedCategories.length > 0) {
      majorCategory = sortedCategories[0][0]
    }
  }

  // 2. Unique Project Technologies
  let uniqueTechCount = 0
  if (projects.length > 0) {
    const allTechs = projects.flatMap(p => 
      p.tecnologias 
        ? p.tecnologias.split(",").map(t => t.trim().toLowerCase()).filter(Boolean)
        : []
    )
    uniqueTechCount = new Set(allTechs).size
  }

  // 3. Most Recent Work Experience
  let experienceDetail = "Sin experiencia registrada"
  if (experience.length > 0) {
    // Sort or pick first one (assuming user entered most recent first)
    const recent = experience[0]
    experienceDetail = `${recent.puesto} en ${recent.empresa}`
  }

  // 4. Main Language
  let languageDetail = "Sin idiomas registrados"
  if (languages.length > 0) {
    const mainLang = languages[0]
    languageDetail = `${mainLang.idioma} (${mainLang.nivel})`
  }

  const statCards = [
    {
      id: "skills",
      label: "Habilidades",
      value: skills.length,
      detail: skills.length > 0 ? `Área principal: ${majorCategory}` : "Registra habilidades",
      icon: <FiCode />
    },
    {
      id: "projects",
      label: "Proyectos",
      value: projects.length,
      detail: projects.length > 0 ? `${uniqueTechCount} tecnologías utilizadas` : "Sube tus proyectos",
      icon: <FiLayers />
    },
    {
      id: "experience",
      label: "Experiencia",
      value: experience.length,
      detail: experienceDetail,
      icon: <FiBriefcase />
    },
    {
      id: "languages",
      label: "Idiomas",
      value: languages.length,
      detail: languageDetail,
      icon: <FiGlobe />
    }
  ]

  return (
    <div className="stats-grid">
      {statCards.map(card => (
        <div key={card.id} className="stat-card">
          <div>
            <div className="stat-card-header">
              <span className="stat-label">{card.label}</span>
              <div className="stat-icon-wrapper">{card.icon}</div>
            </div>
            <div className="stat-value">{card.value}</div>
          </div>
          <div className="stat-detail" title={card.detail}>
            {card.detail}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
