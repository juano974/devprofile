import { useContext, useState } from "react"
import { CVContext } from "../../context/CVContext"
import ExperienceCard from "./ExperienceCard"
import ExperienceForm from "../forms/ExperienceForm"
import { FiPlus } from "react-icons/fi"

function ExperienceList() {
  const { cvData, setCvData } = useContext(CVContext)
  const [isAdding, setIsAdding] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [duplicateError, setDuplicateError] = useState("")

  const experience = cvData.experience || []

  const handleSave = (expData) => {
    // Check duplicates by position + company
    const isDuplicate = experience.some(
      e => e.puesto.toLowerCase().trim() === expData.puesto.toLowerCase().trim() && 
      e.empresa.toLowerCase().trim() === expData.empresa.toLowerCase().trim() &&
      e.id !== expData.id
    )

    if (isDuplicate) {
      setDuplicateError("Ya tienes registrada esta misma experiencia laboral.")
      return
    }

    setDuplicateError("")

    if (expData.id) {
      // Edit
      setCvData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === expData.id ? expData : e)
      }))
      setEditingExperience(null)
    } else {
      // Create
      const newExp = { ...expData, id: crypto.randomUUID() }
      setCvData(prev => ({
        ...prev,
        experience: [...prev.experience, newExp]
      }))
      setIsAdding(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta experiencia laboral?")) {
      setCvData(prev => ({
        ...prev,
        experience: prev.experience.filter(e => e.id !== id)
      }))
    }
  }

  return (
    <div>
      <div className="list-header">
        <h3 className="list-header-title">Experiencia Laboral</h3>
        {!isAdding && !editingExperience && (
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
          <ExperienceForm 
            onSave={handleSave} 
            onCancel={() => setIsAdding(false)} 
          />
        </div>
      )}

      {editingExperience && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <ExperienceForm 
            experienceToEdit={editingExperience}
            onSave={handleSave} 
            onCancel={() => setEditingExperience(null)} 
          />
        </div>
      )}

      {experience.length === 0 ? (
        <div className="empty-state">
          No has registrado ninguna experiencia laboral aún. Haz clic en "Agregar" para registrar tus empleos y cargos.
        </div>
      ) : (
        <div className="cards-grid">
          {experience.map(exp => (
            <ExperienceCard 
              key={exp.id} 
              experience={exp} 
              onEdit={setEditingExperience} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceList
