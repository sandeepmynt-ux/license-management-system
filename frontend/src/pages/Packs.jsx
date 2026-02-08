import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Packs() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', sku: '', price: '', validity_months: 12 })

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    load()
  }, [navigate, pagination.page, pagination.limit])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getPacks(pagination.page, pagination.limit)
      setList(res.packs || [])
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
      await api.createPack({
        name: form.name,
        description: form.description,
        sku: form.sku,
        price: parseFloat(form.price),
        validity_months: parseInt(form.validity_months, 10),
      })
      setShowForm(false)
      setForm({ name: '', description: '', sku: '', price: '', validity_months: 12 })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Soft delete this pack?')) return
    setError('')
    try {
      await api.deletePack(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1>Subscription Packs</h1>
          <button type="button" className="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New pack'}
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
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} />
            </div>
            <div className="form-group">
              <label>SKU</label>
              <input value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} required placeholder="e.g. premium-plan" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Validity (months)</label>
              <input type="number" min={1} max={12} value={form.validity_months} onChange={(e) => setForm((f) => ({ ...f, validity_months: e.target.value }))} required />
            </div>
            <button type="submit" className="primary">Create</button>
          </form>
        )}
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
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Months</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.5rem 0' }}>{p.name}</td>
                    <td>{p.sku}</td>
                    <td>{p.price}</td>
                    <td>{p.validity_months}</td>
                    <td>
                      <button type="button" onClick={() => handleDelete(p.id)}>Delete</button>
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
