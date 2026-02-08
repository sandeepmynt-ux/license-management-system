import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Customers() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    load()
  }, [navigate, pagination.page, pagination.limit, search])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getCustomers(pagination.page, pagination.limit, search || undefined)
      setList(res.customers || [])
      setPagination((p) => ({ ...p, ...res.pagination }))
    } catch (err) {
      setError(err.message)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.createCustomer(form)
      setShowForm(false)
      setForm({ name: '', email: '', phone: '' })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Soft delete this customer?')) return
    setError('')
    try {
      await api.deleteCustomer(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1>Customers</h1>
          <button type="button" className="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New customer'}
          </button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {showForm && (
          <form onSubmit={handleCreate} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required />
            </div>
            <button type="submit" className="primary">Create</button>
          </form>
        )}
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label>Search</label>
          <input placeholder="Name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="card">
        {loading ? (
          <p>Loading…</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '0.5rem 0' }}>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.5rem 0' }}>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>
                      <button type="button" onClick={() => handleDelete(c.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pagination.total > 0 && (
              <p style={{ marginTop: '1rem', color: '#6b7280' }}>
                Page {pagination.page}, {pagination.total} total
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
