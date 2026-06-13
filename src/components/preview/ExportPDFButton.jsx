import { useState } from "react"
import { generatePDF } from "../../utils/pdfGenerator"
import { FiDownload } from "react-icons/fi"

/**
 * Componente que renderiza un botón para exportar el currículum a formato PDF.
 * Gestiona los estados de carga (generando), nombres de archivo inteligentes y mensajes de error/éxito.
 * 
 * @param {Object} props
 * @param {Object} props.cvData - El estado global de CV de la aplicación.
 */
function ExportPDFButton({ cvData }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  // Generación inteligente del nombre del archivo PDF
  let filename = "DevProfile_CV.pdf"
  if (cvData?.personalInfo?.nombre?.trim()) {
    const cleanName = cvData.personalInfo.nombre
      .trim()
      .normalize("NFD") // Descompone acentos y diacríticos (ej: "ó" -> "o")
      .replace(/[\u0300-\u036f]/g, "") // Remueve las marcas de acentos
      .replace(/[^a-zA-Z0-9\s-_]/g, "") // Remueve cualquier caracter que no sea alfanumérico, espacio o guion
      .replace(/\s+/g, "_") // Reemplaza espacios por guiones bajos
    
    if (cleanName) {
      filename = `CV_${cleanName}.pdf`
    }
  }

  const handleExport = async () => {
    const element = document.querySelector(".cv-paper")
    
    if (!element) {
      setMessage({ text: "Error: No se encontró la vista del CV para exportar.", type: "error" })
      return
    }

    setLoading(true)
    setMessage({ text: "", type: "" })

    try {
      await generatePDF(element, filename)
      setMessage({ text: "PDF generado correctamente", type: "success" })
      
      // Limpiar mensaje de éxito automáticamente después de 4 segundos
      setTimeout(() => {
        setMessage(prev => prev.type === "success" ? { text: "", type: "" } : prev)
      }, 4000)
    } catch (err) {
      console.error("Fallo al exportar PDF:", err)
      setMessage({ text: "Error al generar el PDF", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  // Estilos inline de soporte para mensajes
  const getMessageStyle = () => {
    const baseStyle = {
      fontSize: "14px",
      fontWeight: "600",
      marginLeft: "12px",
      display: "inline-flex",
      alignItems: "center",
      transition: "opacity 0.3s ease",
      opacity: message.text ? 1 : 0
    }

    if (message.type === "success") {
      return { ...baseStyle, color: "var(--accent)" }
    }
    if (message.type === "error") {
      return { ...baseStyle, color: "#ff4d4f" }
    }
    return baseStyle
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
      <button
        onClick={handleExport}
        disabled={loading}
        className="btn btn-primary"
        style={{
          minWidth: "160px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        <FiDownload size={14} className={loading ? "no-pdf" : ""} />
        {loading ? "Generando PDF..." : "Exportar PDF"}
      </button>

      {message.text && (
        <span style={getMessageStyle()}>
          {message.text}
        </span>
      )}
    </div>
  )
}

export default ExportPDFButton
