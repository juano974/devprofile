import CVPreview from "../components/preview/CVPreview"
import { Link } from "react-router-dom"
import { FiEdit2 } from "react-icons/fi"

function Preview() { 
  return (
    <div className="preview-page-container">
      <div className="preview-actions-bar">
        <h2 style={{ margin: 0, fontSize: "24px", color: "var(--text-h)" }}>Previsualización del CV</h2>
        <Link to="/editor" className="btn btn-primary" style={{ textDecoration: "none" }}>
          <FiEdit2 size={14} /> Volver al Editor
        </Link>
      </div>

      <CVPreview />
    </div>
  )
}

export default Preview