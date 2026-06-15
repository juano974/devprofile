import { useContext, useState } from "react"
import { CVContext } from "../../context/CVContext"
import ProjectCard from "./ProjectCard"
import ProjectForm from "../forms/ProjectForm"
import { FiPlus } from "react-icons/fi"

function ProjectList() {
  const { cvData, setCvData } = useContext(CVContext)
  const [isAdding, setIsAdding] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [duplicateError, setDuplicateError] = useState("")

  const projects = cvData.projects || []

  const handleSave = (projectData) => {
    // Check duplicates by name
    const isDuplicate = projects.some(
      p => p.nombre.toLowerCase().trim() === projectData.nombre.toLowerCase().trim() && 
      p.id !== projectData.id
    )

    if (isDuplicate) {
      setDuplicateError("Ya tienes un proyecto registrado con este nombre.")
      return
    }

    setDuplicateError("")

    if (projectData.id) {
      // Edit
      setCvData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === projectData.id ? projectData : p)
      }))
      setEditingProject(null)
    } else {
      // Create
      const newProject = { ...projectData, id: crypto.randomUUID() }
      setCvData(prev => ({
        ...prev,
        projects: [...prev.projects, newProject]
      }))
      setIsAdding(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      setCvData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }))
    }
  }

  return (
    <div>
      <div className="list-header">
        <h3 className="list-header-title">Proyectos / Projects</h3>
        {!isAdding && !editingProject && (
          <button className="btn btn-primary" onClick={() => { setIsAdding(true); setDuplicateError(""); }}>
            <FiPlus size={16} style={{ marginRight: "6px" }} /> Agregar
          </button>
        )}
      </div>

      {duplicateError && (
        <div className="form-error" style={{ marginBottom: "16px", padding: "10px", background: "rgba(255, 77, 79, 0.1)", borderRadius: "6px" }}>
          {duplicateError}
        </div>
      )}

      {isAdding && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <ProjectForm 
            onSave={handleSave} 
            onCancel={() => setIsAdding(false)} 
          />
        </div>
      )}

      {editingProject && (
        <div style={{ marginBottom: "32px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--social-bg)" }}>
          <ProjectForm 
            projectToEdit={editingProject}
            onSave={handleSave} 
            onCancel={() => setEditingProject(null)} 
          />
        </div>
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          No has registrado ningún proyecto aún. Haz clic en "Agregar" para registrar tus proyectos.
        </div>
      ) : (
        <div className="cards-grid">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onEdit={setEditingProject} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
