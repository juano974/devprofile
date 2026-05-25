import { createContext, useState, useEffect } from "react"

export const CVContext = createContext()

function CVProvider({ children }) {

  const [personalInfo, setPersonalInfo] = useState(() => {

    const savedData = localStorage.getItem("personalInfo")

    return savedData
      ? JSON.parse(savedData)
      : {
          nombre: "",
          profesion: "",
          email: "",
        }
  })

  useEffect(() => {

    localStorage.setItem(
      "personalInfo",
      JSON.stringify(personalInfo)
    )

  }, [personalInfo])

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