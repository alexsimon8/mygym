import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mygym_user')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('mygym_user', JSON.stringify(user))
  }, [user])

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }))
  const resetUser = () => { setUser({}); localStorage.removeItem('mygym_user') }

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() { return useContext(UserContext) }