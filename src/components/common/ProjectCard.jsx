import { FiEdit2, FiTrash2, FiGithub, FiExternalLink } from "react-icons/fi"

function ProjectCard({ project, onEdit, onDelete }) {
  // Split technologies by comma
  const techList = project.tecnologias
    ? project.tecnologias.split(",").map(t => t.trim()).filter(t => t)
    : []

  return (
    <div className="crud-card">
      <div>
        {project.imagen && (
          <img 
            src={project.imagen} 
            alt={project.nombre} 
            className="project-img-preview" 
            onError={(e) => {
              e.target.style.display = 'none' // Hide image if URL is broken
            }}
          />
        )}
        <h4 className="card-title">{project.nombre}</h4>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "8px 0 12px" }}>
          {techList.map((tech, idx) => (
            <span 
              key={idx} 
              className="card-badge" 
              style={{ fontSize: "11px", padding: "2px 6px", margin: 0, background: "rgba(170, 59, 255, 0.08)", color: "var(--accent)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="card-description">{project.descripcion}</p>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              <FiGithub size={14} /> Repositorio
            </a>
          )}
          {project.deployUrl && (
            <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="card-link">
              <FiExternalLink size={14} /> Demo en vivo
            </a>
          )}
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(project)}>
          <FiEdit2 size={13} style={{ marginRight: "4px" }} /> Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(project.id)}>
          <FiTrash2 size={13} style={{ marginRight: "4px" }} /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
