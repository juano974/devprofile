import { FiEdit2, FiTrash2, FiAward } from "react-icons/fi"

function EducationCard({ education, onEdit, onDelete }) {
  return (
    <div className="crud-card">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <span className="card-badge" style={{ margin: 0, background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}>
            {education.periodo}
          </span>
        </div>
        <h4 className="card-title">{education.programa}</h4>
        <div className="card-subtitle">{education.institucion}</div>
        
        {education.descripcion && <p className="card-description">{education.descripcion}</p>}

        {education.evidencia && (
          <div style={{ marginBottom: "16px" }}>
            <a href={education.evidencia} target="_blank" rel="noopener noreferrer" className="card-link">
              <FiAward size={14} /> Ver Credencial / Diploma
            </a>
          </div>
        )}
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(education)}>
          <FiEdit2 size={13} style={{ marginRight: "4px" }} /> Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(education.id)}>
          <FiTrash2 size={13} style={{ marginRight: "4px" }} /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default EducationCard
