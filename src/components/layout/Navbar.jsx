import { NavLink } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import { FiLayers } from "react-icons/fi"

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">
        <FiLayers style={{ flexShrink: 0 }} /> DevProfile
      </span>
      
      <div className="navbar-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/editor">Editor</NavLink>
        <NavLink to="/preview">Vista Previa</NavLink>
        <NavLink to="/dashboard">Métricas</NavLink>
        <NavLink to="/about">Acerca de</NavLink>
      </div>

      <div className="navbar-toggle-container">
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar