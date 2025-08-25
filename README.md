# DeepSearch - AI-Powered Search Engine

A production-ready AI search engine that combines multiple AI providers with intelligent fallbacks and Google Search integration.

## 🚀 **System Architecture**

```
User Query → PARALLEL AI Processing → Combine Results → Enhanced Response
                ↙️     ↓     ↘️
            Gemini  Portia  OpenRouter
                ↖️     ↑     ↗️
            Google Search (URLs)
```

### **AI Provider Flow:**
1. **🔄 Parallel Execution** - All AI providers run simultaneously
2. **🎯 Response Combination** - Multiple AI insights combined
3. **🔍 Google Search** - Additional URLs and resources
4. **🛡️ Intelligent Fallback** - Context-aware responses when APIs fail

## 🏗️ **Core Components**

### **Frontend**
- **Next.js 14** with TypeScript
- **Tailwind CSS** for modern UI
- **Theme switching** (Light/Dark mode)
- **Responsive design** for all devices

### **Backend APIs**
- **`/api/search`** - Main search endpoint
- **`/api/search/stream`** - Streaming search responses
- **`/api/agent`** - AI agent for email processing
- **`/api/conversations`** - Chat history management

### **AI Integration**
- **Google Gemini API** - Primary AI responses
- **OpenRouter API** - Qwen model integration
- **Portia.ai API** - Email processing and enhancement
- **Google Custom Search** - URL discovery and resources

## 🚀 **Quick Start**

### **1. Environment Setup**
```bash
# Copy environment template
cp env.example .env

# Configure your API keys
GEMINI_API_KEY="your-gemini-key"
OPENROUTER_API_KEY="your-openrouter-key"
PORTIA_API_KEY="your-portia-key"
GOOGLE_SEARCH_API_KEY="your-google-search-key"
GOOGLE_SEARCH_ENGINE_ID="your-search-engine-id"
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Database Setup**
```bash
npx prisma generate
npx prisma db push
```

### **4. Run Development Server**
```bash
npm run dev
```

### **5. Build for Production**
```bash
npm run build
npm start
```

## 🔧 **Configuration**

### **Required API Keys**
- **Gemini**: [Get from Google AI Studio](https://makersuite.google.com/app/apikey)
- **OpenRouter**: [Get from OpenRouter](https://openrouter.ai/keys)
- **Portia.ai**: [Get from Portia](https://portia.ai)
- **Google Search**: [Get from Google Cloud](https://console.cloud.google.com/)

### **Optional Features**
- **Database**: PostgreSQL for conversation history
- **Redis**: For caching (optional)

## 📱 **Features**

### **Search Capabilities**
- **AI-Powered Responses** - Intelligent, contextual answers
- **Real-time Streaming** - Word-by-word response generation
- **Source Integration** - Relevant URLs and resources
- **Conversation History** - Persistent chat sessions

### **AI Agent**
- **Email Processing** - Summarize, analyze, and extract insights
- **Podcast Generation** - Create audio content from emails
- **AI News Updates** - Generate news summaries
- **Multi-format Output** - Structured data for various use cases

### **User Experience**
- **Modern UI/UX** - Clean, intuitive interface
- **Theme Support** - Light and dark modes
- **Responsive Design** - Works on all devices
- **Fast Performance** - Optimized for speed

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm install -g vercel
vercel --prod
```

### **Docker**
```bash
docker build -t deepsearch .
docker run -p 3000:3000 deepsearch
```

### **Traditional Hosting**
```bash
npm run build
npm start
```

## 📊 **Performance**

- **Response Time**: < 2 seconds for AI responses
- **Fallback System**: 100% uptime with intelligent responses
- **Scalability**: Built for high-traffic production use
- **Caching**: Intelligent caching for repeated queries

## 🔒 **Security**

- **API Key Protection** - Environment variable security
- **Input Validation** - Sanitized user inputs
- **Rate Limiting** - Built-in request throttling
- **Error Handling** - Graceful failure management

## 🧪 **Testing**

```bash
# Run tests
npm test

# Check types
npm run type-check

# Lint code
npm run lint
```

## 📈 **Monitoring**

- **Console Logging** - Detailed execution tracking
- **Error Tracking** - Comprehensive error handling
- **Performance Metrics** - Response time monitoring
- **API Health Checks** - Provider status monitoring

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

MIT License - see LICENSE file for details

## 🆘 **Support**

- **Documentation**: Check the docs folder
- **Issues**: Report bugs on GitHub
- **Discussions**: Join community discussions

---

**Built with ❤️ using Next.js, TypeScript, and modern AI technologies**
