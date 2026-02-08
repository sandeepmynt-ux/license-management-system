import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    try {
      const u = localStorage.getItem('user')
      setUser(u ? JSON.parse(u) : {})
    } catch (_) {
      setUser({})
    }
  }, [navigate])

  if (!user) return <div className="container">Loading…</div>

  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>
        <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>
          Welcome, {user.email || 'Admin'}.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Use the navigation to manage Customers, Subscription Packs, and Subscriptions.
        </p>
      </div>
    </div>
  )
}
