import { useContext, useState } from "react"
import { CVContext } from "../../context/CVContext"
import LanguageCard from "./LanguageCard"
import LanguageForm from "../forms/LanguageForm"
import { FiPlus } from "react-icons/fi"

function LanguageList() {
  const { cvData, setCvData } = useContext(CVContext)
  const [isAdding, setIsAdding] = useState(false)
  const [editingLanguage, setEditingLanguage] = useState(null)
  const [duplicateError, setDuplicateError] = useState("")

  const languages = cvData.languages || []

  const handleSave = (langData) => {
    // Check duplicates by language name
    const isDuplicate = languages.some(
      l => l.idioma.toLowerCase().trim() === langData.idioma.toLowerCase().trim() && 
      l.id !== langData.id
    )

    if (isDuplicate) {
      setDuplicateError("Ya tienes este idioma registrado.")
      return
    }

    setDuplicateError("")

    if (langData.id) {
      // Edit
      setCvData(prev => ({
        ...prev,
        languages: prev.languages.map(l => l.id === langData.id ? langData : l)
      }))
      setEditingLanguage(null)
    } else {
      // Create
      const newLang = { ...langData, id: crypto.randomUUID() }
      setCvData(prev => ({
        ...prev,
        languages: [...prev.languages, newLang]
      }))
      setIsAdding(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este idioma?")) {
      setCvData(prev => ({
        ...prev,
        languages: prev.languages.filter(l => l.id !== id)
      }))
    }
  }

  return (
    <div>
      <div className="list-header">
        <h3 className="list-header-title">Idiomas / Languages</h3>
        {!isAdding && !editingLanguage && (
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
          <LanguageForm 
            onSave={handleSave} 
            onCancel={() => setIsAdding(false)} 
          />
        </div>
      )}

      {editingLanguage && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <LanguageForm 
            languageToEdit={editingLanguage}
            onSave={handleSave} 
            onCancel={() => setEditingLanguage(null)} 
          />
        </div>
      )}

      {languages.length === 0 ? (
        <div className="empty-state">
          No has registrado ningún idioma aún. Haz clic en "Agregar" para registrar tus idiomas y niveles.
        </div>
      ) : (
        <div className="cards-grid">
          {languages.map(lang => (
            <LanguageCard 
              key={lang.id} 
              language={lang} 
              onEdit={setEditingLanguage} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageList
