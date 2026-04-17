import { useUser } from '../context/UserContext'
import { Flame, Target, Droplets, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { user } = useUser()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 20 ? 'Buenas tardes' : 'Buenas noches'

  const stats = [
    { icon: Flame, label: 'Racha', value: '1 día', color: '#FF6B35' },
    { icon: Target, label: 'Objetivo', value: user.goal, color: '#9b59b6' },
    { icon: Droplets, label: 'Agua', value: '0 / 8 vasos', color: '#3498db' },
    { icon: TrendingUp, label: 'Nivel', value: user.level, color: '#2ecc71' },
  ]

  return (
    <div className="gap-4">
      <div>
        <p className="text-muted">{greeting} 👋</p>
        <h1>{user.name}</h1>
        <p className="text-muted" style={{ marginTop: 4 }}>{user.weight}kg · {user.height}cm · {user.age} años</p>
      </div>
      <div className="card" style={{ background: 'linear-gradient(135deg, #FF6B35, #e55a26)', border: 'none' }}>
        <h3>¿Listo para hoy?</h3>
        <p style={{ marginTop: 8, opacity: 0.9 }}>Consulta a tu entrenador IA y genera tu rutina personalizada.</p>
      </div>
      <div className="grid-2">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card" style={{ marginBottom: 0 }}>
            <Icon size={20} color={color} />
            <p className="text-muted" style={{ marginTop: 8, fontSize: 12 }}>{label}</p>
            <p style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{value}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Tu perfil</h3>
        <div className="gap-2" style={{ marginTop: 12 }}>
          {user.restrictions && <p className="text-muted">⚠️ {user.restrictions}</p>}
          <p className="text-muted">📅 Miembro desde {new Date(user.joined).toLocaleDateString('es-ES')}</p>
        </div>
      </div>
    </div>
  )
}