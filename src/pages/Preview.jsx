import { useContext } from "react"
import { CVContext } from "../context/CVContext"

function Preview() {

  const { personalInfo } = useContext(CVContext)

  return (
    <div>
      <h1>{personalInfo.nombre}</h1>
      <p>{personalInfo.email}</p>
    </div>
  )
}

export default Preview