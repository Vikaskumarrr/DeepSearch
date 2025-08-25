'use client'

import { useState } from 'react'
import { Copy, ExternalLink, ChevronDown, ChevronUp, User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils/cn'
import { Source } from '@/lib/types'

interface MessageProps {
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
  timestamp?: Date
  className?: string
}

export function Message({ role, content, sources, timestamp, className }: MessageProps) {
  const [showSources, setShowSources] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className={cn(
      "flex gap-4 p-6 rounded-3xl backdrop-blur-sm",
      role === 'user' 
        ? "bg-blue-900/20 border border-blue-700/30 ml-12" 
        : "bg-gray-900/30 border border-gray-700/30 mr-12",
      className
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center text-white flex-shrink-0",
        role === 'user' 
          ? "bg-gradient-to-br from-blue-500 to-blue-600" 
          : "bg-gradient-to-br from-purple-500 to-blue-600"
      )}>
        {role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-white">
            {role === 'user' ? 'You' : 'AI Assistant'}
          </span>
          <div className="flex items-center space-x-3">
            {timestamp && (
              <span className="text-sm text-gray-400">
                {formatTimestamp(timestamp)}
              </span>
            )}
            {role === 'assistant' && (
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 rounded-xl hover:bg-gray-800/50"
                title="Copy response"
              >
                <Copy className={cn("w-4 h-4", copied && "text-green-400")} />
              </button>
            )}
          </div>
        </div>

        {/* Message content */}
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-purple-300 prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <pre className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-800/50 px-2 py-1 rounded-lg text-sm text-purple-300" {...props}>
                    {children}
                  </code>
                )
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 bg-purple-900/20 rounded-r-xl py-2">
                    {children}
                  </blockquote>
                )
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Sources */}
        {sources && sources.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:bg-purple-900/20 px-3 py-2 rounded-xl"
            >
              {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{sources.length} source{sources.length !== 1 ? 's' : ''}</span>
            </button>

            {showSources && (
              <div className="mt-4 space-y-3">
                {sources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl hover:border-purple-500/30 transition-all duration-200"
                  >
                    {source.favicon && (
                      <img
                        src={source.favicon}
                        alt=""
                        className="w-5 h-5 mt-1 flex-shrink-0 rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white line-clamp-2">
                        {source.title}
                      </h4>
                      {source.description && (
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                          {source.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-3">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center space-x-1 transition-colors duration-200"
                        >
                          <span className="truncate">{source.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
