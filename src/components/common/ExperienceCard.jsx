import { FiEdit2, FiTrash2, FiBriefcase } from "react-icons/fi"

function ExperienceCard({ experience, onEdit, onDelete }) {
  const techList = experience.tecnologias
    ? experience.tecnologias.split(",").map(t => t.trim()).filter(t => t)
    : []

  return (
    <div className="crud-card">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <span className="card-badge" style={{ margin: 0, background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
            {experience.periodo}
          </span>
        </div>
        <h4 className="card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FiBriefcase size={16} style={{ color: "var(--accent)" }} />
          {experience.puesto}
        </h4>
        <div className="card-subtitle">{experience.empresa}</div>
        
        {experience.descripcion && <p className="card-description">{experience.descripcion}</p>}

        {techList.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
            {techList.map((tech, idx) => (
              <span 
                key={idx} 
                className="card-badge" 
                style={{ fontSize: "10px", padding: "1px 5px", margin: 0, background: "rgba(0, 0, 0, 0.05)", color: "var(--text)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(experience)}>
          <FiEdit2 size={13} style={{ marginRight: "4px" }} /> Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(experience.id)}>
          <FiTrash2 size={13} style={{ marginRight: "4px" }} /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default ExperienceCard
