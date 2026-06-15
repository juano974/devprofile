import { useRef, useState, useContext } from "react"
import CVPreview from "../components/preview/CVPreview"
import { Link } from "react-router-dom"
import { FiEdit2, FiDownload, FiLoader, FiAlertCircle } from "react-icons/fi"
import { generatePDF } from "../utils/pdfGenerator"
import { CVContext } from "../context/CVContext"

function Preview() { 
  const cvRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const { cvData, personalInfo } = useContext(CVContext)

  // Validar campos obligatorios
  const validateRequiredFields = () => {
    const errors = []
    
    // Campos personales obligatorios
    if (!personalInfo?.nombre?.trim()) {
      errors.push("Nombre completo es obligatorio")
    }
    
    if (!personalInfo?.email?.trim()) {
      errors.push("Correo electrónico es obligatorio")
    } else {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(personalInfo.email)) {
        errors.push("Correo electrónico debe ser válido")
      }
    }
    
    if (!personalInfo?.profesion?.trim()) {
      errors.push("Profesión o especialidad es obligatoria")
    }

    // Al menos debe haber una sección con contenido
    const hasSkills = cvData?.skills?.length > 0
    const hasExperience = cvData?.experience?.length > 0
    const hasEducation = cvData?.education?.length > 0
    const hasProjects = cvData?.projects?.length > 0
    const hasLanguages = cvData?.languages?.length > 0

    if (!hasSkills && !hasExperience && !hasEducation && !hasProjects && !hasLanguages) {
      errors.push("Debes agregar al menos una sección: Habilidades, Experiencia, Educación, Proyectos o Idiomas")
    }
    
    return errors
  }

  const handleDownloadPDF = async () => {
    // Validar campos obligatorios
    const errors = validateRequiredFields()
    
    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }
    
    setValidationErrors([])
    
    if (!cvRef.current) return
    
    setIsExporting(true)
    
    // Generar nombre de archivo dinámico basado en el nombre del usuario
    const rawName = personalInfo?.nombre?.trim() || ""
    const cleanName = rawName.replace(/[^a-zA-Z0-9]/g, "_")
    const filename = cleanName ? `CV_${cleanName}.pdf` : "CV_DevProfile.pdf"
    
    try {
      await generatePDF(cvRef.current, filename)
    } catch (error) {
      console.error("Error al exportar PDF:", error)
      alert("Hubo un error al exportar tu CV a PDF. Inténtalo de nuevo.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="preview-page-container">
      <div className="preview-actions-bar">
        <h2 style={{ margin: 0, fontSize: "24px", color: "var(--text-h)" }}>Previsualización del CV</h2>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            className="btn btn-primary" 
            onClick={handleDownloadPDF} 
            disabled={isExporting || validationErrors.length > 0}
            title={validationErrors.length > 0 ? "Completa los campos obligatorios antes de descargar" : ""}
          >
            {isExporting ? <FiLoader className="spin" size={14} /> : <FiDownload size={14} />}
            {isExporting ? "Exportando..." : "Descargar PDF"}
          </button>
          
          <Link to="/editor" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            <FiEdit2 size={14} /> Volver al Editor
          </Link>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div style={{
          background: "rgba(255, 77, 79, 0.1)",
          border: "1px solid rgba(255, 77, 79, 0.3)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start"
        }}>
          <FiAlertCircle size={20} style={{ color: "#ff4d4f", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <h4 style={{ margin: "0 0 8px 0", color: "#ff4d4f", fontSize: "14px", fontWeight: "600" }}>
              No se puede descargar el PDF - Campos obligatorios incompletos
            </h4>
            <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text)" }}>
              {validationErrors.map((error, idx) => (
                <li key={idx} style={{ fontSize: "13px", marginBottom: "4px" }}>
                  {error}
                </li>
              ))}
            </ul>
            <Link to="/editor" style={{ 
              color: "#ff4d4f", 
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
              marginTop: "8px",
              display: "inline-block"
            }}>
              → Ir al editor para completar información
            </Link>
          </div>
        </div>
      )}

      <CVPreview ref={cvRef} />
    </div>
  )
}

export default Preview