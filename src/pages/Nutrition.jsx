import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { askClaude, buildSystemPrompt } from '../services/api'
import { RefreshCw } from 'lucide-react'

const MEALS = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena', 'Plan semanal']

export default function Nutrition() {
  const { user } = useUser()
  const [meal, setMeal] = useState('')
  const [preferences, setPreferences] = useState('')
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bmr = user.weight ? Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age + 5) : null
  const tdee = bmr ? Math.round(bmr * 1.55) : null

  const generate = async () => {
    setLoading(true); setError('')
    try {
      const result = await askClaude([{ role: 'user', content: `Genera un plan de ${meal} para mi objetivo de ${user.goal}. ${preferences ? `Preferencias: ${preferences}.` : ''} Incluye macros aproximados.` }], buildSystemPrompt(user))
      setPlan(result)
    } catch { setError('⚠️ Conecta Cloudflare en el Paso 4 para activar la IA.') }
    setLoading(false)
  }

  return (
    <div className="gap-4">
      <div><h2>🥗 Nutricionista</h2><p className="text-muted">Planes de alimentación personalizados</p></div>
      {tdee && (
        <div className="grid-2">
          <div className="card" style={{ marginBottom: 0, textAlign: 'center' }}>
            <p className="text-muted" style={{ fontSize: 12 }}>Calorías base</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#FF6B35' }}>{bmr}</p>
            <p className="text-muted" style={{ fontSize: 11 }}>kcal/día</p>
          </div>
          <div className="card" style={{ marginBottom: 0, textAlign: 'center' }}>
            <p className="text-muted" style={{ fontSize: 12 }}>Gasto total</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#2ecc71' }}>{tdee}</p>
            <p className="text-muted" style={{ fontSize: 11 }}>kcal/día</p>
          </div>
        </div>
      )}
      <div className="card">
        <label>¿Para qué comida?</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {MEALS.map(m => <span key={m} className={`tag ${meal === m ? 'active' : ''}`} onClick={() => setMeal(m)}>{m}</span>)}
        </div>
      </div>
      <div className="card">
        <label>Preferencias (opcional)</label>
        <input className="input" style={{ marginTop: 8 }} placeholder="Ej: sin lactosa, mediterráneo..." value={preferences} onChange={e => setPreferences(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={generate} disabled={loading || !meal}>
        {loading ? <div className="spinner" /> : '🥗 Generar Plan'}
      </button>
      {error && <div className="card" style={{ borderColor: '#e74c3c' }}><p style={{ color: '#e74c3c' }}>{error}</p></div>}
      {plan && (
        <div className="card">
          <div className="row-between" style={{ marginBottom: 16 }}>
            <h3>{meal}</h3>
            <RefreshCw size={18} color="#FF6B35" onClick={generate} style={{ cursor: 'pointer' }} />
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6, color: '#ddd', fontSize: 14 }}>{plan}</pre>
        </div>
      )}
    </div>
  )
}