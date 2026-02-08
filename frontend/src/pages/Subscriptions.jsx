import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Subscriptions() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    load()
  }, [navigate, pagination.page, pagination.limit, statusFilter])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getSubscriptions(pagination.page, pagination.limit, statusFilter || undefined)
      setList(res.subscriptions || [])
      setPagination((p) => ({ ...p, ...res.pagination }))
    } catch (err) {
      setError(err.message)
      setList([])
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    setError('')
    try {
      await api.approveSubscription(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Subscriptions</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="form-group" style={{ marginTop: '1rem', maxWidth: 200 }}>
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="requested">Requested</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
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
                  <th style={{ padding: '0.5rem 0' }}>ID</th>
                  <th>Pack</th>
                  <th>Status</th>
                  <th>Requested</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.5rem 0' }}>{s.id}</td>
                    <td>{s.pack_name || s.packSku || '-'}</td>
                    <td>{s.status}</td>
                    <td>{s.requested_at ? new Date(s.requested_at).toLocaleDateString() : '-'}</td>
                    <td>
                      {s.status === 'requested' && (
                        <button type="button" className="primary" onClick={() => handleApprove(s.id)}>
                          Approve
                        </button>
                      )}
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
