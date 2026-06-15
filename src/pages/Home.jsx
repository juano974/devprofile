import { Link } from "react-router-dom"
import { FiArrowRight, FiFileText, FiTrendingUp, FiSliders, FiDownload, FiCheck } from "react-icons/fi"
import { useContext } from "react"
import { CVContext } from "../context/CVContext"

function Home() {
  const { cvData } = useContext(CVContext)
  const hasData = cvData.skills?.length > 0 || cvData.experience?.length > 0

  return (
    <div className="home-container animate-fade-in">
      {/* Sección Hero */}
      <section className="hero-section">
        <h1 className="hero-title">
          Construye tu Perfil Profesional de <span>Desarrollador</span>
        </h1>
        
        <p className="hero-subtitle">
          DevProfile es un constructor de currículums interactivo diseñado para programadores. Estructura tu perfil, visualiza tus métricas en tiempo real y exporta un PDF profesional sin esfuerzo.
        </p>
        
        <div className="hero-buttons">
          <Link to="/editor" className="btn btn-primary" style={{ padding: "12px 24px" }}>
            {hasData ? "Continuar Editando" : "Comenzar a Crear"} <FiArrowRight style={{ marginLeft: "8px" }} />
          </Link>
          <Link to="/dashboard" className="btn btn-secondary" style={{ padding: "12px 24px" }}>
            Ver Métricas <FiTrendingUp style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      </section>

      {/* Visual Showcase (Mini-Previsualización) */}
      <section className="showcase-section animate-slide-up">
        <div className="showcase-header">
          <h2 className="showcase-name">
            {cvData.personalInfo?.nombre || "Juan Pérez"}
          </h2>
          <div className="showcase-title">
            {cvData.personalInfo?.profesion || "Full Stack Developer / DevOps Engineer"}
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div className="showcase-preview-card">
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Último Proyecto</span>
            <strong style={{ color: "var(--text-h)" }}>
              {cvData.projects?.[0]?.nombre || "E-Commerce Microservices"}
            </strong>
            <p style={{ fontSize: "13px", color: "var(--text)", margin: 0 }}>
              {cvData.projects?.[0]?.tecnologias || "React, Node.js, Docker, Kubernetes"}
            </p>
          </div>
          
          <div className="showcase-preview-card">
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Experiencia Destacada</span>
            <strong style={{ color: "var(--text-h)" }}>
              {cvData.experience?.[0]?.puesto || "Desarrollador Software Senior"}
            </strong>
            <p style={{ fontSize: "13px", color: "var(--text)", margin: 0 }}>
              {cvData.experience?.[0]?.empresa || "Tech Solutions Inc."}
            </p>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="features-section">
        <h2 className="features-title">Características Diseñadas para Desarrolladores</h2>
        
        <div className="features-grid">
          {/* Tarjeta 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FiSliders />
            </div>
            <h3>Editor Estructurado</h3>
            <p>
              Completa secciones dedicadas para tus habilidades, proyectos destacados con repositorios, experiencia laboral, educación e idiomas.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FiTrendingUp />
            </div>
            <h3>Dashboard Analítico</h3>
            <p>
              Visualiza en tiempo real gráficos dinámicos del balance de tus habilidades por categoría y nivel de dominio con Recharts.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FiDownload />
            </div>
            <h3>Exportación PDF Limpia</h3>
            <p>
              Genera tu currículum en un PDF profesional con márgenes optimizados, sin saltos de página huérfanos y listo para aplicar a vacantes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home