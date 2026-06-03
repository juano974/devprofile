/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"

function EducationForm({ educationToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    institucion: "",
    programa: "",
    periodo: "",
    descripcion: "",
    evidencia: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (educationToEdit) {
      setFormData(educationToEdit)
    } else {
      setFormData({
        institucion: "",
        programa: "",
        periodo: "",
        descripcion: "",
        evidencia: ""
      })
    }
    setErrors({})
  }, [educationToEdit])

  const validateUrl = (url) => {
    if (!url) return true
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.institucion.trim()) {
      newErrors.institucion = "La institución es obligatoria"
    }
    
    if (!formData.programa.trim()) {
      newErrors.programa = "El título o programa es obligatorio"
    }

    if (!formData.periodo.trim()) {
      newErrors.periodo = "El periodo o año es obligatorio (Ej: 2021 - 2025, 2023)"
    }
    
    if (formData.evidencia && !validateUrl(formData.evidencia)) {
      newErrors.evidencia = "El enlace de evidencia debe ser una URL válida (ej: http://... o https://...)"
    }

    if (formData.descripcion && formData.descripcion.length > 200) {
      newErrors.descripcion = "La descripción no puede exceder los 200 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3 className="form-subtitle" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>
        {educationToEdit ? "Editar Educación/Certificación" : "Agregar Nueva Educación/Certificación"}
      </h3>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Institución *</label>
          <input
            type="text"
            name="institucion"
            className="form-control"
            placeholder="Ej: Universidad de Buenos Aires, Coursera"
            value={formData.institucion}
            onChange={handleChange}
          />
          {errors.institucion && <span className="form-error">{errors.institucion}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Título / Certificación / Curso *</label>
          <input
            type="text"
            name="programa"
            className="form-control"
            placeholder="Ej: Ing. en Sistemas, Front-End Developer"
            value={formData.programa}
            onChange={handleChange}
          />
          {errors.programa && <span className="form-error">{errors.programa}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Periodo / Año *</label>
          <input
            type="text"
            name="periodo"
            className="form-control"
            placeholder="Ej: 2018 - 2023, 2024"
            value={formData.periodo}
            onChange={handleChange}
          />
          {errors.periodo && <span className="form-error">{errors.periodo}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Enlace de Evidencia (Diploma, PDF, URL etc.)</label>
          <input
            type="text"
            name="evidencia"
            className="form-control"
            placeholder="https://credencial.com/..."
            value={formData.evidencia}
            onChange={handleChange}
          />
          {errors.evidencia && <span className="form-error">{errors.evidencia}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Descripción Breve (Opcional)</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="2"
          placeholder="Comentarios adicionales sobre tus estudios, materias clave o logros..."
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>
        {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).some(x => errors[x])}>
          {educationToEdit ? "Actualizar" : "Agregar"}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default EducationForm
