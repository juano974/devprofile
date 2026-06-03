/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"

function LanguageForm({ languageToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    idioma: "",
    nivel: "",
    descripcion: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (languageToEdit) {
      setFormData(languageToEdit)
    } else {
      setFormData({
        idioma: "",
        nivel: "",
        descripcion: ""
      })
    }
    setErrors({})
  }, [languageToEdit])

  const validate = () => {
    const newErrors = {}
    if (!formData.idioma.trim()) {
      newErrors.idioma = "El idioma es obligatorio"
    } else if (formData.idioma.length < 3) {
      newErrors.idioma = "El nombre del idioma debe tener al menos 3 caracteres"
    }
    
    if (!formData.nivel) {
      newErrors.nivel = "El nivel es obligatorio"
    }

    if (formData.descripcion && formData.descripcion.length > 100) {
      newErrors.descripcion = "La descripción no puede exceder los 100 caracteres"
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
        {languageToEdit ? "Editar Idioma" : "Agregar Nuevo Idioma"}
      </h3>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Idioma *</label>
          <input
            type="text"
            name="idioma"
            className="form-control"
            placeholder="Ej: Inglés, Alemán, Portugués"
            value={formData.idioma}
            onChange={handleChange}
          />
          {errors.idioma && <span className="form-error">{errors.idioma}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Nivel *</label>
          <select
            name="nivel"
            className="form-control"
            value={formData.nivel}
            onChange={handleChange}
          >
            <option value="">Selecciona nivel</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Nativo">Nativo / Bilingüe</option>
          </select>
          {errors.nivel && <span className="form-error">{errors.nivel}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Detalles / Certificación (Opcional)</label>
        <input
          type="text"
          name="descripcion"
          className="form-control"
          placeholder="Ej: TOEFL iBT 95, TOEFL C1, o uso conversacional..."
          value={formData.descripcion}
          onChange={handleChange}
        />
        {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).some(x => errors[x])}>
          {languageToEdit ? "Actualizar" : "Agregar"}
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

export default LanguageForm
