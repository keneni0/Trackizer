import React from 'react'
import { Link } from 'react-router-dom'
import { 
  SparklesIcon, 
  BellIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse delay-75"></div>
        <div className="absolute bottom-32 right-40 w-28 h-28 bg-green-500 rounded-full opacity-20 blur-3xl animate-pulse delay-150"></div>
        <div className="absolute bottom-20 left-32 w-20 h-20 bg-purple-600 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        
        {/* Floating Service Icons */}
        <div className="absolute top-10 right-32 w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-2xl animate-float">
          N
        </div>
        <div className="absolute top-32 right-64 w-14 h-14 bg-blue-400 rounded-2xl flex items-center justify-center text-xl font-bold shadow-2xl animate-float-delay-1">
          💧
        </div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-2xl animate-float-delay-2">
          S
        </div>
        <div className="absolute top-1/2 right-40 w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-xl font-bold shadow-2xl animate-float">
          ▶
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          <span className="logo-font text-2xl">TRACKIZER</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-2.5 text-gray-300 hover:text-white font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                +12 SCREENS
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Free UI Kit for
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-purple-500 bg-clip-text text-transparent">
                subscription
              </span>
              <br />
              tracker app
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
              This is a concept of subscription management app that helps you keep track 
              of all your subscriptions and never forget to cancel them before they renew.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-semibold text-lg border border-white/20 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main Phone */}
              <div className="relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl"></div>
                
                {/* Screen Content */}
                <div className="h-full bg-gradient-to-b from-gray-800 to-gray-900 p-6 pt-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg"></div>
                      <span className="logo-font text-sm">TRACKIZER</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                  </div>

                  {/* Circular Chart */}
                  <div className="relative mb-8">
                    <div className="relative w-48 h-48 mx-auto">
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="currentColor"
                          strokeWidth="16"
                          fill="transparent"
                          className="text-gray-700"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="url(#gradient)"
                          strokeWidth="16"
                          fill="transparent"
                          strokeDasharray="502"
                          strokeDashoffset="150"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F97316" />
                            <stop offset="100%" stopColor="#EC4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold">$1,235</span>
                        <span className="text-xs text-gray-400">This month bills</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">Active subs</div>
                      <div className="text-lg font-bold">12</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">Highest</div>
                      <div className="text-lg font-bold">$19.99</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                      <div className="text-xs text-gray-400 mb-1">Lowest</div>
                      <div className="text-lg font-bold">$5.99</div>
                    </div>
                  </div>

                  {/* Tab Buttons */}
                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 py-2 bg-primary-600 rounded-lg text-xs font-medium">
                      Your subscriptions
                    </button>
                    <button className="flex-1 py-2 bg-gray-700/50 rounded-lg text-xs font-medium">
                      Upcoming bills
                    </button>
                  </div>

                  {/* Subscription Items */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-2">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-xs font-bold">S</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium">Spotify</div>
                        <div className="text-[10px] text-gray-400">$5.99</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-2">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-xs font-bold">▶</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium">YouTube Premium</div>
                        <div className="text-[10px] text-gray-400">$11.99</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Phone (smaller, offset) */}
              <div className="absolute -right-20 top-32 w-72 h-[550px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden transform rotate-6">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl"></div>
                
                <div className="h-full bg-gradient-to-b from-gray-800 to-gray-900 p-6 pt-10">
                  <div className="text-lg font-bold mb-2">Spending & Budgets</div>
                  
                  {/* Circular Progress */}
                  <div className="relative w-40 h-40 mx-auto my-6">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle cx="80" cy="80" r="60" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-700" />
                      <circle cx="80" cy="80" r="60" stroke="url(#gradient2)" strokeWidth="12" fill="transparent" strokeDasharray="377" strokeDashoffset="100" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06B6D4" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-2xl font-bold">$82.97</span>
                      <span className="text-[10px] text-gray-400">of $2,000 Budget</span>
                    </div>
                  </div>

                  <div className="text-xs text-center mb-4 text-yellow-400">
                    🔥 Your budgets are on track
                  </div>

                  {/* Budget Categories */}
                  <div className="space-y-2">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-xs font-medium flex-1">Auto & Transport</span>
                        <span className="text-xs font-bold">$25.99</span>
                      </div>
                      <div className="text-[10px] text-gray-400">$375 left to spend</div>
                      <div className="text-[10px] text-gray-400">of $400</div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-xs font-medium flex-1">Entertainment</span>
                        <span className="text-xs font-bold">$50.99</span>
                      </div>
                      <div className="text-[10px] text-gray-400">$375 left to spend</div>
                      <div className="text-[10px] text-gray-400">of $600</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 logo-font">Why Choose Trackizer?</h2>
            <p className="text-xl text-gray-400">Manage all your subscriptions in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <BellIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Reminders</h3>
              <p className="text-gray-400">Never miss a renewal date. Get notified before your subscriptions renew.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-6">
                <ChartBarIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Spending Analytics</h3>
              <p className="text-gray-400">Track your monthly spending and identify subscriptions you don't use.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheckIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
              <p className="text-gray-400">Your data is encrypted and secure. We never share your information.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mb-6">
                <CreditCardIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Categories</h3>
              <p className="text-gray-400">Organize subscriptions by categories for better management.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center mb-6">
                <ClockIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Renewal Calendar</h3>
              <p className="text-gray-400">See all upcoming renewals in a clean, easy-to-read calendar view.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center mb-6">
                <SparklesIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beautiful UI</h3>
              <p className="text-gray-400">Modern, clean interface that makes managing subscriptions a joy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to take control of your subscriptions?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of users who are saving money by tracking their subscriptions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg border border-white/20 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SparklesIcon className="h-5 w-5 text-white" />
            </div>
            <span className="logo-font text-xl">TRACKIZER</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 Trackizer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

