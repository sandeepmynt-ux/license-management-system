const AUTH = import.meta.env.VITE_AUTH_URL || ''
const CUSTOMER = import.meta.env.VITE_CUSTOMER_URL || ''
const PACK = import.meta.env.VITE_PACK_URL || ''
const SUBSCRIPTION = import.meta.env.VITE_SUBSCRIPTION_URL || ''
const ASSIGNMENT = import.meta.env.VITE_ASSIGNMENT_URL || ''

async function request(base, path, options = {}) {
  const token = localStorage.getItem('token')
  const url = base ? `${base}${path}` : path
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }
  const res = await fetch(url, { ...options, headers })
  const text = await res.text()
  if (!res.ok) {
    let msg = res.statusText
    try {
      const data = text ? JSON.parse(text) : {}
      msg = data.message || data.error || msg
    } catch (_) {}
    throw new Error(msg)
  }
  return text ? JSON.parse(text) : null
}

export const api = {
  loginAdmin: (email, password) =>
    request(AUTH, '/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  loginCustomer: (email, password) =>
    request(AUTH, '/api/customer/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  signup: (name, email, password, phone) =>
    request(AUTH, '/api/customer/signup', { method: 'POST', body: JSON.stringify({ name, email, password, phone }) }),

  getCustomers: (page = 1, limit = 10, search) => {
    const params = new URLSearchParams({ page, limit })
    if (search) params.set('search', search)
    return request(CUSTOMER, `/api/v1/admin/customers?${params}`)
  },
  getCustomer: (id) => request(CUSTOMER, `/api/v1/admin/customers/${id}`),
  createCustomer: (body) => request(CUSTOMER, '/api/v1/admin/customers', { method: 'POST', body: JSON.stringify(body) }),
  updateCustomer: (id, body) => request(CUSTOMER, `/api/v1/admin/customers/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCustomer: (id) => request(CUSTOMER, `/api/v1/admin/customers/${id}`, { method: 'DELETE' }),

  getPacks: (page = 1, limit = 10) =>
    request(PACK, `/api/v1/admin/subscription-packs?page=${page}&limit=${limit}`),
  getPack: (id) => request(PACK, `/api/v1/admin/subscription-packs/${id}`),
  createPack: (body) => request(PACK, '/api/v1/admin/subscription-packs', { method: 'POST', body: JSON.stringify(body) }),
  updatePack: (id, body) => request(PACK, `/api/v1/admin/subscription-packs/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deletePack: (id) => request(PACK, `/api/v1/admin/subscription-packs/${id}`, { method: 'DELETE' }),

  getSubscriptions: (page = 1, limit = 10, status) => {
    const params = new URLSearchParams({ page, limit })
    if (status) params.set('status', status)
    return request(SUBSCRIPTION, `/api/v1/admin/subscriptions?${params}`)
  },
  approveSubscription: (id) => request(SUBSCRIPTION, `/api/v1/admin/subscriptions/${id}/approve`, { method: 'POST' }),

  assignSubscription: (customerId, packId) =>
    request(ASSIGNMENT, `/api/v1/admin/customers/${customerId}/assign-subscription`, {
      method: 'POST',
      body: JSON.stringify({ pack_id: packId }),
    }),
  unassignSubscription: (customerId, subscriptionId) =>
    request(ASSIGNMENT, `/api/v1/admin/customers/${customerId}/subscription/${subscriptionId}`, { method: 'DELETE' }),
}
