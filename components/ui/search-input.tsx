'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Mic, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const exampleQueries = [
  "What are the latest developments in AI?",
  "How to build a React application?",
  "What is the best way to learn programming?",
  "Explain quantum computing in simple terms",
  "What are the benefits of TypeScript?"
]

export function SearchInput({ onSearch, placeholder = "Ask anything...", className, disabled }: SearchInputProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isFocused) {
      setShowExamples(true)
    } else {
      // Delay hiding examples to allow clicking on them
      const timer = setTimeout(() => setShowExamples(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isFocused])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !disabled) {
      onSearch(query.trim())
      setQuery('')
      setShowExamples(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setQuery(example)
    onSearch(example)
    setShowExamples(false)
    inputRef.current?.blur()
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        onSearch(transcript)
      }
      
      recognition.start()
    }
  }

  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full pl-12 pr-20 py-5 text-lg bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-3xl shadow-2xl focus:border-purple-500/50 focus:outline-none transition-all duration-300",
              "placeholder-gray-400 text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:border-gray-600/70"
            )}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              onClick={handleVoiceInput}
              className="p-2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
              title="Voice input"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={!query.trim() || disabled}
              className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
              title="Search"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Example queries */}
      {showExamples && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 p-6 z-10">
          <p className="text-sm text-gray-300 mb-4 font-medium">Try asking about:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-left p-4 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-2xl transition-all duration-200 text-sm hover:scale-105 transform"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
