/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useState, useEffect } from "react"
import { CVContext } from "../../context/CVContext"

function PersonalForm() {
  const { personalInfo, setPersonalInfo } = useContext(CVContext)
  
  const [formData, setFormData] = useState({
    nombre: "",
    profesion: "",
    email: "",
    ciudad: "",
    telefono: "",
    descripcion: "",
    github: "",
    linkedin: "",
    portfolio: "",
    repositorio: "",
    imagenUrl: ""
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (personalInfo) {
      setFormData(prev => ({
        ...prev,
        ...personalInfo
      }))
    }
  }, [personalInfo])

  const validateEmail = (email) => {
    if (!email) return true
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

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
    if (!formData.nombre?.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio"
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres"
    }

    if (!formData.profesion?.trim()) {
      newErrors.profesion = "La profesión o especialidad es obligatoria"
    }

    if (!formData.email?.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (formData.github && !validateUrl(formData.github)) {
      newErrors.github = "URL de GitHub no es válida"
    }
    if (formData.linkedin && !validateUrl(formData.linkedin)) {
      newErrors.linkedin = "URL de LinkedIn no es válida"
    }
    if (formData.portfolio && !validateUrl(formData.portfolio)) {
      newErrors.portfolio = "URL del Portafolio no es válida"
    }
    if (formData.repositorio && !validateUrl(formData.repositorio)) {
      newErrors.repositorio = "URL del repositorio no es válida"
    }
    if (formData.imagenUrl && !validateUrl(formData.imagenUrl)) {
      newErrors.imagenUrl = "URL de la imagen de perfil no es válida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }
    setFormData(updated)
    setPersonalInfo(updated) // Save automatically on change

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleBlur = () => {
    validate()
  }

  return (
    <div className="crud-form">
      <h2 className="form-title">Información Personal</h2>
      <p style={{ color: "var(--text)", marginBottom: "24px", fontSize: "14px" }}>
        Los cambios se guardan automáticamente a medida que escribes.
      </p>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Nombre Completo *</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Ej: Juan Daniel Gómez"
            value={formData.nombre || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.nombre && <span className="form-error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Carrera / Profesión *</label>
          <input
            type="text"
            name="profesion"
            className="form-control"
            placeholder="Ej: Desarrollador Full-Stack"
            value={formData.profesion || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.profesion && <span className="form-error">{errors.profesion}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Correo Electrónico *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="ejemplo@correo.com"
            value={formData.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Teléfono (Opcional)</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            placeholder="Ej: +54 9 11 5555-5555"
            value={formData.telefono || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Ciudad o Ubicación</label>
          <input
            type="text"
            name="ciudad"
            className="form-control"
            placeholder="Ej: Buenos Aires, Argentina"
            value={formData.ciudad || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">URL de Imagen de Perfil (Avatar)</label>
          <input
            type="text"
            name="imagenUrl"
            className="form-control"
            placeholder="https://images.unsplash.com/... o avatar URL"
            value={formData.imagenUrl || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.imagenUrl && <span className="form-error">{errors.imagenUrl}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">O Subir Foto Local (Recomendado para evitar bloqueos en PDF)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                if (file.size > 1500000) {
                  alert("La imagen es muy grande. Selecciona una de menos de 1.5MB para guardarla localmente.")
                  return
                }
                const reader = new FileReader()
                reader.onloadend = () => {
                  setFormData(prev => ({ ...prev, imagenUrl: reader.result }))
                  setPersonalInfo(prev => ({ ...prev, imagenUrl: reader.result }))
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>
      </div>

      {formData.imagenUrl && (
        <div style={{ display: "flex", gap: "16px", alignItems: "center", margin: "16px 0", padding: "16px", background: "var(--social-bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
          <img 
            src={formData.imagenUrl} 
            alt="Avatar Preview" 
            style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80" }}
          />
          <div>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-h)" }}>Vista previa del Avatar</span>
            <p style={{ fontSize: "12px", color: "var(--text)" }}>La imagen se cargó correctamente</p>
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Descripción o Perfil Profesional (Resumen)</label>
        <textarea
          name="descripcion"
          className="form-control"
          rows="4"
          placeholder="Escribe un resumen profesional impactante de tus habilidades, pasiones y lo que buscas aportar..."
          value={formData.descripcion || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-h)", margin: "24px 0 16px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
        Enlaces y Redes Profesionales
      </h3>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">URL de GitHub</label>
          <input
            type="text"
            name="github"
            className="form-control"
            placeholder="https://github.com/usuario"
            value={formData.github || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.github && <span className="form-error">{errors.github}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">URL de LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            className="form-control"
            placeholder="https://linkedin.com/in/usuario"
            value={formData.linkedin || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.linkedin && <span className="form-error">{errors.linkedin}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Portafolio Web</label>
          <input
            type="text"
            name="portfolio"
            className="form-control"
            placeholder="https://miportafolio.com"
            value={formData.portfolio || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.portfolio && <span className="form-error">{errors.portfolio}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Repositorio del Proyecto (GitHub)</label>
          <input
            type="text"
            name="repositorio"
            className="form-control"
            placeholder="https://github.com/usuario/devprofile"
            value={formData.repositorio || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.repositorio && <span className="form-error">{errors.repositorio}</span>}
        </div>
      </div>
    </div>
  )
}

export default PersonalForm