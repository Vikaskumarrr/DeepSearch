import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DeepSearch - Advanced AI-Powered Search Engine',
  description: 'DeepSearch unites cutting-edge AI intelligence with real-time web search to create, analyze, and deliver comprehensive answers that go beyond simple responses.',
  keywords: 'AI search, AI assistant, web search, source citations, Portia AI, artificial intelligence, search engine, DeepSearch',
  authors: [{ name: 'DeepSearch Team' }],
  openGraph: {
    title: 'DeepSearch - Advanced AI-Powered Search Engine',
    description: 'Get comprehensive AI-powered answers with real-time web search and intelligent insights',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepSearch - Advanced AI-Powered Search Engine',
    description: 'Get comprehensive AI-powered answers with real-time web search and intelligent insights',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
