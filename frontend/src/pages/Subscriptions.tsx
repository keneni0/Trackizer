import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { subscriptionService } from '../services/api'
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

interface Subscription {
  _id: string
  name: string
  price: number
  currency: string
  frequency: string
  category: string
  paymentMethod: string
  paymentStatus: string
  paymentStartDate: string
  paymentRenewalDate: string
}

const Subscriptions: React.FC = () => {
  const location = useLocation();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Subscription>>({})
  const [success, setSuccess] = useState<string>('')

  // Refetch when location changes
  useEffect(() => {
    fetchSubscriptions()
    // If the user just landed here after creating a subscription
    if (location.state && location.state.created) {
      setSuccess('Subscription created successfully!')
      // Remove the message after a couple seconds
      setTimeout(() => setSuccess(''), 1600)
    }
    // eslint-disable-next-line
  }, [location.key])

  const fetchSubscriptions = async () => {
    try {
      const data = await subscriptionService.getSubscriptions()
      setSubscriptions(data)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (subscription: Subscription) => {
    setEditingId(subscription._id)
    setEditForm(subscription)
  }

  const handleSave = async () => {
    if (!editingId) return

    try {
      await subscriptionService.updateSubscription(editingId, editForm)
      await fetchSubscriptions()
      setEditingId(null)
      setEditForm({})
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return

    try {
      await subscriptionService.deleteSubscription(id)
      await fetchSubscriptions()
    } catch (error) {
      console.error('Error deleting subscription:', error)
    }
  }

  const handleCancelSubscription = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?')) return

    try {
      await subscriptionService.cancelSubscription(id)
      await fetchSubscriptions()
    } catch (error) {
      console.error('Error cancelling subscription:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      case 'expired':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'entertainment':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      case 'food':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
      case 'shopping':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Subscriptions</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your subscription services</p>
        </div>
        <Link
          to="/app/add-subscription"
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Subscription</span>
        </Link>
      </div>

      {/* Subscriptions List */}
      <div className="card">
        {success && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300 font-medium text-center">
            {success}
          </div>
        )}
        {subscriptions.length === 0 ? (
          <div className="min-h-[340px] flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-700 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487c-.478-1.318-1.748-2.237-3.155-2.237h-3.414c-1.407 0-2.677.92-3.155 2.237L5.248 6H3.75a.75.75 0 000 1.5h.359l1.336 9.352A3.75 3.75 0 009.17 20.25h5.66a3.75 3.75 0 003.726-3.398L20.39 7.5h.36a.75.75 0 000-1.5h-1.498l-1.39-4.013zM9.17 21.75h5.66c2.165 0 4.031-1.541 4.38-3.68l1.338-9.353A2.25 2.25 0 0018.751 6h-.974l-1.389-4.013A3.75 3.75 0 009.17 3.75zm.33-2.25a2.25 2.25 0 01-2.215-1.966L5.25 7.5h13.5l-1.035 7.034A2.25 2.25 0 0114.5 19.5h-5.66z" /></svg>
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">No subscriptions yet</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs text-center">You don’t have any subscriptions listed. Start tracking your subscriptions to see them here.</p>
            <Link
              to="/app/add-subscription"
              className="btn-primary mt-3 px-5 py-2"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Subscription
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Next Renewal
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {subscriptions.map((subscription) => (
                  <tr key={subscription._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {subscription.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {subscription.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {subscription.currency} {subscription.price}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {subscription.frequency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(subscription.category)}`}>
                        {subscription.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.paymentStatus)}`}>
                        {subscription.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {new Date(subscription.paymentRenewalDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(subscription)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        {subscription.paymentStatus === 'active' && (
                          <button
                            onClick={() => handleCancelSubscription(subscription._id)}
                            className="text-orange-600 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(subscription._id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Subscriptions
