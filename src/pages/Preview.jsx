import { useContext } from "react"
import { CVContext } from "../context/CVContext"
import CVPreview from "../components/preview/CVPreview"
import ExportPDFButton from "../components/preview/ExportPDFButton"
import { Link } from "react-router-dom"
import { FiEdit2 } from "react-icons/fi"

function Preview() { 
  const { cvData } = useContext(CVContext)

  return (
    <div className="preview-page-container">
      <div className="preview-actions-bar">
        <h2 style={{ margin: 0, fontSize: "24px", color: "var(--text-h)" }}>Previsualización del CV</h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <ExportPDFButton cvData={cvData} />
          <Link to="/editor" className="btn btn-secondary" style={{ textDecoration: "none" }}>
            <FiEdit2 size={14} /> Volver al Editor
          </Link>
        </div>
      </div>

      <CVPreview />
    </div>
  )
}

export default Preview