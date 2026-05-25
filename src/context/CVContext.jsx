import { createContext, useState } from "react"

export const CVContext = createContext()

function CVProvider({ children }) {

  const [personalInfo, setPersonalInfo] = useState({
    nombre: "",
    profesion: "",
    email: "",
  })

  return (
    <CVContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
      }}
    >
      {children}
    </CVContext.Provider>
  )
}

export default CVProvider