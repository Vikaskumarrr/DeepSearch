export interface User {
  id: string;
  email?: string;
  name?: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  title: string;
  userId?: string;
  user?: User;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  createdAt: Date;
}

export interface Source {
  url: string;
  title: string;
  description?: string;
  favicon?: string;
  snippet?: string;
}

export interface SearchResponse {
  answer: string;
  sources: Source[];
  relatedQuestions: string[];
  conversationId?: string;
}

export interface SearchRequest {
  query: string;
  conversationId?: string;
}

export interface SearchCache {
  id: string;
  query: string;
  response: SearchResponse;
  createdAt: Date;
  expiresAt: Date;
}

export interface FeedbackRequest {
  messageId: string;
  rating: 'positive' | 'negative';
  feedback?: string;
}

export interface PortiaAIResponse {
  content: string;
  sources?: { url: string; title: string }[];
  metadata?: Record<string, any>;
}

export interface WebSearchResult {
  title: string;
  url: string;
  description: string;
  favicon?: string;
}
