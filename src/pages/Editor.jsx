import { useState } from "react"
import { FiUser, FiCode, FiBriefcase, FiBookOpen, FiGlobe, FiLayers } from "react-icons/fi"
import PersonalForm from "../components/forms/PersonalForm"
import SkillList from "../components/common/SkillList"
import ProjectList from "../components/common/ProjectList"
import EducationList from "../components/common/EducationList"
import ExperienceList from "../components/common/ExperienceList"
import LanguageList from "../components/common/LanguageList"
import "../styles/crud.css"

function Editor() {
  const [activeTab, setActiveTab] = useState("personal")

  const tabs = [
    { id: "personal", label: "Información Personal", icon: <FiUser /> },
    { id: "skills", label: "Habilidades", icon: <FiCode /> },
    { id: "projects", label: "Proyectos", icon: <FiLayers /> },
    { id: "education", label: "Educación", icon: <FiBookOpen /> },
    { id: "experience", label: "Experiencia Laboral", icon: <FiBriefcase /> },
    { id: "languages", label: "Idiomas", icon: <FiGlobe /> },
  ]

  const renderActiveContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalForm />
      case "skills":
        return <SkillList />
      case "projects":
        return <ProjectList />
      case "education":
        return <EducationList />
      case "experience":
        return <ExperienceList />
      case "languages":
        return <LanguageList />
      default:
        return <PersonalForm />
    }
  }

  return (
    <div style={{ padding: "0 20px" }}>
      <h1 style={{ textAlign: "left", fontSize: "36px", marginBottom: "8px", paddingLeft: "24px" }}>
        Editor de CV
      </h1>
      <p style={{ textAlign: "left", color: "var(--text)", paddingLeft: "24px", marginBottom: "24px" }}>
        Construye tu perfil profesional paso a paso. Todos los cambios se guardan automáticamente.
      </p>
      
      <div className="editor-container">
        <aside className="editor-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>
        
        <main className="editor-content">
          {renderActiveContent()}
        </main>
      </div>
    </div>
  )
}

export default Editor