import Navigation from './Navigation'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <div className="page">{children}</div>
      <Navigation />
    </div>
  )
}