'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, ArrowLeft, Play, Clock, Video } from 'lucide-react'
import Link from 'next/link'

export default function DemoPage() {
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

      {/* Main Demo Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            See DeepSearch
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              {' '}in Action
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
            Watch how our AI-powered search engine transforms your questions into comprehensive, 
            well-sourced answers in real-time.
          </p>

          {/* Demo Video Placeholder */}
          <div className="mb-16">
            <div className="relative bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-purple-400" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Demo Video Coming Soon
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-2xl">
                    We're working hard to create an amazing demo that showcases all the powerful 
                    features of DeepSearch. The video will demonstrate real-time AI search, 
                    source verification, and intelligent answer generation.
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Available in the next few weeks</span>
                  </div>
                </div>

                {/* Feature Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-3xl">
                  <div className="p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Play className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Live Search</h4>
                    <p className="text-gray-400 text-sm">See real-time web search in action</p>
                  </div>
                  
                  <div className="p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">AI Analysis</h4>
                    <p className="text-gray-400 text-sm">Watch AI process and synthesize information</p>
                  </div>
                  
                  <div className="p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Quick Results</h4>
                    <p className="text-gray-400 text-sm">See answers generated in seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/search-only"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25"
            >
              <span>Try DeepSearch Now</span>
              <Sparkles className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/"
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
            >
              Back to Home
            </Link>
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
