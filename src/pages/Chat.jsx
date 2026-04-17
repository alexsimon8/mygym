import { useState, useRef, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { askClaude, buildSystemPrompt } from '../services/api'
import { Send } from 'lucide-react'

export default function Chat() {
  const { user } = useUser()
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `¡Hola ${user.name}! 👋 Soy Alex, tu entrenador y nutricionista IA. ¿En qué puedo ayudarte hoy?` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages); setInput(''); setLoading(true)
    try {
      const reply = await askClaude(newMessages, buildSystemPrompt(user))
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error de conexión. Configura Cloudflare en el Paso 4.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 80px)' }}>
      <div style={{ padding: '0 0 16px' }}><h2>💬 Chat con Alex</h2><p className="text-muted">Tu entrenador IA personal</p></div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '12px 16px', fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user' ? '#FF6B35' : '#1a1a1a',
              border: m.role === 'user' ? 'none' : '1px solid #2a2a2a'
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '12px 16px', background: '#1a1a1a', borderRadius: '18px 18px 18px 4px', border: '1px solid #2a2a2a' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF6B35', animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex', gap: 10, padding: '12px 0', borderTop: '1px solid #2a2a2a', background: '#0f0f0f' }}>
        <input className="input" placeholder="Escribe tu pregunta..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1 }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: '#FF6B35', border: 'none', borderRadius: 10, padding: '0 16px', cursor: 'pointer', opacity: loading || !input.trim() ? 0.5 : 1 }}>
          <Send size={20} color="white" />
        </button>
      </div>
    </div>
  )
}