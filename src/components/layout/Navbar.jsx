import { NavLink } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">DevProfile</span>
      
      <div className="navbar-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/editor">Editor</NavLink>
        <NavLink to="/preview">Preview</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <div className="navbar-toggle-container">
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar