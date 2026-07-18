"use client"

import { useState } from "react"
import { Send, User, Sparkles, Copy, ThumbsUp, RefreshCw } from "lucide-react"
import { useSendMessageMutation } from "@/redux/api/chatApi"
import { toast } from "sonner"

type Message = {
  id: number
  role: "user" | "ai"
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  { 
    id: 1, 
    role: "ai", 
    content: "Hi John! I'm your CareerPilot AI Coach. I've analyzed your resume and recent applications. How can I help you today? I can help you prepare for interviews, negotiate salary, or suggest skills to learn." 
  }
]

const SUGGESTIONS = [
  "Mock interview for React Developer role",
  "How to negotiate a $120k salary?",
  "Review my latest resume",
  "What skills am I missing for Senior roles?"
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [sendMessage, { isLoading: isTyping }] = useSendMessageMutation()

  const handleSend = async (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = { id: Date.now(), role: "user", content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")

    try {
      // Extract history without ids to send to backend
      const history = newMessages.map(msg => ({ role: msg.role, content: msg.content }))
      
      const response = await sendMessage({ history }).unwrap()
      
      const aiMsg: Message = { 
        id: Date.now() + 1, 
        role: "ai", 
        content: response.data?.reply || "I'm sorry, I couldn't process that." 
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to get response from AI")
      // Remove the user message if it failed or maybe just show error
    }
  }


  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-[calc(100vh-64px)] -m-4 md:-m-8">
      
      {/* Header */}
      <div className="bg-card border-b p-4 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Career Coach AI</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Online • Powered by GPT-4
            </p>
          </div>
        </div>
        <button onClick={() => setMessages(INITIAL_MESSAGES)} className="text-muted-foreground hover:text-foreground transition-colors p-2" title="Clear Chat">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-muted/10">
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center ${
              msg.role === "ai" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted border text-muted-foreground"
            }`}>
              {msg.role === "ai" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            
            <div className="space-y-2">
              <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-card border shadow-sm rounded-tl-sm text-foreground"
              }`}>
                {msg.content}
              </div>
              
              {msg.role === "ai" && (
                <div className="flex items-center gap-2 px-1">
                  <button className="text-muted-foreground hover:text-primary transition-colors p-1" title="Copy">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-muted-foreground hover:text-primary transition-colors p-1" title="Helpful">
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-3xl">
            <div className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="bg-card border shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-card border-t p-4 shrink-0">
        <div className="max-w-3xl mx-auto space-y-3">
          
          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {SUGGESTIONS.map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end bg-background border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all overflow-hidden p-2">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(input)
                }
              }}
              placeholder="Ask anything about your career..."
              className="w-full max-h-32 bg-transparent border-0 focus:ring-0 resize-none px-3 py-2 text-sm leading-relaxed"
              rows={1}
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="bg-primary text-primary-foreground p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shrink-0 mb-0.5 mr-0.5 hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">AI can make mistakes. Consider verifying important information.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
