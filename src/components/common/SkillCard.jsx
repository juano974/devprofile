import { FiEdit2, FiTrash2 } from "react-icons/fi"

function SkillCard({ skill, onEdit, onDelete }) {
  return (
    <div className="crud-card">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <span className="card-badge" style={{ margin: 0 }}>{skill.categoria}</span>
          <span className="card-badge" style={{ 
            background: skill.nivel === "Avanzado" ? "rgba(16, 185, 129, 0.15)" : skill.nivel === "Intermedio" ? "rgba(245, 158, 11, 0.15)" : "rgba(59, 130, 246, 0.15)",
            color: skill.nivel === "Avanzado" ? "#10b981" : skill.nivel === "Intermedio" ? "#f59e0b" : "#3b82f6",
            margin: 0
          }}>
            {skill.nivel}
          </span>
        </div>
        <h4 className="card-title">{skill.nombre}</h4>
        {skill.descripcion && <p className="card-description">{skill.descripcion}</p>}
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(skill)}>
          <FiEdit2 size={13} style={{ marginRight: "4px" }} /> Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(skill.id)}>
          <FiTrash2 size={13} style={{ marginRight: "4px" }} /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default SkillCard
