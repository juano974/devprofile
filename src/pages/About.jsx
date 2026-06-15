import { FiLayers, FiCpu, FiGithub, FiCheckCircle } from "react-icons/fi"

function About() {
  const techStack = [
    { name: "React 19", desc: "Biblioteca para construir la interfaz reactiva y el flujo de datos.", icon: <FiCpu /> },
    { name: "Vite 8", desc: "Entorno de desarrollo ultra rápido y empaquetador moderno.", icon: <FiCpu /> },
    { name: "Recharts", desc: "Generación de gráficos interactivos del perfil del usuario en el Dashboard.", icon: <FiLayers /> },
    { name: "html2pdf.js", desc: "Motor de renderizado e impresión PDF de alta precisión y calidad de una página.", icon: <FiCheckCircle /> },
    { name: "LocalStorage", desc: "Persistencia automática de datos del CV en el navegador sin base de datos externa.", icon: <FiCheckCircle /> },
    { name: "CSS3 Vanilla", desc: "Estilos fluidos, sombras premium y glassmorphism personalizados sin dependencias.", icon: <FiLayers /> },
  ]

  return (
    <div className="about-container animate-fade-in">
      <header className="about-header">
        <h1>Acerca de DevProfile</h1>
        <p style={{ fontSize: "16px", color: "var(--text)", margin: 0 }}>
          Descubre los detalles técnicos del generador de currículums interactivo de alta fidelidad para desarrolladores.
        </p>
      </header>

      {/* Desarrolladores */}
      <section>
        <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>Desarrolladores del Proyecto</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          
          <div className="about-card" style={{ margin: 0, padding: "24px" }}>
            <h3 style={{ fontSize: "18px", color: "var(--accent)", marginBottom: "4px" }}>Juan Daniel Arriaga Vera</h3>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", display: "block", marginBottom: "12px" }}>ING. Sistemas Computacionales</span>
            <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "14px", color: "var(--text)", lineHeight: "1.6" }}>
              <li>Desarrollo Frontend</li>
              <li>Gestión de estado global</li>
              <li>Persistencia de datos</li>
              <li>Implementación de formularios</li>
            </ul>
          </div>
          
          <div className="about-card" style={{ margin: 0, padding: "24px" }}>
            <h3 style={{ fontSize: "18px", color: "var(--accent)", marginBottom: "4px" }}>Omar Romero Lopez</h3>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-muted)", display: "block", marginBottom: "12px" }}>ING. Sistemas Computacionales</span>
            <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "14px", color: "var(--text)", lineHeight: "1.6" }}>
              <li>Desarrollo Backend & Integración</li>
              <li>Exportación e Impresión PDF</li>
              <li>Diseño e Interactividad de Métricas</li>
              <li>Optimización de Rendimiento & Temas</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Sección del Repositorio e Información del Proyecto */}
      <section className="about-card" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h3 style={{ fontSize: "18px", marginBottom: "4px" }}>Proyecto Académico — DevProfile</h3>
          <p style={{ fontSize: "14px", color: "var(--text)", margin: 0 }}>
            Implementado bajo estrictas directrices de UI/UX, responsive y optimización de renderizado.
          </p>
        </div>
        <a 
          href="https://github.com/juano974/devprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
          <FiGithub /> Ver en GitHub
        </a>
      </section>

      {/* Tarjeta Principal */}
      <section className="about-card animate-slide-up">
        <h2 style={{ fontSize: "22px", marginBottom: "8px" }}>¿Qué es DevProfile?</h2>
        <p style={{ fontSize: "15px", color: "var(--text)", margin: 0 }}>
          Es una aplicación web diseñada específicamente para que los profesionales del desarrollo de software puedan mantener actualizado su portafolio e historial laboral de forma interactiva. 
          Almacena los datos en tiempo real de forma local, proporciona retroalimentación analítica sobre las áreas de especialidad del desarrollador y genera un entregable formal en PDF optimizado con un diseño limpio.
        </p>
      </section>

      {/* Grid de Pila Tecnológica */}
      <section>
        <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>Pila Tecnológica (Tech Stack)</h2>
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-card transition-all-fast">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--accent)", display: "flex", fontSize: "18px" }}>
                  {tech.icon}
                </span>
                <span className="tech-title">{tech.name}</span>
              </div>
              <p className="tech-desc">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  )
}

export default About