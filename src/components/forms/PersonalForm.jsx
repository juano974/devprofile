import { useContext } from "react"
import { CVContext } from "../../context/CVContext"

function PersonalForm() {

  const { personalInfo, setPersonalInfo } = useContext(CVContext)

  const handleChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={personalInfo.nombre}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={personalInfo.email}
        onChange={handleChange}
      />

    </div>
  )
}

export default PersonalForm