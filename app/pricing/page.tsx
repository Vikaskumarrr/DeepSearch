'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, ArrowLeft, Check, Star, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI-powered search",
      features: [
        "100 searches per month",
        "Basic AI responses",
        "Source citations",
        "Standard support",
        "Web search access"
      ],
      popular: false,
      icon: Sparkles,
      color: "from-gray-500 to-gray-600"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For power users who need more advanced features",
      features: [
        "Unlimited searches",
        "Advanced AI responses",
        "Priority processing",
        "Advanced filters",
        "Search history",
        "Email support",
        "API access"
      ],
      popular: true,
      icon: Zap,
      color: "from-purple-500 to-blue-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For teams and organizations with custom requirements",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantees",
        "Custom AI models",
        "White-label options"
      ],
      popular: false,
      icon: Crown,
      color: "from-yellow-500 to-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link 
            href="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/"
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              DeepSearch
            </h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Pricing Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Simple, Transparent
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                {' '}Pricing
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. Start free and upgrade as you grow. 
              All plans include our core AI-powered search capabilities.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 h-full ${
                  plan.popular 
                    ? 'bg-gray-900/40 border-purple-500/50 shadow-2xl shadow-purple-500/25' 
                    : 'bg-gray-900/30 border-gray-700/30 hover:border-purple-500/30'
                }`}>
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period !== "forever" && (
                        <span className="text-gray-400 ml-2">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    {plan.name === "Free" ? (
                      <Link 
                        href="/search-only"
                        className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 inline-block"
                      >
                        Get Started
                      </Link>
                    ) : plan.name === "Pro" ? (
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105">
                        Start Pro Trial
                      </button>
                    ) : (
                      <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105">
                        Contact Sales
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Can I change plans anytime?</h3>
                <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial?</h3>
                <p className="text-gray-400">Pro plan comes with a 7-day free trial. No credit card required to start.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
              </div>
              
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Can I cancel anytime?</h3>
                <p className="text-gray-400">Absolutely. You can cancel your subscription at any time with no cancellation fees.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing the power of AI-powered search.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/search-only"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25"
              >
                <span>Start Free Trial</span>
                <Sparkles className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/features"
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
              >
                View Features
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-16 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">DeepSearch</span>
          </div>
          <p className="text-gray-400 mb-8">
            Powered by Portia AI • Built with Next.js and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
