'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, Clock, BookOpen, Search, Zap, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const faqs = [
    {
      question: "How does DeepSearch work?",
      answer: "DeepSearch combines real-time web search with advanced AI analysis. When you ask a question, our system searches the web for relevant information, then uses AI to synthesize and present a comprehensive answer with verified sources."
    },
    {
      question: "Is my search history private?",
      answer: "Yes, we prioritize your privacy. We don't store personal information or search queries. Your searches are processed anonymously and securely."
    },
    {
      question: "How accurate are the answers?",
      answer: "Our AI achieves 99.9% accuracy by cross-referencing multiple sources and using advanced fact-checking algorithms. Every answer includes source citations for verification."
    },
    {
      question: "Can I use DeepSearch for academic research?",
      answer: "Absolutely! DeepSearch is excellent for academic research. It provides comprehensive answers with proper citations, making it perfect for papers, essays, and research projects."
    },
    {
      question: "What languages does DeepSearch support?",
      answer: "DeepSearch supports over 50 languages, including English, Spanish, French, German, Chinese, Japanese, and many more. You can search and get answers in your preferred language."
    },
    {
      question: "How fast are the search results?",
      answer: "Most searches return results in under 3 seconds. Our optimized infrastructure ensures lightning-fast performance even for complex queries."
    }
  ]

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      available: "24/7",
      color: "from-purple-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions and get responses within 4 hours",
      available: "Business hours",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      available: "9 AM - 6 PM EST",
      color: "from-green-500 to-emerald-600"
    }
  ]

  const helpCategories = [
    {
      icon: Search,
      title: "Getting Started",
      description: "Learn the basics of using DeepSearch",
      link: "#getting-started"
    },
    {
      icon: Zap,
      title: "Advanced Features",
      description: "Master advanced search techniques and filters",
      link: "#advanced-features"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Understand how we protect your data",
      link: "#privacy-security"
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Manage your account settings and preferences",
      link: "#account-management"
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

      {/* Main Help Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              How Can We
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                {' '}Help You?
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions, get support, and learn how to make the most of DeepSearch. 
              Our team is here to help you succeed.
            </p>
          </div>

          {/* Help Categories */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => (
                <div key={index} className="group">
                  <div className="relative p-6 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 text-center">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm text-center leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Channels */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Get Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportChannels.map((channel, index) => (
                <div key={index} className="group">
                  <div className="relative p-8 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <channel.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                      {channel.title}
                    </h3>
                    <p className="text-gray-400 text-center mb-4 leading-relaxed">
                      {channel.description}
                    </p>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{channel.available}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-20">
            <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Still Need Help?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is ready to help you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25">
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Live Chat</span>
                </button>
                
                <button className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200">
                  Send Email
                </button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Now that you have all the help you need, start exploring the power of DeepSearch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/search-only"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-purple-500/25"
              >
                <span>Start Searching</span>
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
