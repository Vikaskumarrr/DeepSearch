'use client'

import { SearchInput } from '@/components/ui/search-input'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, Globe, Zap, Shield, ArrowRight, Play, Star, CheckCircle, Users, Rocket, Target, Brain } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            DeepSearch
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link href="/help" className="text-gray-300 hover:text-white transition-colors">Help</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">Login</button>
          <Link 
            href="/search-only"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">More than an AI search engine</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Your questions deserve
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              {' '}better answers
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            DeepSearch unites cutting-edge AI intelligence with real-time web search to create, 
            analyze, and deliver comprehensive answers that go beyond simple responses. 
            Every answer is powered by the latest information and enhanced with AI insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
            <Link 
              href="/search-only"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25"
            >
              <span>Start Searching Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/demo"
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </Link>
          </div>

          {/* Search Input */}
          <div className="mb-20">
            <SearchInput 
              onSearch={(query) => {
                window.location.href = `/search?q=${encodeURIComponent(query)}`
              }}
              className="mb-8"
            />
            <p className="text-sm text-gray-500">Try asking: "What are the latest developments in AI?" or "How to build a React application?"</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="group">
              <div className="relative p-8 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI-Powered Intelligence
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced AI models analyze and synthesize information to provide comprehensive, 
                  contextually relevant answers to your questions.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="relative p-8 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Real-time Web Search
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Access the latest information from across the web with live search results 
                  that are always up-to-date and relevant.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="relative p-8 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Source Verification
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Every answer includes verified sources and citations so you can fact-check, 
                  learn more, and trust the information you receive.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-24 p-8 bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">10M+</div>
                <div className="text-gray-400">Questions Answered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">Availability</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400">Languages</div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div id="how-it-works" className="mt-24">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Ask Your Question</h3>
                <p className="text-gray-400">Type your question in natural language, just like you'd ask a human expert.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
                <p className="text-gray-400">Our AI searches the web, analyzes information, and synthesizes the best answer.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Get Your Answer</h3>
                <p className="text-gray-400">Receive a comprehensive answer with sources, insights, and related information.</p>
              </div>
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
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <Link href="/features" className="hover:text-gray-300 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
            <Link href="/help" className="hover:text-gray-300 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
