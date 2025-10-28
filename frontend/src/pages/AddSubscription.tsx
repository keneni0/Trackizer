import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { subscriptionService } from '../services/api'

const AddSubscription: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'USD',
    frequency: 'monthly',
    category: 'other',
    paymentMethod: 'card',
    paymentStatus: 'active',
    paymentStartDate: '',
    paymentRenewalDate: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Convert price to number
      const subscriptionData = {
        ...formData,
        price: parseFloat(formData.price),
        paymentStartDate: new Date(formData.paymentStartDate).toISOString(),
        paymentRenewalDate: new Date(formData.paymentRenewalDate).toISOString()
      }

      await subscriptionService.createSubscription(subscriptionData)
      setSuccess('Subscription created successfully!')
      setTimeout(() => navigate('/app/subscriptions'), 1200)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create subscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400">Track a new subscription service</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Service Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Service Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Service Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input mt-1"
                placeholder="e.g., Netflix, Spotify"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="input mt-1"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="entertainment">Entertainment</option>
                <option value="food">Food & Dining</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Pricing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                className="input mt-1"
                placeholder="9.99"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Currency *
              </label>
              <select
                id="currency"
                name="currency"
                required
                className="input mt-1"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Frequency *
              </label>
              <select
                id="frequency"
                name="frequency"
                required
                className="input mt-1"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Payment Method *
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                required
                className="input mt-1"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="bank transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status *
              </label>
              <select
                id="paymentStatus"
                name="paymentStatus"
                required
                className="input mt-1"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Date Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Date Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="paymentStartDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date *
              </label>
              <input
                type="date"
                id="paymentStartDate"
                name="paymentStartDate"
                required
                className="input mt-1"
                value={formData.paymentStartDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="paymentRenewalDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Next Renewal Date *
              </label>
              <input
                type="date"
                id="paymentRenewalDate"
                name="paymentRenewalDate"
                required
                className="input mt-1"
                value={formData.paymentRenewalDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/app/subscriptions')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Subscription'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddSubscription
