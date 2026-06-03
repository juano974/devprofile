import PreviewSidebar from "./PreviewSidebar"
import PreviewMain from "./PreviewMain"
import "../../styles/preview.css"

function CVPreview() {
  return (
    <div className="cv-paper">
      <PreviewSidebar />
      <PreviewMain />
    </div>
  )
}

export default CVPreview
