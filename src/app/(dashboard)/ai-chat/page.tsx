"use client";

import { useState } from "react";
import { Send, User, Sparkles, Copy, ThumbsUp, RefreshCw } from "lucide-react";
import { useSendMessageMutation } from "@/redux/api/chatApi";
import { toast } from "sonner";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
};

const INITIAL_COACH_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hi! I'm your CareerPilot AI Coach. How can I help you today? I can help you prepare for interviews, negotiate salary, or suggest skills to learn.",
  },
];

const INITIAL_MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Welcome to your Mock Interview session. I will be your interviewer today. Are you ready to begin? If so, please introduce yourself.",
  },
];

const SUGGESTIONS = [
  "Mock interview for React Developer role",
  "How to negotiate a $120k salary?",
  "Review my latest resume",
  "What skills am I missing for Senior roles?",
];

export default function AIChatPage() {
  const [mode, setMode] = useState<"coach" | "mock-interview">("coach");
  const [messages, setMessages] = useState<Message[]>(INITIAL_COACH_MESSAGES);
  const [input, setInput] = useState("");
  const [sendMessage, { isLoading: isTyping }] = useSendMessageMutation();

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    try {
      const history = newMessages.map((msg) => ({ role: msg.role, content: msg.content }));
      const response = await sendMessage({ history, mode }).unwrap();

      let aiText = "I'm sorry, I couldn't process that.";
      if (response && response.data) {
        if (typeof response.data === "string") {
          aiText = response.data;
        } else if (typeof response.data.reply === "string") {
          aiText = response.data.reply;
        } else {
          aiText = JSON.stringify(response.data);
        }
      }

      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: aiText,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to get response from AI. Please try again.");
      setMessages(messages);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
      {/* Header */}
      <div className="bg-[#FAFAFA] border-b border-[#E5E7EB] p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-extrabold text-lg text-[#1E293B] leading-tight">
              {mode === "coach" ? "AI Career Coach" : "Mock Interviewer"}
            </h1>
            <p className="text-xs text-[#64748B] font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
              </span>
              Online • Powered by Groq Llama 3.3 70B AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white p-1 rounded-lg border border-[#E5E7EB]">
            <button
              onClick={() => {
                setMode("coach");
                setMessages(INITIAL_COACH_MESSAGES);
              }}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                mode === "coach" ? "bg-[#8B5CF6] text-white" : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Coach
            </button>
            <button
              onClick={() => {
                setMode("mock-interview");
                setMessages(INITIAL_MOCK_MESSAGES);
              }}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                mode === "mock-interview" ? "bg-[#8B5CF6] text-white" : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Mock Interview
            </button>
          </div>
          <button
            onClick={() => setMessages(mode === "coach" ? INITIAL_COACH_MESSAGES : INITIAL_MOCK_MESSAGES)}
            className="text-[#64748B] hover:text-[#8B5CF6] transition-colors p-2"
            title="Clear Chat"
          >
            <RefreshCw className="h-5 w-5 text-[#64748B]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Chat Area with Generous Whitespace */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div
              className={`h-9 w-9 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === "ai"
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-[#0F172A] text-white"
              }`}
            >
              {msg.role === "ai" ? <Sparkles className="h-5 w-5" strokeWidth={1.5} /> : <User className="h-5 w-5" strokeWidth={1.5} />}
            </div>

            <div className="space-y-2">
              <div
                className={`px-6 py-4 rounded-xl text-sm leading-relaxed font-medium ${
                  msg.role === "user"
                    ? "bg-white border border-[#E5E7EB] text-[#1E293B]"
                    : "bg-[#F3E8FF] border border-[#8B5CF6]/20 text-[#1E293B]"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "ai" && (
                <div className="flex items-center gap-2 px-1">
                  <button className="text-[#64748B] hover:text-[#8B5CF6] transition-colors p-1" title="Copy">
                    <Copy className="h-4 w-4 text-[#0F172A]" strokeWidth={1.5} />
                  </button>
                  <button className="text-[#64748B] hover:text-[#8B5CF6] transition-colors p-1" title="Helpful">
                    <ThumbsUp className="h-4 w-4 text-[#0F172A]" strokeWidth={1.5} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 max-w-3xl">
            <div className="h-9 w-9 rounded-2xl shrink-0 flex items-center justify-center bg-[#8B5CF6] text-white">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="bg-[#F3E8FF] border border-[#8B5CF6]/20 rounded-2xl rounded-tl-sm px-6 py-4 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#8B5CF6]/40 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#8B5CF6]/70 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area with Vibrant Purple Focus Glow */}
      <div className="bg-[#FAFAFA] border-t border-[#E5E7EB] p-6 shrink-0">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.length === 1 && mode === "coach" && (
            <div className="flex flex-wrap gap-2 mb-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="bg-white text-[#1E293B] hover:bg-[#F3E8FF] hover:text-[#8B5CF6] border border-[#E5E7EB] text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end bg-white border border-[#E5E7EB] rounded-xl focus-within:border-[#8B5CF6] transition-all overflow-hidden p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Ask anything about your career..."
              className="w-full max-h-32 bg-transparent border-0 focus:ring-0 resize-none px-4 py-2.5 text-sm font-medium text-[#1E293B] placeholder:text-[#64748B] leading-relaxed"
              rows={1}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="bg-[#8B5CF6] text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 mb-0.5 mr-0.5 hover:bg-[#7C3AED]"
            >
              <Send className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-[#64748B] font-medium">AI Career Coach can make mistakes. Consider verifying important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
