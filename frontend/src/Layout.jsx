import { Outlet, NavLink } from 'react-router-dom'

export default function Layout() {
  const token = localStorage.getItem('token')

  return (
    <>
      {token && (
        <nav className="nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/packs">Packs</NavLink>
          <NavLink to="/subscriptions">Subscriptions</NavLink>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              window.location.href = '/login'
            }}
          >
            Logout
          </button>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </>
  )
}
