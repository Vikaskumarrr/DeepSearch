# 🏗️ DeepSearch System Architecture

## 📊 **High-Level System Overview**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Query   │───▶│   AI Processing  │───▶│  Enhanced      │
│                │    │   Pipeline       │    │  Response      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  Google Search   │
                       │  (URL Discovery) │
                       └──────────────────┘
```

## 🔄 **Detailed Flow Architecture**

### **1. User Query Processing**
```
User Input → Query Validation → Query Analysis → Route to PARALLEL AI Pipeline
```

### **2. PARALLEL AI Processing Pipeline**
```
Query → Launch ALL AI Providers Simultaneously
  │
  ├─ Gemini API ──────────┐
  ├─ OpenRouter API ──────┤
  ├─ Portia.ai API ───────┤
  └─ Google Search ───────┘
  │
  ▼
Wait for ALL responses (Promise.allSettled)
  │
  ▼
Combine successful responses + Search URLs
  │
  ▼
Enhanced Multi-AI Response
```

### **3. Response Enhancement**
```
Multiple AI Responses → Google Search URLs → Combine & Format → Final Enhanced Response
```

## 🧠 **AI Provider Architecture**

### **Provider Priority System**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Gemini API    │───▶│  OpenRouter API  │───▶│  Portia.ai API  │
│   (Primary)     │    │   (Secondary)    │    │   (Tertiary)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   ┌─────────┐           ┌─────────┐           ┌─────────┐
   │ Success │           │ Success │           │ Success │
   └─────────┘           └─────────┘           └─────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ Intelligent     │
                       │ Fallback       │
                       │ System         │
                       └─────────────────┘
```

## 🏗️ **Component Architecture**

### **Frontend Components**
```
┌─────────────────────────────────────────────────────────────┐
│                    Main Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Header    │  │  Search     │  │   Results   │        │
│  │             │  │   Input     │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Theme      │  │  Chat       │  │   Agent     │        │
│  │  Toggle     │  │  History    │  │  Interface  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### **Backend API Structure**
```
┌─────────────────────────────────────────────────────────────┐
│                    API Routes                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   /search   │  │ /search/    │  │   /agent    │        │
│  │             │  │  stream     │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │/conversation│  │   /auth     │  │   /health   │        │
│  │     s       │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 **Data Flow Architecture**

### **Search Request Flow**
```
1. User submits query
   ↓
2. Frontend validates input
   ↓
3. API route receives request
   ↓
4. PortiaAIClient processes query
   ↓
5. AI provider selection (Gemini → OpenRouter → Portia.ai)
   ↓
6. Response generation
   ↓
7. Google Search for additional URLs
   ↓
8. Response formatting and enhancement
   ↓
9. Return to client
```

### **Streaming Response Flow**
```
1. User submits query
   ↓
2. AI response generation starts
   ↓
3. Response streaming begins
   ↓
4. Word-by-word transmission
   ↓
5. Source URLs appended
   ↓
6. Stream completion
```

## 🗄️ **Database Architecture**

### **Prisma Schema Overview**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│     User        │    │   Conversation   │    │     Message     │
│                 │    │                  │    │                 │
│ - id            │◄───│ - id             │◄───│ - id            │
│ - email         │    │ - title          │    │ - content       │
│ - name          │    │ - userId         │    │ - role          │
│ - createdAt     │    │ - createdAt      │    │ - conversationId│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔐 **Security Architecture**

### **Authentication Flow**
```
User Login → NextAuth.js → JWT Token → Protected Routes → API Access
```

### **API Security Layers**
```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Input     │  │   Rate      │  │   CORS      │        │
│  │ Validation  │  │  Limiting   │  │  Policy     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   API Key   │  │   Session   │  │   Error     │        │
│  │  Validation │  │  Management │  │  Handling   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 📊 **Performance Architecture**

### **Caching Strategy**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Browser       │───▶│   Next.js        │───▶│   Database      │
│   Cache         │    │   Cache          │    │   Cache         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Response Time Optimization**
```
Query → AI Processing (1-2s) → Search Enhancement (0.5s) → Total: <3s
```

## 🔄 **Fallback Architecture**

### **Intelligent Fallback System**
```
┌─────────────────────────────────────────────────────────────┐
│                Fallback Decision Tree                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Query     │  │   Query     │  │   Query     │        │
│  │   Type      │  │  Analysis   │  │  Subject    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                │                │               │
│         ▼                ▼                ▼               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Definition  │  │ How-to      │  │ Comparison  │        │
│  │ Response    │  │ Response    │  │ Response    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 **Scalability Architecture**

### **Horizontal Scaling**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Load          │───▶│   Instance 1     │    │   Instance N    │
│   Balancer      │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Shared         │
                       │   Database       │
                       └──────────────────┘
```

### **Microservices Architecture (Future)**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API Gateway   │───▶│   Search         │    │   AI            │
│                 │    │   Service        │    │   Service       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌──────────────────┐    ┌──────────────────┐
                       │   Database       │    │   Cache          │
                       │   Service        │    │   Service        │
                       └──────────────────┘    └──────────────────┘
```

## 📈 **Monitoring Architecture**

### **Health Check System**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Health        │───▶│   Database       │    │   AI Provider   │
│   Endpoint      │    │   Check          │    │   Status        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌──────────────────┐    ┌──────────────────┐
                       │   Response       │    │   Metrics        │
                       │   Generation     │    │   Collection     │
                       └──────────────────┘    └──────────────────┘
```

## 🔧 **Configuration Architecture**

### **Environment Management**
```
┌─────────────────────────────────────────────────────────────┐
│                Configuration Layers                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   .env      │  │   .env.local│  │   .env.prod │        │
│  │  (default)  │  │  (local)    │  │  (prod)     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   API Keys  │  │   Database  │  │   Feature   │        │
│  │             │  │   URLs      │  │   Flags     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 **Key Design Principles**

### **1. Resilience**
- Multiple AI provider fallbacks
- Graceful degradation
- Intelligent mock responses

### **2. Performance**
- Streaming responses
- Intelligent caching
- Optimized database queries

### **3. Scalability**
- Stateless API design
- Horizontal scaling ready
- Microservices architecture ready

### **4. Security**
- Input validation
- API key protection
- Rate limiting
- CORS configuration

### **5. Maintainability**
- Clean code structure
- Comprehensive error handling
- Detailed logging
- Type safety with TypeScript

---

**This architecture ensures DeepSearch is production-ready, scalable, and maintainable! 🚀**
