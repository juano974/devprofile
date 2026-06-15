import { useRef, useState, useContext } from "react"
import CVPreview from "../components/preview/CVPreview"
import { Link } from "react-router-dom"
import { FiEdit2, FiDownload, FiLoader } from "react-icons/fi"
import { generatePDF } from "../utils/pdfGenerator"
import { CVContext } from "../context/CVContext"

function Preview() { 
  const cvRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)
  const { personalInfo } = useContext(CVContext)

  const handleDownloadPDF = async () => {
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
            disabled={isExporting}
          >
            {isExporting ? <FiLoader className="spin" size={14} /> : <FiDownload size={14} />}
            {isExporting ? "Exportando..." : "Descargar PDF"}
          </button>
          
          <Link to="/editor" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            <FiEdit2 size={14} /> Volver al Editor
          </Link>
        </div>
      </div>

      <CVPreview ref={cvRef} />
    </div>
  )
}

export default Preview