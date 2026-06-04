import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

// Level mapping to numerical values
const LEVEL_MAP = {
  "Básico": 1,
  "Intermedio": 2,
  "Avanzado": 3
}

const formatYAxis = (tick) => {
  if (tick === 1) return "Básico"
  if (tick === 2) return "Intermedio"
  if (tick === 3) return "Avanzado"
  return ""
}

// Warm Golden/Bronze color palette for slices (integrating var(--accent))
const PIE_COLORS = [
  "var(--accent)",             // Golden Accent
  "#b0873d",                   // Warm Golden Bronze
  "#dcc393",                   // Light Soft Gold
  "#a37f3f",                   // Medium Matte Gold
  "#856730",                   // Dark Golden Chocolate
  "rgba(197, 160, 89, 0.6)"    // Golden Glow
]

// Custom Tooltip component to match design requirements
const CustomTooltip = ({ active, payload, isPie }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    if (isPie) {
      return (
        <div className="custom-tooltip">
          <p className="custom-tooltip-title">{payload[0].name}</p>
          <p className="custom-tooltip-item">
            Habilidades: <strong>{payload[0].value}</strong>
          </p>
        </div>
      )
    }

    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-title">{data.name}</p>
        <p className="custom-tooltip-item">
          Nivel: <strong>{data.levelName}</strong>
        </p>
        {data.category && (
          <p className="custom-tooltip-item" style={{ fontSize: "11px", opacity: 0.8, marginTop: "4px" }}>
            Categoría: {data.category}
          </p>
        )}
      </div>
    )
  }
  return null
}

function SkillChart({ skills }) {
  // 1. Process data for Bar Chart (proficiency level)
  const barData = skills.map(skill => ({
    name: skill.nombre,
    levelVal: LEVEL_MAP[skill.nivel] || 1,
    levelName: skill.nivel || "Básico",
    category: skill.categoria
  }))

  // 2. Process data for Pie/Donut Chart (categories distribution)
  const categoryCounts = skills.reduce((acc, skill) => {
    const cat = skill.categoria || "Otros"
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value
  }))

  return (
    <div className="charts-grid">
      {/* Bar Chart: Skill Proficiency */}
      <div className="chart-card">
        <div className="chart-title-container">
          <h2>Nivel de Dominio por Habilidad</h2>
        </div>
        <div className="chart-visual-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: 15, bottom: 20 }}
            >
              <defs>
                <linearGradient id="barGoldenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="var(--border)" 
                vertical={false} 
                opacity={0.5}
              />
              <XAxis
                dataKey="name"
                stroke="var(--border)"
                tick={{ fill: "var(--text)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                type="number"
                domain={[0, 3]}
                ticks={[1, 2, 3]}
                tickFormatter={formatYAxis}
                stroke="var(--border)"
                tick={{ fill: "var(--text)", fontSize: 12 }}
                dx={-10}
              />
              <Tooltip 
                content={<CustomTooltip isPie={false} />}
                cursor={{ fill: "var(--accent-bg)", opacity: 0.4 }}
              />
              <Bar 
                dataKey="levelVal" 
                fill="url(#barGoldenGradient)" 
                radius={[6, 6, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Skill Categories */}
      <div className="chart-card">
        <div className="chart-title-container">
          <h2>Distribución por Categorías</h2>
        </div>
        <div className="chart-visual-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
                style={{ fontSize: "11px", fill: "var(--text-h)", fontWeight: 500 }}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={PIE_COLORS[index % PIE_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip isPie={true} />} />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ color: "var(--text)", fontSize: "12px" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default SkillChart
