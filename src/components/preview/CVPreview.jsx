import { forwardRef } from "react"
import PreviewSidebar from "./PreviewSidebar"
import PreviewMain from "./PreviewMain"
import "../../styles/preview.css"

const CVPreview = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="cv-paper">
      <PreviewSidebar />
      <PreviewMain />
    </div>
  )
})

CVPreview.displayName = "CVPreview"

export default CVPreview
