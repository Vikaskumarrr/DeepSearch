'use client'

import { useState, useEffect, useRef, Suspense } from 'react'

import { useSearchParams } from 'next/navigation'
import { SearchInput } from '@/components/ui/search-input'
import { Message } from '@/components/ui/message'
import { LoadingSkeleton, TypingIndicator } from '@/components/ui/loading-skeleton'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Sparkles, Plus, ArrowLeft } from 'lucide-react'
import { SearchResponse, Source, Message as MessageType } from '@/lib/types'
import Link from 'next/link'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentResponse, setCurrentResponse] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentResponse])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)
    setCurrentResponse('')
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      conversationId: conversationId || 'temp',
      role: 'user',
      content: searchQuery,
      createdAt: new Date()
    }

    if (!conversationId) {
      // Create new conversation
      try {
        const response = await fetch('/api/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: searchQuery })
        })
        const data = await response.json()
        setConversationId(data.conversation.id)
        userMessage.conversationId = data.conversation.id
      } catch (error) {
        console.error('Failed to create conversation:', error)
      }
    }

    setMessages(prev => [...prev, userMessage])

    try {
      // Use streaming API for better UX
      const response = await fetch('/api/search/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: searchQuery,
          conversationId: conversationId || 'temp'
        })
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      setIsStreaming(true)
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      let fullResponse = ''
      let sources: Source[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = new TextDecoder().decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.content) {
                fullResponse += data.content
                setCurrentResponse(fullResponse)
              }
              
              if (data.sources) {
                sources = data.sources
              }
              
              if (data.done) {
                // Add AI message to conversation
                const aiMessage: MessageType = {
                  id: (Date.now() + 1).toString(),
                  conversationId: conversationId || 'temp',
                  role: 'assistant',
                  content: fullResponse,
                  sources,
                  createdAt: new Date()
                }
                
                setMessages(prev => [...prev, aiMessage])
                setSearchResults({
                  answer: fullResponse,
                  sources,
                  relatedQuestions: [],
                  conversationId: conversationId || undefined
                })
                break
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      setIsStreaming(false)
      setCurrentResponse('')
    } catch (error) {
      console.error('Search error:', error)
      setError('Failed to get search results. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewConversation = () => {
    setConversationId(null)
    setMessages([])
    setSearchResults(null)
    setError(null)
    setCurrentResponse('')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header */}
      <header className="relative z-10 bg-gray-900/30 backdrop-blur-sm border-b border-gray-700/30 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <div className="flex items-center space-x-3">
                <Link 
                  href="/"
                  className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-semibold text-white">
                    DeepSearch
                  </h1>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleNewConversation}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800/50 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Search Input */}
      <div className="relative z-10 bg-gray-900/20 backdrop-blur-sm border-b border-gray-700/30">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <SearchInput 
            onSearch={handleSearch}
            placeholder="Ask a follow-up question..."
            disabled={isLoading || isStreaming}
          />
        </div>
      </div>

      {/* Messages */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Display existing messages */}
          {messages.map((message) => (
            <Message
              key={message.id}
              role={message.role}
              content={message.content}
              sources={message.sources}
              timestamp={message.createdAt}
            />
          ))}

          {/* Show typing indicator while streaming */}
          {isStreaming && <TypingIndicator />}

          {/* Show current streaming response */}
          {isStreaming && currentResponse && (
            <Message
              role="assistant"
              content={currentResponse}
              sources={[]}
              timestamp={new Date()}
            />
          )}

          {/* Show loading skeleton while searching */}
          {isLoading && !isStreaming && <LoadingSkeleton />}

          {/* Error message */}
          {error && (
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/50 rounded-3xl p-6 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Related questions */}
          {searchResults && searchResults.relatedQuestions && searchResults.relatedQuestions.length > 0 && (
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/30">
              <h3 className="text-lg font-semibold text-white mb-4">
                Related Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.relatedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(question)}
                    className="text-left p-4 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-2xl transition-all duration-200 text-sm hover:scale-105 transform"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>
    </div>
  )
}


export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchPageContent />
    </Suspense>
  )
}
