import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  CreditCardIcon, 
  PlusIcon, 
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useTheme } from '../../context/ThemeContext'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { isDark } = useTheme()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
    { name: 'Subscriptions', href: '/app/subscriptions', icon: CreditCardIcon },
    { name: 'Add Subscription', href: '/app/add-subscription', icon: PlusIcon },
    { name: 'Upcoming Renewals', href: '/app/upcoming-renewals', icon: CalendarIcon },
  ]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-2xl font-black tracking-widest logo-font text-primary-600 dark:text-primary-400 uppercase">
            Trackizer
          </h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200`}
                >
                  <item.icon
                    className={`${
                      isActive
                        ? 'text-primary-500 dark:text-primary-400'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                    } mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-200`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
