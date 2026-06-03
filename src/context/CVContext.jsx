/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

export const CVContext = createContext()

function CVProvider({ children }) {
  const [cvData, setCvData] = useLocalStorage("cvData", {
    personalInfo: {
      nombre: "",
      profesion: "",
      email: "",
      ciudad: "",
      telefono: "",
      descripcion: "",
      enlaces: {
        github: "",
        linkedin: "",
        portfolio: "",
        personal: "",
        repositorio: ""
      },
      imagenUrl: ""
    },
    skills: [],
    projects: [],
    education: [],
    experience: [],
    languages: []
  })

  // Backward compatibility selectors and helpers
  const personalInfo = cvData.personalInfo || {}
  
  const setPersonalInfo = (newInfo) => {
    setCvData(prevData => ({
      ...prevData,
      personalInfo: typeof newInfo === "function" ? newInfo(prevData.personalInfo || {}) : newInfo
    }))
  }

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCvData,
        personalInfo,
        setPersonalInfo,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export default CVProvider