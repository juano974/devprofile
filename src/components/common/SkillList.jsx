import { useContext, useState } from "react"
import { CVContext } from "../../context/CVContext"
import SkillCard from "./SkillCard"
import SkillForm from "../forms/SkillForm"
import { FiPlus } from "react-icons/fi"

function SkillList() {
  const { cvData, setCvData } = useContext(CVContext)
  const [isAdding, setIsAdding] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [duplicateError, setDuplicateError] = useState("")

  const skills = cvData.skills || []

  const handleSave = (skillData) => {
    // Check duplicates (by name, case-insensitive)
    const isDuplicate = skills.some(
      s => s.nombre.toLowerCase().trim() === skillData.nombre.toLowerCase().trim() && 
      s.id !== skillData.id
    )

    if (isDuplicate) {
      setDuplicateError("Ya tienes una habilidad registrada con este nombre.")
      return
    }

    setDuplicateError("")

    if (skillData.id) {
      // Edit
      setCvData(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === skillData.id ? skillData : s)
      }))
      setEditingSkill(null)
    } else {
      // Create
      const newSkill = { ...skillData, id: crypto.randomUUID() }
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }))
      setIsAdding(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta habilidad?")) {
      setCvData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.id !== id)
      }))
    }
  }

  return (
    <div>
      <div className="list-header">
        <h3 className="list-header-title">Habilidades / Skills</h3>
        {!isAdding && !editingSkill && (
          <button className="btn btn-primary" onClick={() => { setIsAdding(true); setDuplicateError(""); }}>
            <FiPlus size={16} style={{ marginRight: "6px" }} /> Agregar
          </button>
        )}
      </div>

      {duplicateError && (
        <div className="form-error" style={{ marginBottom: "16px", padding: "10px", background: "rgba(255, 77, 79, 0.1)", borderRadius: "6px" }}>
          {duplicateError}
        </div>
      )}

      {isAdding && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <SkillForm 
            onSave={handleSave} 
            onCancel={() => setIsAdding(false)} 
          />
        </div>
      )}

      {editingSkill && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <SkillForm 
            skillToEdit={editingSkill}
            onSave={handleSave} 
            onCancel={() => setEditingSkill(null)} 
          />
        </div>
      )}

      {skills.length === 0 ? (
        <div className="empty-state">
          No has agregado ninguna habilidad aún. Haz clic en "Agregar" para registrar tus habilidades.
        </div>
      ) : (
        <div className="cards-grid">
          {skills.map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              onEdit={setEditingSkill} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillList
