import useTheme from "../../hooks/useTheme"
import { FiSun, FiMoon } from "react-icons/fi"

function ThemeToggle() {  
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Alternar tema de color"
      style={{
        background: "var(--social-bg)",
        border: "1px solid var(--border)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--accent)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: 0,
        boxShadow: "var(--shadow)",
        outline: "none"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1) rotate(15deg)"
        e.currentTarget.style.borderColor = "var(--accent)"
        e.currentTarget.style.background = "var(--accent-bg)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) rotate(0deg)"
        e.currentTarget.style.borderColor = "var(--border)"
        e.currentTarget.style.background = "var(--social-bg)"
      }}
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}

export default ThemeToggle
