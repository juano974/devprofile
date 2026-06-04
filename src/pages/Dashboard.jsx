import { useContext } from "react"
import { Link } from "react-router-dom"
import { CVContext } from "../context/CVContext"
import DashboardStats from "../components/dashboard/DashboardStats"
import SkillChart from "../components/dashboard/SkillChart"
import { FiArrowRight, FiActivity } from "react-icons/fi"
import "../styles/dashboard.css"

function Dashboard() {
  const { cvData } = useContext(CVContext)
  
  const skills = cvData.skills || []
  const hasSkills = skills.length > 0

  // Fallback labels for welcome message
  const userName = cvData.personalInfo?.nombre?.trim() || "Profesional"
  const userProfession = cvData.personalInfo?.profesion?.trim() 
    ? ` como ${cvData.personalInfo.profesion}` 
    : ""

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard Profesional</h1>
        <p>
          ¡Hola, {userName}! Visualiza y analiza el balance de tu perfil profesional{userProfession} en tiempo real.
        </p>
      </div>

      {!hasSkills ? (
        <div className="dashboard-empty">
          <div className="empty-icon-pulse">
            <FiActivity />
          </div>
          <h2>Tu Dashboard está esperando por ti</h2>
          <p>
            Para poder generar las métricas de tu perfil profesional, primero debes agregar tus habilidades. 
            Regresa al Editor y agrega habilidades, proyectos o idiomas para verlos reflejados aquí.
          </p>
          <Link to="/editor" className="btn btn-primary">
            Comenzar en el Editor <FiArrowRight style={{ marginLeft: "6px" }} />
          </Link>
        </div>
      ) : (
        <>
          <DashboardStats cvData={cvData} />
          <SkillChart skills={skills} />
        </>
      )}
    </div>
  )
}

export default Dashboard