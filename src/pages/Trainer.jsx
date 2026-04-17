import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { askClaude, buildSystemPrompt } from '../services/api'
import { Play, RefreshCw } from 'lucide-react'

const MUSCLE_GROUPS = ['Pecho', 'Espalda', 'Hombros', 'Bíceps', 'Tríceps', 'Piernas', 'Abdomen', 'Full Body']
const DURATIONS = ['20 min', '30 min', '45 min', '60 min']

export default function Trainer() {
  const { user } = useUser()
  const [selected, setSelected] = useState('')
  const [duration, setDuration] = useState('45 min')
  const [routine, setRoutine] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true); setError('')
    try {
      const result = await askClaude([{ role: 'user', content: `Genera una rutina de ${duration} enfocada en ${selected || 'todo el cuerpo'}. Incluye ejercicios con series, repeticiones y descansos.` }], buildSystemPrompt(user))
      setRoutine(result)
    } catch { setError('⚠️ Conecta Cloudflare en el Paso 4 para activar la IA.') }
    setLoading(false)
  }

  return (
    <div className="gap-4">
      <div><h2>🏋️ Entrenador Personal</h2><p className="text-muted">Genera tu rutina con IA</p></div>
      <div className="card">
        <label>Grupo muscular</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {MUSCLE_GROUPS.map(g => <span key={g} className={`tag ${selected === g ? 'active' : ''}`} onClick={() => setSelected(g)}>{g}</span>)}
        </div>
      </div>
      <div className="card">
        <label>Duración</label>
        <div className="grid-2" style={{ marginTop: 8 }}>
          {DURATIONS.map(d => <button key={d} className={`btn ${duration === d ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setDuration(d)} style={{ padding: 10 }}>{d}</button>)}
        </div>
      </div>
      <button className="btn btn-primary" onClick={generate} disabled={loading}>
        {loading ? <div className="spinner" /> : '▶ Generar Rutina'}
      </button>
      {error && <div className="card" style={{ borderColor: '#e74c3c' }}><p style={{ color: '#e74c3c' }}>{error}</p></div>}
      {routine && (
        <div className="card">
          <div className="row-between" style={{ marginBottom: 16 }}>
            <h3>Tu rutina de hoy</h3>
            <RefreshCw size={18} color="#FF6B35" onClick={generate} style={{ cursor: 'pointer' }} />
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6, color: '#ddd', fontSize: 14 }}>{routine}</pre>
        </div>
      )}
    </div>
  )
}