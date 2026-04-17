import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, Apple, MessageCircle } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/trainer', icon: Dumbbell, label: 'Entrena' },
  { to: '/nutrition', icon: Apple, label: 'Nutrición' },
  { to: '/chat', icon: MessageCircle, label: 'Chat IA' },
]

export default function Navigation() {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430, background: '#111',
      borderTop: '1px solid #2a2a2a', display: 'flex', padding: '8px 0 20px', zIndex: 100
    }}>
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} end style={({ isActive }) => ({
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          textDecoration: 'none', color: isActive ? '#FF6B35' : '#666', fontSize: 11, fontWeight: 500
        })}>
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}