import React, { useState, useEffect } from 'react'
import { subscriptionService } from '../services/api'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

interface Subscription {
  _id: string
  name: string
  price: number
  currency: string
  frequency: string
  category: string
  paymentStatus: string
  paymentRenewalDate: string
}

const UpcomingRenewals: React.FC = () => {
  const [upcomingRenewals, setUpcomingRenewals] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingRenewals()
  }, [])

  const fetchUpcomingRenewals = async () => {
    try {
      const data = await subscriptionService.getUpcomingRenewals()
      setUpcomingRenewals(data)
    } catch (error) {
      console.error('Error fetching upcoming renewals:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysUntilRenewal = (renewalDate: string) => {
    const today = new Date()
    const renewal = new Date(renewalDate)
    const diffTime = renewal.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900'
    if (days <= 3) return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900'
    if (days <= 7) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900'
    return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900'
  }

  const getUrgencyText = (days: number) => {
    if (days <= 0) return 'Overdue'
    if (days === 1) return 'Tomorrow'
    if (days <= 7) return `${days} days`
    return `${days} days`
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upcoming Renewals</h1>
        <p className="text-gray-600 dark:text-gray-400">Subscriptions renewing in the next 7 days</p>
      </div>

      {/* Renewals List */}
      <div className="card">
        {upcomingRenewals.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <CalendarIcon className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No upcoming renewals</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You don't have any subscriptions renewing in the next 7 days.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingRenewals.map((subscription) => {
              const daysUntilRenewal = getDaysUntilRenewal(subscription.paymentRenewalDate)
              const urgencyColor = getUrgencyColor(daysUntilRenewal)
              const urgencyText = getUrgencyText(daysUntilRenewal)

              return (
                <div
                  key={subscription._id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {subscription.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{subscription.currency} {subscription.price} / {subscription.frequency}</span>
                        <span className="capitalize">{subscription.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Renews on
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {new Date(subscription.paymentRenewalDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${urgencyColor}`}>
                      {urgencyText}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {upcomingRenewals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {upcomingRenewals.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Renewals
            </div>
          </div>

          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {upcomingRenewals.reduce((sum, sub) => sum + sub.price, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Amount
            </div>
          </div>

          <div className="card text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {upcomingRenewals.filter(sub => getDaysUntilRenewal(sub.paymentRenewalDate) <= 3).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Urgent (≤3 days)
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpcomingRenewals
