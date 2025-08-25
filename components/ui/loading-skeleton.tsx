'use client'

import { cn } from '@/lib/utils/cn'

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("flex gap-4 p-6 rounded-3xl bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 mr-12", className)}>
      {/* Avatar skeleton */}
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex-shrink-0 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="flex-1 space-y-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-700/50 rounded-xl w-24 animate-pulse" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-20 animate-pulse" />
        </div>
        
        {/* Content lines skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-700/50 rounded-xl w-full animate-pulse" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-4/5 animate-pulse" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-3/4 animate-pulse" />
        </div>
        
        {/* Sources skeleton */}
        <div className="pt-4">
          <div className="h-4 bg-gray-700/50 rounded-xl w-32 animate-pulse mb-3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-4 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl">
                <div className="w-5 h-5 bg-gray-700/50 rounded animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700/50 rounded-xl w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-700/50 rounded-xl w-1/2 animate-pulse" />
                  <div className="h-3 bg-gray-700/50 rounded-xl w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex gap-4 p-6 rounded-3xl bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 mr-12">
      {/* Avatar */}
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
        <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
      </div>
      
      {/* Typing indicator */}
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">AI is thinking</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
