'use client'

import { SearchInput } from '@/components/ui/search-input'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SearchOnlyPage() {
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

      {/* Main Search Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Search the Web with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              {' '}AI Intelligence
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
            Ask anything and get comprehensive answers powered by real-time web search and advanced AI analysis.
          </p>

          {/* Search Input */}
          <div className="mb-8">
            <SearchInput 
              onSearch={(query) => {
                window.location.href = `/search?q=${encodeURIComponent(query)}`
              }}
              placeholder="Ask anything..."
              className="mb-8"
            />
            <p className="text-sm text-gray-500">Try asking: "What are the latest developments in AI?" or "How to build a React application?"</p>
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
