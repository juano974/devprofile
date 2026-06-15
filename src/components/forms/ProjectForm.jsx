/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"

function ProjectForm({ projectToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tecnologias: "",
    repoUrl: "",
    deployUrl: "",
    imagen: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit)
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        tecnologias: "",
        repoUrl: "",
        deployUrl: "",
        imagen: ""
      })
    }
    setErrors({})
  }, [projectToEdit])

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
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del proyecto es obligatorio"
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres"
    }
    
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria"
    } else if (formData.descripcion.length > 250) {
      newErrors.descripcion = "La descripción no puede exceder los 250 caracteres"
    }

    if (!formData.tecnologias.trim()) {
      newErrors.tecnologias = "Especificar tecnologías es obligatorio (ej: React, CSS, Node)"
    }
    
    if (formData.repoUrl && !validateUrl(formData.repoUrl)) {
      newErrors.repoUrl = "La URL del repositorio no es válida (debe incluir http:// o https://)"
    }

    if (formData.deployUrl && !validateUrl(formData.deployUrl)) {
      newErrors.deployUrl = "La URL del deploy no es válida (debe incluir http:// o https://)"
    }

    if (formData.imagen && !validateUrl(formData.imagen)) {
      newErrors.imagen = "La URL de la imagen no es válida (debe incluir http:// o https://)"
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
        {projectToEdit ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}
      </h3>
      
      <div className="form-group">
        <label className="form-label">Nombre del proyecto *</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Ej: E-commerce Premium, DevProfile"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <span className="form-error">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Descripción * (Máx 250 caract.)</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="3"
          placeholder="Describe brevemente el proyecto, su objetivo y tu rol..."
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>
        {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Tecnologías * (Separadas por comas)</label>
        <input
          type="text"
          name="tecnologias"
          className="form-control"
          placeholder="Ej: React, Node.js, Express, MongoDB"
          value={formData.tecnologias}
          onChange={handleChange}
        />
        {errors.tecnologias && <span className="form-error">{errors.tecnologias}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">URL del Repositorio (GitHub, GitLab, etc.)</label>
          <input
            type="text"
            name="repoUrl"
            className="form-control"
            placeholder="https://github.com/..."
            value={formData.repoUrl}
            onChange={handleChange}
          />
          {errors.repoUrl && <span className="form-error">{errors.repoUrl}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">URL del Deploy (Producción / Demo)</label>
          <input
            type="text"
            name="deployUrl"
            className="form-control"
            placeholder="https://mi-proyecto.demo..."
            value={formData.deployUrl}
            onChange={handleChange}
          />
          {errors.deployUrl && <span className="form-error">{errors.deployUrl}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">URL de Imagen / Captura del Proyecto (Opcional)</label>
        <input
          type="text"
          name="imagen"
          className="form-control"
          placeholder="https://images.unsplash.com/... o enlace de captura"
          value={formData.imagen}
          onChange={handleChange}
        />
        {errors.imagen && <span className="form-error">{errors.imagen}</span>}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).some(x => errors[x])}>
          {projectToEdit ? "Actualizar" : "Agregar"}
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

export default ProjectForm
