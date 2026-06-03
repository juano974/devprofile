import { useContext, useState } from "react"
import { CVContext } from "../../context/CVContext"
import EducationCard from "./EducationCard"
import EducationForm from "../forms/EducationForm"
import { FiPlus } from "react-icons/fi"

function EducationList() {
  const { cvData, setCvData } = useContext(CVContext)
  const [isAdding, setIsAdding] = useState(false)
  const [editingEducation, setEditingEducation] = useState(null)
  const [duplicateError, setDuplicateError] = useState("")

  const education = cvData.education || []

  const handleSave = (eduData) => {
    // Check duplicates by program + institution
    const isDuplicate = education.some(
      e => e.programa.toLowerCase().trim() === eduData.programa.toLowerCase().trim() && 
      e.institucion.toLowerCase().trim() === eduData.institucion.toLowerCase().trim() &&
      e.id !== eduData.id
    )

    if (isDuplicate) {
      setDuplicateError("Ya tienes un registro con este título e institución.")
      return
    }

    setDuplicateError("")

    if (eduData.id) {
      // Edit
      setCvData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === eduData.id ? eduData : e)
      }))
      setEditingEducation(null)
    } else {
      // Create
      const newEdu = { ...eduData, id: crypto.randomUUID() }
      setCvData(prev => ({
        ...prev,
        education: [...prev.education, newEdu]
      }))
      setIsAdding(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro de educación?")) {
      setCvData(prev => ({
        ...prev,
        education: prev.education.filter(e => e.id !== id)
      }))
    }
  }

  return (
    <div>
      <div className="list-header">
        <h3 className="list-header-title">Educación y Certificaciones</h3>
        {!isAdding && !editingEducation && (
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
          <EducationForm 
            onSave={handleSave} 
            onCancel={() => setIsAdding(false)} 
          />
        </div>
      )}

      {editingEducation && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <EducationForm 
            educationToEdit={editingEducation}
            onSave={handleSave} 
            onCancel={() => setEditingEducation(null)} 
          />
        </div>
      )}

      {education.length === 0 ? (
        <div className="empty-state">
          No has registrado estudios ni certificaciones aún. Haz clic en "Agregar" para registrar tu formación.
        </div>
      ) : (
        <div className="cards-grid">
          {education.map(edu => (
            <EducationCard 
              key={edu.id} 
              education={edu} 
              onEdit={setEditingEducation} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationList
