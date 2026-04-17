import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Trainer from './pages/Trainer'
import Nutrition from './pages/Nutrition'
import Chat from './pages/Chat'
import Layout from './components/Layout'

function AppRoutes() {
  const { user } = useUser()
  if (!user.name) return <Onboarding />
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <UserProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </UserProvider>
  )
}