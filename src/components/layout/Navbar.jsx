import { NavLink } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxSizing: "border-box" }}>
      <div style={{ width: "40px" }} className="nav-spacer" />
      
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/editor">Editor</NavLink>
        <NavLink to="/preview">Preview</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <ThemeToggle />
    </nav>
  )
}

export default Navbar