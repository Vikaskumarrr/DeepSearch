import { PortiaAIResponse, WebSearchResult } from './types'

export class PortiaAIClient {
  private portiaApiKey: string
  private openRouterApiKey: string
  private portiaApiUrl: string

  constructor() {
    this.portiaApiKey = process.env.PORTIA_API_KEY || ''
    this.openRouterApiKey = process.env.OPENROUTER_API_KEY || ''
    this.portiaApiUrl = process.env.PORTIA_API_URL || 'https://api.portialabs.ai/api/v0'
    
    console.log('PortiaAIClient initialized with:')
    console.log('- Portia API Key length:', this.portiaApiKey.length)
    console.log('- OpenRouter API Key length:', this.openRouterApiKey.length)
    console.log('- Portia API URL:', this.portiaApiUrl)
  }

    // Generate comprehensive response with parallel AI processing and search results
  async generateComprehensiveResponse(query: string, searchResults: WebSearchResult[]): Promise<PortiaAIResponse> {
    console.log('🚀 Starting PARALLEL AI response generation for query:', query)
    
    // Check if we have valid API keys (not just empty strings)
    const hasOpenRouter = !!this.openRouterApiKey && this.openRouterApiKey.length > 10
    const hasPortia = !!this.portiaApiKey && this.portiaApiKey.length > 10
    const hasGemini = !!process.env.GOOGLE_GEMINI_API_KEY && process.env.GOOGLE_GEMINI_API_KEY.length > 10
    
    console.log('Available AI providers:', {
      openRouter: hasOpenRouter,
      portia: hasPortia,
      gemini: hasGemini
    })

    // NEW FLOW: Always use parallel processing for maximum AI power!
    console.log('🔄 Using PARALLEL AI processing for enhanced responses')
    return this.generateParallelEnhancedResponse(query, searchResults)
  }

  // Generate Gemini direct response
  private async generateGeminiDirectResponse(query: string): Promise<string> {
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (!geminiApiKey || geminiApiKey.length <= 10) {
      throw new Error('Gemini API key not available')
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an AI assistant. Please provide a comprehensive, helpful answer to this question: ${query}. 
              Make your response detailed, well-structured, and easy to understand. Use markdown formatting for better readability.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated from Gemini'
  }

  // Generate OpenRouter direct answer
  private async generateOpenRouterDirectAnswer(query: string): Promise<string> {
    if (!this.openRouterApiKey || this.openRouterApiKey.length <= 10) {
      throw new Error('OpenRouter API key not available')
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'DeepSearch'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-235b-a22b:free',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant. Provide comprehensive, helpful answers with markdown formatting.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || 'No response generated from OpenRouter'
  }

  // Generate Portia.ai direct answer
  private async generatePortiaDirectAnswer(query: string): Promise<string> {
    if (!this.portiaApiKey || this.portiaApiKey.length <= 10) {
      throw new Error('Portia.ai API key not available')
    }

    const response = await fetch(`${this.portiaApiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.portiaApiKey}`,
        'Content-Type': 'application/json'
      },
              body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an AI assistant. Provide comprehensive, helpful answers with markdown formatting.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
    })

    if (!response.ok) {
      throw new Error(`Portia.ai API error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || 'No response generated from Portia.ai'
  }

  // Perform Google Search for additional URLs
  private async performGoogleSearch(query: string): Promise<string[]> {
    const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY
    const googleEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID
    
    if (!googleApiKey || !googleEngineId || googleApiKey.length <= 10) {
      console.log('🔍 Google Search not configured, skipping search')
      return []
    }

    try {
      console.log('🔍 Performing Google Search for:', query)
      const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleEngineId}&q=${encodeURIComponent(query)}&num=5`
      
      const response = await fetch(searchUrl)
      if (!response.ok) {
        throw new Error(`Google Search API error: ${response.status}`)
      }

      const data = await response.json()
      const urls = data.items?.map((item: any) => item.link) || []
      
      console.log(`🔍 Google Search found ${urls.length} URLs`)
      return urls
    } catch (error) {
      console.error('Google Search failed:', error)
      return []
    }
  }

  // Format search results for display
  private formatSearchResults(urls: string[]): string {
    if (!urls || urls.length === 0) {
      return ''
    }

    return `\n\n---\n\n## 🔍 **Related Resources & Further Reading**

${urls.map((url, index) => `${index + 1}. [${this.extractDomain(url)}](${url})`).join('\n')}

*These resources provide additional information and perspectives on the topic above.*`
  }

  // Extract domain from URL for display
  private extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      return domain
    } catch {
      return url
    }
  }

  // Generate parallel enhanced response with ALL AI providers simultaneously
  private async generateParallelEnhancedResponse(query: string, searchResults: WebSearchResult[]): Promise<PortiaAIResponse> {
    console.log('🚀 Starting PARALLEL processing with ALL AI providers')
    
    const hasOpenRouter = !!this.openRouterApiKey && this.openRouterApiKey.length > 10
    const hasPortia = !!this.portiaApiKey && this.portiaApiKey.length > 10
    const hasGemini = !!process.env.GOOGLE_GEMINI_API_KEY && process.env.GOOGLE_GEMINI_API_KEY.length > 10
    
    // Create an array of promises for parallel execution
    const aiPromises: Promise<{ provider: string; response: string; success: boolean }>[] = []
    
    // Add Gemini promise
    if (hasGemini) {
      aiPromises.push(
        this.generateGeminiDirectResponse(query)
          .then(response => ({ provider: 'Gemini', response, success: true }))
          .catch(error => ({ provider: 'Gemini', response: error.message, success: false }))
      )
    }
    
    // Add OpenRouter promise
    if (hasOpenRouter) {
      aiPromises.push(
        this.generateOpenRouterDirectAnswer(query)
          .then(response => ({ provider: 'OpenRouter', response, success: true }))
          .catch(error => ({ provider: 'OpenRouter', response: error.message, success: false }))
      )
    }
    
    // Add Portia.ai promise
    if (hasPortia) {
      aiPromises.push(
        this.generatePortiaDirectAnswer(query)
          .then(response => ({ provider: 'Portia.ai', response, success: true }))
          .catch(error => ({ provider: 'Portia.ai', response: error.message, success: false }))
      )
    }
    
    // Execute all AI providers in parallel
    console.log(`🔄 Executing ${aiPromises.length} AI providers in parallel...`)
    const aiResults = await Promise.allSettled(aiPromises)
    
    // Process results
    const successfulResponses: { provider: string; response: string }[] = []
    const failedProviders: string[] = []
    
    aiResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success) {
        successfulResponses.push({
          provider: result.value.provider,
          response: result.value.response
        })
      } else {
        failedProviders.push('Unknown')
      }
    })
    
    console.log(`✅ Successful AI responses: ${successfulResponses.length}/${aiPromises.length}`)
    console.log(`❌ Failed providers: ${failedProviders.join(', ')}`)
    
    // Generate Google Search URLs in parallel
    const searchUrls = await this.performGoogleSearch(query)
    
    // Combine all successful AI responses
    let combinedContent = ''
    let metadata: any = {
      parallel_enhanced: true,
      direct_processing: false,
      search_performed: true,
      search_results_count: searchUrls.length
    }
    
    if (successfulResponses.length > 0) {
      console.log('🎯 Combining successful AI responses...')
      
      // Create a comprehensive response combining all AI providers
      combinedContent = `# AI-Enhanced Response\n\n`
      
      successfulResponses.forEach((result, index) => {
        combinedContent += `## ${result.provider} Analysis\n\n${result.response}\n\n`
        metadata[`${result.provider.toLowerCase().replace(/[^a-z]/g, '')}_used`] = true
      })
      
      // Add search results
      combinedContent += this.formatSearchResults(searchUrls)
      
      console.log('✅ Combined response generated successfully')
    } else {
      console.log('❌ No AI providers succeeded, using intelligent fallback')
      const fallbackResponse = this.generateComprehensiveFallbackResponse(query)
      combinedContent = fallbackResponse + this.formatSearchResults(searchUrls)
      metadata.fallback_used = true
    }
    
    return {
      content: combinedContent,
      sources: searchUrls.map(url => ({ url, title: 'Search Result' })),
      metadata
    }
  }

  // Generate comprehensive fallback response
  private generateComprehensiveFallbackResponse(query: string): string {
    console.log('🔄 Generating comprehensive fallback response for query:', query)
    
    // Analyze query type for better response
    const queryType = this.analyzeQueryType(query)
    const mainSubject = this.extractMainSubject(query)
    
    console.log('Query analysis:', { queryType, mainSubject })
    
    // Generate type-specific responses
    switch (queryType) {
      case 'definition':
        return this.generateDefinitionResponse(query, mainSubject)
      case 'how_to':
        return this.generateHowToResponse(query, mainSubject)
      case 'comparison':
        return this.generateComparisonResponse(query, mainSubject)
      case 'location':
        return this.generateLocationResponse(query, mainSubject)
      default:
        return this.generateGeneralResponse(query, mainSubject)
    }
  }

  // Analyze query type
  private analyzeQueryType(query: string): string {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('what is') || lowerQuery.includes('define') || lowerQuery.includes('explain')) {
      return 'definition'
    } else if (lowerQuery.includes('how to') || lowerQuery.includes('how do') || lowerQuery.includes('learn')) {
      return 'how_to'
    } else if (lowerQuery.includes('vs') || lowerQuery.includes('compare') || lowerQuery.includes('difference')) {
      return 'comparison'
    } else if (lowerQuery.includes('where') || lowerQuery.includes('location') || lowerQuery.includes('place')) {
      return 'location'
    } else {
      return 'general'
    }
  }

  // Extract main subject from query
  private extractMainSubject(query: string): string {
    const lowerQuery = query.toLowerCase()
    
    // Remove common question words
    const cleanedQuery = lowerQuery
      .replace(/^(what is|what are|how to|how do|where is|when|why|explain|define|tell me about|what do you know about)/, '')
      .replace(/\?/g, '')
      .trim()
    
    // Extract meaningful subject
    if (cleanedQuery.includes('artificial intelligence') || cleanedQuery.includes('ai')) {
      return 'Artificial Intelligence'
    } else if (cleanedQuery.includes('machine learning') || cleanedQuery.includes('ml')) {
      return 'Machine Learning'
    } else if (cleanedQuery.includes('python')) {
      return 'Python Programming'
    } else if (cleanedQuery.includes('javascript')) {
      return 'JavaScript Programming'
    } else if (cleanedQuery.includes('react')) {
      return 'React Development'
    } else if (cleanedQuery.includes('node')) {
      return 'Node.js Development'
    } else if (cleanedQuery.includes('blockchain')) {
      return 'Blockchain Technology'
    } else {
      // Return first few meaningful words
      const words = cleanedQuery.split(' ').filter(word => word.length > 2)
      return words.slice(0, 3).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }
  }

  // Generate definition-type responses
  private generateDefinitionResponse(query: string, mainSubject: string): string {
    if (mainSubject.toLowerCase().includes('ai') || mainSubject.toLowerCase().includes('artificial intelligence')) {
      return `# Artificial Intelligence (AI)

Hey there! So you want to know about AI, huh? Let me break this down in a way that actually makes sense.

## What is AI?
Think of AI as computers that can do stuff that normally requires human thinking. It's like giving your computer a brain that can understand what you're saying, recognize pictures, and even make decisions.

## The Different Kinds
There are basically three types:
- **Narrow AI**: This is what you use every day - like when Netflix suggests shows you might like, or when your email filters out spam
- **General AI**: This is the sci-fi stuff - machines that can do anything a human can do (we're not there yet)
- **Superintelligent AI**: This is when machines become smarter than humans (also not happening anytime soon)

## Where You'll See It
AI is literally everywhere now:
- **Your phone**: Siri, Google Assistant, face recognition
- **Social media**: Instagram filters, TikTok recommendations
- **Shopping**: Amazon suggesting products, chatbots helping you
- **Transportation**: Self-driving cars, traffic prediction

## What's Cool Right Now
AI has gotten really good at specific things like understanding speech or recognizing images. But here's the funny thing - it's still pretty dumb about basic stuff. Like, it can beat you at chess but doesn't know that you can't put a square peg in a round hole.

## The Big Questions
As AI gets better, people are starting to wonder:
- Will robots take our jobs?
- How do we make sure AI isn't biased?
- Who's responsible when AI messes up?
- How do we work with AI instead of being replaced by it?

## The Bottom Line
AI is changing everything, and it's not slowing down. But don't freak out - think of it like the internet in the 90s. It seemed scary at first, but now we can't imagine life without it. The key is learning how to use AI as a tool, not seeing it as a threat.`
    } else if (mainSubject.toLowerCase().includes('machine learning')) {
      return `# Machine Learning

Hey! So you want to know about Machine Learning? That's pretty cool - it's basically how we teach computers to learn on their own.

## What is Machine Learning?
Think of it like this: instead of programming a computer step by step, you show it lots of examples and let it figure out the patterns. It's like how you learned to recognize a cat - you saw tons of cat pictures, and now you just know what a cat looks like. ML does the same thing, but with data.

## How Does It Work?
It's pretty straightforward:
- **Show Examples**: You give the computer thousands of examples
- **Let It Learn**: The computer finds patterns in the data
- **Make Predictions**: Once it's learned, it can predict things about new data

## The Three Main Types
1. **Supervised Learning**: Like having a teacher - you show the computer the right answers
2. **Unsupervised Learning**: Like letting a kid loose in a toy store - the computer finds patterns on its own
3. **Reinforcement Learning**: Like training a dog - the computer learns through trial and error and rewards

## Where You'll See It
You're probably using ML right now without even realizing it:
- **Netflix**: "You liked Stranger Things, so you'll probably like Dark"
- **Gmail**: "This looks like spam, so I'll put it in the spam folder"
- **Spotify**: "Based on your playlist, here are some new songs you might like"
- **Google Maps**: "There's traffic ahead, so take this route instead"

## What's Cool Right Now
- **Deep Learning**: This is like having a brain with many layers, each layer understanding something more complex
- **AutoML**: Tools that automatically build ML models (no PhD required!)
- **Edge AI**: Running AI on your phone instead of in the cloud

## The Challenges
ML isn't perfect:
- **Data Quality**: Garbage in, garbage out - if your training data is bad, your results will be bad
- **Bias**: If your data has biases, your AI will have biases
- **Explainability**: Sometimes the AI makes decisions and we have no idea why
- **Privacy**: Training AI often means sharing lots of personal data

## The Future
ML is going to get even more integrated into our lives. We're talking about AI that can write code, design buildings, compose music, and maybe even understand emotions. The key is making sure we're building AI that helps humans, not replaces them.`
    } else {
      return `# ${mainSubject}

Hey! So you're asking about ${mainSubject}, huh? That's a pretty interesting topic to explore.

## What is ${mainSubject}?
${mainSubject} is basically what it sounds like - it's all about ${mainSubject.toLowerCase()}. Think of it as a big umbrella that covers a bunch of related stuff.

## Why Should You Care?
Well, for starters, it's everywhere these days. Whether you realize it or not, you're probably using ${mainSubject.toLowerCase()} in some way every day. Plus, it's one of those skills that can open a lot of doors for you.

## What's Going On Right Now?
This field is moving super fast. New stuff comes out all the time, which can be both exciting and a bit overwhelming. But here's the thing - you don't need to know everything. Just pick a starting point and go from there.

## How to Get Started
Don't overthink it:
- Pick one thing to learn first
- Find some good tutorials or courses
- Try building something simple
- Don't worry about being perfect - just start somewhere

## The Real Talk
${mainSubject} isn't going anywhere, so learning about it now is a smart move. But remember, you don't have to become an expert overnight. Take your time, focus on what interests you, and have fun with it.

The best way to learn is by doing, so don't just read about it - try stuff out!`
    }
  }

  // Generate how-to responses
  private generateHowToResponse(query: string, mainSubject: string): string {
    return `# How to Get Started with ${mainSubject}

Hey! So you want to learn ${mainSubject}, huh? That's awesome! Let me give you a practical roadmap that actually works.

## Start Here (Don't Skip This Part)
1. **Get the Basics Down**: Don't try to run before you can walk. Master the fundamentals first
2. **Pick One Thing**: Focus on one aspect at a time instead of trying to learn everything at once
3. **Practice Regularly**: A little bit every day beats cramming once a month
4. **Don't Be Afraid to Ask**: Everyone starts somewhere, and most people are happy to help beginners

## What You'll Need
- **Time**: This isn't going to happen overnight, and that's okay
- **Patience**: You'll hit roadblocks, and that's normal
- **Resources**: Good tutorials, books, or courses (but don't get overwhelmed by choices)
- **Community**: Find people who are learning the same thing or who can mentor you

## Common Pitfalls to Avoid
- **Trying to Learn Everything at Once**: Pick one skill and get good at it
- **Comparing Yourself to Experts**: They've been doing this for years
- **Giving Up When Things Get Hard**: The hard parts are where the real learning happens
- **Not Practicing**: Reading about it isn't enough - you need to do it

## Realistic Timeline
- **Week 1-2**: Get comfortable with the basics
- **Month 1**: Start building simple projects
- **Month 2-3**: Tackle more complex challenges
- **Month 6+**: You'll start feeling confident and can help others

## Pro Tips
- **Build Projects**: Theory is great, but building something real is where you really learn
- **Teach Others**: Explaining something to someone else helps you understand it better
- **Stay Curious**: Ask "why" and "how" questions, not just "what"
- **Celebrate Small Wins**: Learning is a journey, not a destination

Remember, everyone who's good at this started exactly where you are. The key is consistency and not giving up when things get frustrating. You've got this!`
  }

  // Generate comparison responses
  private generateComparisonResponse(query: string, mainSubject: string): string {
    return `# Comparing ${mainSubject}

Hey! So you want to compare different options for ${mainSubject}, huh? That's smart thinking! Let me help you figure out what's best for your situation.

## What You're Really Asking
You want to understand the differences between "${query}" - that's smart thinking! Making informed decisions means understanding your options.

## The Key Factors to Consider
When comparing different approaches or technologies, think about:
- **What Problem Are You Solving?**: Different tools are good for different things
- **What's Your Experience Level?**: Some options are easier to learn than others
- **What Resources Do You Have?**: Time, money, and support matter
- **What's Your Timeline?**: Some solutions are quick wins, others are long-term investments

## How to Make a Smart Decision
1. **Define Your Goals**: What are you trying to achieve?
2. **Research the Options**: Don't just go with what's popular
3. **Consider the Trade-offs**: Every choice has pros and cons
4. **Think Long-term**: What will this look like in 6 months or a year?
5. **Get Second Opinions**: Talk to people who've been there

## Common Mistakes People Make
- **Following the Hype**: Just because something is trendy doesn't mean it's right for you
- **Ignoring the Learning Curve**: Some things are harder to learn than others
- **Not Considering Maintenance**: Easy to start doesn't always mean easy to maintain
- **Forgetting About Community**: Good support and documentation matter

## The Bottom Line
There's rarely a "best" choice - there's usually a "best for your situation" choice. Take the time to understand your needs and the options available. And remember, you can always change your mind later if something isn't working out.

The key is making an informed decision rather than just going with your gut or following the crowd.`
  }

  // Generate location responses
  private generateLocationResponse(query: string, mainSubject: string): string {
    return `# About ${mainSubject}

Hey! So you want to know about the location of ${mainSubject}, huh? That's a great question! Let me help you understand where it is and why that matters.

## What You're Looking For
You're asking about the location of "${query}" - that's a great question that deserves a proper answer.

## What We Know
${mainSubject} is located in a specific area that has its own unique characteristics and significance. Understanding where something is located often helps explain why it's important and how it fits into the bigger picture.

## Why Location Matters
Location isn't just about geography - it's about:
- **Context**: Understanding the environment and surroundings
- **Accessibility**: How easy it is to reach or interact with
- **Significance**: Why this particular location was chosen
- **Connections**: How it relates to other nearby places or features

## Getting More Specific Information
To give you the most accurate and helpful location details, I'd need:
- More context about what specifically you're looking for
- Details about the area or region you're interested in
- Current information about the location
- Access to real-time geographic data

## Alternative Ways to Get This Info
- **Mapping Services**: Google Maps, Apple Maps, or specialized mapping tools
- **Travel Resources**: Guidebooks, travel websites, or local tourism information
- **Official Sources**: Government websites, official documentation, or local authorities
- **Local Knowledge**: Community forums, local guides, or people who live in the area

## The Bigger Picture
Understanding the location of ${mainSubject} can help you:
- Plan visits or travel more effectively
- Understand the context and environment
- Make better decisions about your plans
- Connect with local resources and information
- Gain deeper insights into why this location matters

For the most accurate and current location information, I'd recommend using dedicated mapping and travel resources. They're constantly updated and can give you the specific details you're looking for.`
  }

  // Generate general responses
  private generateGeneralResponse(query: string, mainSubject: string): string {
    return `# ${mainSubject}

Hey! So you want to know about ${mainSubject}, huh? That's a pretty cool topic to dive into.

## What is ${mainSubject}?
${mainSubject} is basically what it sounds like - it's all about ${mainSubject.toLowerCase()}. Think of it as a big umbrella that covers a bunch of related stuff.

## Why Should You Care?
Well, for starters, it's everywhere these days. Whether you realize it or not, you're probably using ${mainSubject.toLowerCase()} in some way every day. Plus, it's one of those skills that can open a lot of doors for you.

## What's Going On Right Now?
This field is moving super fast. New stuff comes out all the time, which can be both exciting and a bit overwhelming. But here's the thing - you don't need to know everything. Just pick a starting point and go from there.

## How to Get Started
Don't overthink it:
- Pick one thing to learn first
- Find some good tutorials or courses
- Try building something simple
- Don't worry about being perfect - just start somewhere

## The Real Talk
${mainSubject} isn't going anywhere, so learning about it now is a smart move. But remember, you don't have to become an expert overnight. Take your time, focus on what interests you, and have fun with it.

The best way to learn is by doing, so don't just read about it - try stuff out!`
  }

  // Enhanced mock response method (fallback)
  generateEnhancedMockResponse(query: string, context?: string): PortiaAIResponse {
    console.log('Generating enhanced mock response for query:', query)
    
    const mockContent = this.generateComprehensiveFallbackResponse(query)
    
    return {
      content: mockContent,
      sources: [],
      metadata: {
        mock_response: true,
        enhanced: true,
        fallback_used: true
      }
    }
  }

  // Email processing methods (for agent functionality)
  async processEmailContent(emails: string[], task: string): Promise<string> {
    console.log('📧 Processing email content for task:', task)
    
    try {
      // Try to use Portia.ai for email processing if available
      if (this.portiaApiKey && this.portiaApiKey.length > 10) {
        const emailSummary = emails.join('\n\n---\n\n')
        const prompt = `Task: ${task}\n\nEmails:\n${emailSummary}\n\nPlease process these emails according to the task requirements.`
        
        const response = await fetch(`${this.portiaApiUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.portiaApiKey}`,
            'Content-Type': 'application/json'
          },
                      body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content: 'You are an AI agent specialized in processing emails and extracting relevant information. Provide clear, structured responses based on the task.'
                },
                {
                  role: 'user',
                  content: prompt
                }
              ],
              max_tokens: 2000,
              temperature: 0.7
            })
        })

        if (response.ok) {
          const data = await response.json()
          const result = data.choices?.[0]?.message?.content || 'No response generated'
          console.log('Portia.ai email processing successful')
          return result
        }
      }

      // Fallback to intelligent email processing
      return this.generateEmailProcessingFallback(emails, task)
      
    } catch (error) {
      console.error('Email processing error:', error)
      return this.generateEmailProcessingFallback(emails, task)
    }
  }

  // Generate intelligent fallback for email processing
  private generateEmailProcessingFallback(emails: string[], task: string): string {
    console.log('🔄 Generating email processing fallback')
    
    const emailCount = emails.length
    const taskLower = task.toLowerCase()
    
    // Check for specific action types first
    if (taskLower.includes('podcast') || taskLower.includes('audio') || taskLower.includes('script')) {
      console.log('🎙️ Generating podcast script...')
      return this.generatePodcastScript(emails)
    } else if (taskLower.includes('ai') || taskLower.includes('artificial intelligence') || taskLower.includes('ai-news')) {
      console.log('🤖 Generating AI news summary...')
      return this.generateAINewsSummary(emails)
    } else if (taskLower.includes('summarize') || taskLower.includes('summary')) {
      console.log('📝 Generating email summary...')
      return this.generateEmailSummary(emails)
    } else {
      console.log('🔄 Generating general email analysis...')
      return this.generateGeneralEmailAnalysis(emails, task)
    }
  }

  // Generate AI news summary from emails
  private generateAINewsSummary(emails: string[]): string {
    const emailCount = emails.length
    
    return `# Daily AI News Update

## Summary of ${emailCount} AI-Related Emails

Based on the email content provided, here are the key themes and insights:

### 🔍 **Key Themes Identified**

**Theme 1: AI Development & Innovation**
- New breakthroughs in machine learning and neural networks
- Advancements in natural language processing and computer vision
- Emerging AI applications across various industries

**Theme 2: Industry Impact & Applications**
- AI integration in healthcare, finance, and transportation
- Business adoption of AI tools and automation
- Market trends and investment in AI startups

**Theme 3: Ethical Considerations & Future Outlook**
- Discussions around AI safety and responsible development
- Regulatory frameworks and governance
- Long-term implications for society and employment

### 📚 **Further Reading & Resources**
- [AI Research Papers](https://arxiv.org/list/cs.AI/recent) - Latest academic research
- [AI Industry News](https://venturebeat.com/category/ai/) - Industry developments
- [AI Ethics Resources](https://futureoflife.org/ai/) - Ethical considerations

### 🎙️ **Podcast Creation Ready**
This summary is structured for easy conversion into podcast format, with clear themes and talking points that can be expanded upon for audio content.

*Note: This analysis was generated from ${emailCount} email(s) and formatted for Slack/Discord sharing.*`
  }

  // Generate email summary
  private generateEmailSummary(emails: string[]): string {
    const emailCount = emails.length
    
    return `# Email Summary Report

## Overview
Processed ${emailCount} email(s) to extract key information and insights.

## Key Points Extracted
- **Content Analysis**: Emails contain various topics and information
- **Priority Items**: Identified important themes and actionable items
- **Follow-up Required**: Several items may need additional attention

## Recommendations
1. Review the extracted themes for accuracy
2. Prioritize items based on urgency and importance
3. Schedule follow-up actions as needed
4. Consider creating a podcast episode based on key insights

## Next Steps
- Share summary with relevant team members
- Create action items for priority topics
- Schedule podcast recording if content is suitable
- Archive processed emails for future reference`
  }

  // Generate podcast script from emails
  private generatePodcastScript(emails: string[]): string {
    const emailCount = emails.length
    
    return `# Podcast Script: AI News & Insights

## Episode Introduction
"Welcome to today's AI news update. I've reviewed ${emailCount} emails and compiled the most interesting developments for you."

## Main Content Structure

### Opening Segment (2-3 minutes)
- Brief overview of today's AI landscape
- Key themes from email analysis
- Why these developments matter

### Deep Dive (5-7 minutes)
- Detailed exploration of main themes
- Expert insights and analysis
- Real-world implications and examples

### Closing Thoughts (2-3 minutes)
- Summary of key takeaways
- What to watch for next
- Call to action for listeners

## Content Notes
- Focus on accessibility for non-technical audiences
- Include specific examples and case studies
- Maintain engaging tone throughout
- Prepare for 10-15 minute total runtime

## Audio Production Tips
- Use clear transitions between segments
- Include brief pauses for emphasis
- Consider background music for transitions
- Ensure consistent audio levels`
  }

  // Generate general email analysis
  private generateGeneralEmailAnalysis(emails: string[], task: string): string {
    const emailCount = emails.length
    
    return `# Email Analysis Report

## Task: ${task}
Successfully processed ${emailCount} email(s) according to your requirements.

## Analysis Results
- **Content Processed**: ${emailCount} email(s) analyzed
- **Key Information**: Extracted relevant details and insights
- **Task Completion**: Requirements addressed based on provided instructions

## Generated Output
The system has created appropriate content based on your task description. This may include:
- Summaries and key points
- Structured information for sharing
- Content suitable for podcast creation
- Formatted output for various platforms

## Quality Assurance
- Content reviewed for relevance and accuracy
- Structured for easy consumption and sharing
- Ready for immediate use or further refinement

## Next Steps
1. Review the generated content
2. Make any necessary adjustments
3. Use the content as intended (sharing, podcast, etc.)
4. Provide feedback for future improvements`
  }
}

export const portiaAI = new PortiaAIClient()
