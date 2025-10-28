import axios from 'axios'

// Use relative path to leverage Vite proxy configuration
const API_BASE_URL = '/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/sign-in', { email, password })
    return response.data.data
  },

  async register(name: string, email: string, password: string) {
    const response = await api.post('/auth/sign-up', { name, email, password })
    return response.data.data
  },

  async getCurrentUser(token: string) {
    const response = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data.data
  }
}

export const subscriptionService = {
  async getSubscriptions() {
    const response = await api.get('/subscriptions')
    return response.data.data
  },

  async createSubscription(subscription: any) {
    const response = await api.post('/subscriptions', subscription)
    return response.data.data
  },

  async updateSubscription(id: string, subscription: any) {
    const response = await api.put(`/subscriptions/${id}`, subscription)
    return response.data.data
  },

  async deleteSubscription(id: string) {
    const response = await api.delete(`/subscriptions/${id}`)
    return response.data
  },

  async cancelSubscription(id: string) {
    const response = await api.put(`/subscriptions/${id}/cancel`)
    return response.data.data
  },

  async getUpcomingRenewals() {
    const response = await api.get('/subscriptions/upcoming-renewals')
    return response.data.data
  }
}

export default api
