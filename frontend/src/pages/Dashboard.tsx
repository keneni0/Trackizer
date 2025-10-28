import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { subscriptionService } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { 
  CreditCardIcon, 
  PlusIcon, 
  CalendarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

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

const Dashboard: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [upcomingRenewals, setUpcomingRenewals] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSubscriptions: 0,
    totalMonthlyCost: 0,
    activeSubscriptions: 0,
    upcomingRenewals: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [subscriptionsData, renewalsData] = await Promise.all([
        subscriptionService.getSubscriptions(),
        subscriptionService.getUpcomingRenewals()
      ])

      setSubscriptions(subscriptionsData)
      setUpcomingRenewals(renewalsData)

      // Calculate stats
      const totalMonthlyCost = subscriptionsData.reduce((sum: number, sub: Subscription) => {
        const monthlyRate = sub.frequency === 'yearly' ? sub.price / 12 : 
                           sub.frequency === 'weekly' ? sub.price * 4.33 : 
                           sub.frequency === 'daily' ? sub.price * 30 : sub.price
        return sum + monthlyRate
      }, 0)

      setStats({
        totalSubscriptions: subscriptionsData.length,
        totalMonthlyCost,
        activeSubscriptions: subscriptionsData.filter((sub: Subscription) => sub.paymentStatus === 'active').length,
        upcomingRenewals: renewalsData.length
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const { user } = useAuth()
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getCircularProgress = (value: number, max: number) => {
    const percentage = (value / max) * 100
    const strokeDasharray = 2 * Math.PI * 70 // radius = 70
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100
    return { strokeDasharray, strokeDashoffset }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  const maxBudget = 2000 // You can make this dynamic later

  return (
    <div className="space-y-8 pb-8">
      {/* Header with Greeting */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            {getGreeting()}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {user?.name || 'User'}
          </p>
        </div>
        <Link
          to="/app/add-subscription"
          className="btn-primary flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Subscription</span>
        </Link>
      </div>

      {/* Main Stats - Monthly Bills with Circular Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Monthly Bill Card with Circular Chart */}
        <div className="lg:col-span-2">
          <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-primary-100 text-sm font-medium mb-1">Monthly Bills</p>
                <h2 className="text-5xl font-bold tracking-tight">
                  ${stats.totalMonthlyCost.toFixed(2)}
                </h2>
                <div className="flex gap-4 mt-4">
                  <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                    Daily
                  </button>
                  <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                    Weekly
                  </button>
                  <button className="px-4 py-1.5 bg-white/90 hover:bg-white rounded-lg text-sm font-medium text-primary-700 transition-colors">
                    Monthly
                  </button>
                </div>
              </div>
              
              {/* Circular Progress Chart */}
              <div className="relative w-40 h-40">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-white/20"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={getCircularProgress(stats.totalMonthlyCost, maxBudget).strokeDasharray}
                    strokeDashoffset={getCircularProgress(stats.totalMonthlyCost, maxBudget).strokeDashoffset}
                    className="text-white transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">{Math.round((stats.totalMonthlyCost / maxBudget) * 100)}%</span>
                  <span className="text-xs text-primary-100">of ${maxBudget}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Column */}
        <div className="space-y-4">
          <div className="card bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Active Subs</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.activeSubscriptions}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-xl">
                <ChartBarIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="card bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{stats.upcomingRenewals}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-800 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <CreditCardIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maximum Subs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stats.totalSubscriptions}</p>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
              <ArrowTrendingUpIcon className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Per Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                ${stats.totalSubscriptions > 0 ? (stats.totalMonthlyCost / stats.totalSubscriptions).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
              <ClockIcon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Next Renewal</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {upcomingRenewals[0] ? new Date(upcomingRenewals[0].paymentRenewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Subscriptions - Modern Card Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Subscriptions</h3>
          <Link
            to="/app/subscriptions"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-500 text-sm font-medium"
          >
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.length === 0 ? (
            <div className="col-span-full card text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <CreditCardIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No subscriptions yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Start tracking your subscriptions to see insights here</p>
              <Link to="/app/add-subscription" className="btn-primary inline-flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Your First Subscription
              </Link>
            </div>
          ) : (
            subscriptions.slice(0, 6).map((subscription) => {
              const getIconBg = (name: string) => {
                const nameLower = name.toLowerCase()
                if (nameLower.includes('spotify')) return 'bg-green-500'
                if (nameLower.includes('netflix')) return 'bg-red-600'
                if (nameLower.includes('youtube')) return 'bg-red-500'
                if (nameLower.includes('amazon') || nameLower.includes('prime')) return 'bg-blue-400'
                if (nameLower.includes('apple')) return 'bg-gray-800'
                if (nameLower.includes('disney')) return 'bg-blue-600'
                if (nameLower.includes('hulu')) return 'bg-green-400'
                if (nameLower.includes('hbo')) return 'bg-purple-600'
                return 'bg-gradient-to-br from-primary-500 to-primary-700'
              }

              const getInitial = (name: string) => {
                return name.charAt(0).toUpperCase()
              }

              return (
                <div
                  key={subscription._id}
                  className="card hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${getIconBg(subscription.name)} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {getInitial(subscription.name)}
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      subscription.paymentStatus === 'active' 
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                    }`}>
                      {subscription.paymentStatus}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {subscription.name}
                  </h4>
                  
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {subscription.currency}{subscription.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /{subscription.frequency === 'monthly' ? 'mo' : subscription.frequency === 'yearly' ? 'yr' : subscription.frequency}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Renews {new Date(subscription.paymentRenewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Upcoming Renewals Timeline */}
      {upcomingRenewals.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Upcoming Renewals</h3>
            <Link
              to="/app/upcoming-renewals"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-500 text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingRenewals.slice(0, 4).map((subscription) => (
              <div
                key={subscription._id}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/10 dark:to-transparent rounded-xl border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">
                    {new Date(subscription.paymentRenewalDate).getDate()}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {subscription.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(subscription.paymentRenewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {subscription.currency}{subscription.price}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {subscription.frequency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
