/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"

function SkillForm({ skillToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    nivel: "",
    descripcion: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (skillToEdit) {
      setFormData(skillToEdit)
    } else {
      setFormData({
        nombre: "",
        categoria: "",
        nivel: "",
        descripcion: ""
      })
    }
    setErrors({})
  }, [skillToEdit])

  const validate = () => {
    const newErrors = {}
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre de la habilidad es obligatorio"
    } else if (formData.nombre.length < 2 || formData.nombre.length > 50) {
      newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres"
    }
    
    if (!formData.categoria) {
      newErrors.categoria = "La categoría es obligatoria"
    }
    
    if (!formData.nivel) {
      newErrors.nivel = "El nivel es obligatorio"
    }

    if (formData.descripcion && formData.descripcion.length > 150) {
      newErrors.descripcion = "La descripción no puede exceder los 150 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
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
        {skillToEdit ? "Editar Habilidad" : "Agregar Nueva Habilidad"}
      </h3>
      
      <div className="form-group">
        <label className="form-label">Nombre de la habilidad *</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Ej: React, Node.js, CSS Grid"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <span className="form-error">{errors.nombre}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Categoría *</label>
          <select
            name="categoria"
            className="form-control"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Programación">Programación</option>
            <option value="Bases de Datos">Bases de Datos</option>
            <option value="Diseño Web">Diseño Web</option>
            <option value="Idiomas">Idiomas</option>
            <option value="Herramientas">Herramientas de Desarrollo</option>
            <option value="Habilidades Blandas">Habilidades Blandas</option>
          </select>
          {errors.categoria && <span className="form-error">{errors.categoria}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Nivel de Dominio *</label>
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
          </select>
          {errors.nivel && <span className="form-error">{errors.nivel}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Descripción Breve (Opcional)</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="2"
          placeholder="Describe brevemente cómo aplicas esta habilidad"
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>
        {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).some(x => errors[x])}>
          {skillToEdit ? "Actualizar" : "Agregar"}
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

export default SkillForm
