'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, ArrowLeft, Brain, Globe, Target, Zap, Shield, Users, Clock, BarChart3, Search, FileText } from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced AI models analyze and synthesize information to provide comprehensive, contextually relevant answers to your questions.",
      color: "from-purple-500/20 to-blue-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Globe,
      title: "Real-time Web Search",
      description: "Access the latest information from across the web with live search results that are always up-to-date and relevant.",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: Target,
      title: "Source Verification",
      description: "Every answer includes verified sources and citations so you can fact-check, learn more, and trust the information you receive.",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description: "Get answers in seconds with our optimized AI and search infrastructure designed for speed and efficiency.",
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your searches are private and secure. We don't store personal information or search history.",
      color: "from-red-500/20 to-pink-500/20",
      iconColor: "text-red-400"
    },
    {
      icon: Users,
      title: "Multi-language Support",
      description: "Search and get answers in over 50 languages, making DeepSearch accessible to users worldwide.",
      color: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400"
    }
  ]

  const advancedFeatures = [
    {
      icon: Search,
      title: "Advanced Search Filters",
      description: "Filter results by date, source type, language, and more to get exactly what you're looking for."
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Upload documents and get AI-powered summaries, key insights, and answers to specific questions."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your search patterns, save important findings, and organize your research efficiently."
    },
    {
      icon: Clock,
      title: "Search History",
      description: "Access your previous searches and answers, with the ability to continue conversations and refine results."
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

      {/* Main Features Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Powerful Features for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                {' '}Intelligent Search
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              DeepSearch combines cutting-edge AI technology with comprehensive web search to deliver 
              the most intelligent and accurate answers to your questions.
            </p>
          </div>

          {/* Core Features Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="relative p-8 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Advanced Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="group">
                  <div className="relative p-8 bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-20">
            <div className="p-8 bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl">
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
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Experience DeepSearch?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/search-only"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25"
              >
                <span>Start Searching Now</span>
                <Sparkles className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/demo"
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200"
              >
                Watch Demo
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
