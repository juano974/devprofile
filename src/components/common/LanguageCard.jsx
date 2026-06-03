import { FiEdit2, FiTrash2, FiGlobe } from "react-icons/fi"

function LanguageCard({ language, onEdit, onDelete }) {
  return (
    <div className="crud-card">
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <span className="card-badge" style={{ margin: 0, background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
            {language.nivel}
          </span>
        </div>
        <h4 className="card-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FiGlobe size={16} style={{ color: "var(--accent)" }} />
          {language.idioma}
        </h4>
        
        {language.descripcion && <p className="card-description" style={{ marginTop: "8px" }}>{language.descripcion}</p>}
      </div>
      
      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(language)}>
          <FiEdit2 size={13} style={{ marginRight: "4px" }} /> Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(language.id)}>
          <FiTrash2 size={13} style={{ marginRight: "4px" }} /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default LanguageCard
