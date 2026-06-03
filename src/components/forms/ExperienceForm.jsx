/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"

function ExperienceForm({ experienceToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    puesto: "",
    empresa: "",
    periodo: "",
    tecnologias: "",
    descripcion: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (experienceToEdit) {
      setFormData(experienceToEdit)
    } else {
      setFormData({
        puesto: "",
        empresa: "",
        periodo: "",
        tecnologias: "",
        descripcion: ""
      })
    }
    setErrors({})
  }, [experienceToEdit])

  const validate = () => {
    const newErrors = {}
    if (!formData.puesto.trim()) {
      newErrors.puesto = "El puesto o cargo es obligatorio"
    }
    
    if (!formData.empresa.trim()) {
      newErrors.empresa = "La empresa o institución es obligatoria"
    }

    if (!formData.periodo.trim()) {
      newErrors.periodo = "El periodo de tiempo es obligatorio (Ej: 2022 - Presente, 6 meses)"
    }

    if (formData.descripcion && formData.descripcion.length > 250) {
      newErrors.descripcion = "La descripción no puede exceder los 250 caracteres"
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
        {experienceToEdit ? "Editar Experiencia Laboral" : "Agregar Nueva Experiencia Laboral"}
      </h3>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Puesto o Cargo *</label>
          <input
            type="text"
            name="puesto"
            className="form-control"
            placeholder="Ej: Desarrollador Front-End, UX Designer"
            value={formData.puesto}
            onChange={handleChange}
          />
          {errors.puesto && <span className="form-error">{errors.puesto}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Empresa / Organización *</label>
          <input
            type="text"
            name="empresa"
            className="form-control"
            placeholder="Ej: Google, Freelance, StartUp"
            value={formData.empresa}
            onChange={handleChange}
          />
          {errors.empresa && <span className="form-error">{errors.empresa}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Periodo *</label>
          <input
            type="text"
            name="periodo"
            className="form-control"
            placeholder="Ej: Ene 2023 - Presente, 2021 - 2022"
            value={formData.periodo}
            onChange={handleChange}
          />
          {errors.periodo && <span className="form-error">{errors.periodo}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Tecnologías Utilizadas (Separadas por comas)</label>
          <input
            type="text"
            name="tecnologias"
            className="form-control"
            placeholder="Ej: React, Redux, Sass, Jest"
            value={formData.tecnologias}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Descripción de Actividades (Opcional)</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="3"
          placeholder="Describe tus principales responsabilidades y logros clave..."
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>
        {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).some(x => errors[x])}>
          {experienceToEdit ? "Actualizar" : "Agregar"}
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

export default ExperienceForm
