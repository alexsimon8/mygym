import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { Dumbbell } from 'lucide-react'

const GOALS = ['Perder peso', 'Ganar músculo', 'Mejorar resistencia', 'Mantenimiento', 'Ganar fuerza']
const LEVELS = ['Principiante', 'Intermedio', 'Avanzado']

export default function Onboarding() {
  const { updateUser } = useUser()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', age: '', weight: '', height: '', goal: '', level: '', restrictions: '' })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const steps = [
    <div className="gap-4" style={{ paddingTop: 60 }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ background: '#FF6B35', width: 80, height: 80, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Dumbbell size={40} color="white" />
        </div>
        <h1>MyGym</h1>
        <p className="text-muted" style={{ marginTop: 8 }}>Tu entrenador personal con IA</p>
      </div>
      <div className="card gap-3">
        <div><label>¿Cómo te llamas?</label><input className="input" placeholder="Tu nombre" value={form.name} onChange={e => set('name', e.target.value)} /></div>
        <div><label>Edad</label><input className="input" type="number" placeholder="Años" value={form.age} onChange={e => set('age', e.target.value)} /></div>
      </div>
      <button className="btn btn-primary" disabled={!form.name || !form.age} onClick={() => setStep(1)}>Continuar →</button>
    </div>,

    <div className="gap-4" style={{ paddingTop: 40 }}>
      <div><h2>Tu cuerpo</h2><p className="text-muted">Para personalizar tu plan</p></div>
      <div className="card gap-3">
        <div><label>Peso (kg)</label><input className="input" type="number" placeholder="70" value={form.weight} onChange={e => set('weight', e.target.value)} /></div>
        <div><label>Altura (cm)</label><input className="input" type="number" placeholder="175" value={form.height} onChange={e => set('height', e.target.value)} /></div>
      </div>
      <button className="btn btn-primary" disabled={!form.weight || !form.height} onClick={() => setStep(2)}>Continuar →</button>
      <button className="btn btn-secondary" onClick={() => setStep(0)}>← Volver</button>
    </div>,

    <div className="gap-4" style={{ paddingTop: 40 }}>
      <div><h2>Tu objetivo</h2><p className="text-muted">¿Qué quieres conseguir?</p></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {GOALS.map(g => <span key={g} className={`tag ${form.goal === g ? 'active' : ''}`} onClick={() => set('goal', g)}>{g}</span>)}
      </div>
      <div>
        <h3 style={{ marginBottom: 12 }}>Nivel de experiencia</h3>
        <div className="gap-2">{LEVELS.map(l => <button key={l} className={`btn ${form.level === l ? 'btn-primary' : 'btn-secondary'}`} onClick={() => set('level', l)}>{l}</button>)}</div>
      </div>
      <button className="btn btn-primary" disabled={!form.goal || !form.level} onClick={() => setStep(3)}>Continuar →</button>
      <button className="btn btn-secondary" onClick={() => setStep(1)}>← Volver</button>
    </div>,

    <div className="gap-4" style={{ paddingTop: 40 }}>
      <div><h2>Última pregunta</h2><p className="text-muted">¿Tienes lesiones, alergias o restricciones?</p></div>
      <div className="card">
        <textarea className="input" placeholder="Ej: rodilla derecha, sin gluten, vegetariano... (opcional)" value={form.restrictions} onChange={e => set('restrictions', e.target.value)} rows={4} style={{ resize: 'none' }} />
      </div>
      <button className="btn btn-primary" onClick={() => updateUser({ ...form, joined: new Date().toISOString() })}>🚀 Empezar MyGym</button>
      <button className="btn btn-secondary" onClick={() => setStep(2)}>← Volver</button>
    </div>
  ]

  return (
    <div style={{ minHeight: '100dvh', padding: '24px 16px', background: '#0f0f0f', maxWidth: 430, margin: '0 auto' }}>
      {step > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? '#FF6B35' : '#2a2a2a' }} />)}
        </div>
      )}
      {steps[step]}
    </div>
  )
}