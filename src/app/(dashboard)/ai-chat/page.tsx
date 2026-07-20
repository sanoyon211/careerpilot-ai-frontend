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
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white rounded-[28px] border border-[#E2E8F0] shadow-subtle overflow-hidden">
      {/* Header */}
      <div className="bg-[#F4F7FE] border-b border-[#E2E8F0] p-6 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-md shadow-purple-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
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
          <div className="flex items-center bg-white p-1 rounded-full border border-[#E2E8F0] shadow-xs">
            <button
              onClick={() => {
                setMode("coach");
                setMessages(INITIAL_COACH_MESSAGES);
              }}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-full transition-all ${
                mode === "coach" ? "bg-[#8B5CF6] text-white shadow-xs" : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              Coach
            </button>
            <button
              onClick={() => {
                setMode("mock-interview");
                setMessages(INITIAL_MOCK_MESSAGES);
              }}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-full transition-all ${
                mode === "mock-interview" ? "bg-[#8B5CF6] text-white shadow-xs" : "text-[#64748B] hover:text-[#1E293B]"
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
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chat Area with Generous Whitespace */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div
              className={`h-9 w-9 rounded-2xl shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === "ai"
                  ? "bg-[#8B5CF6] text-white shadow-xs"
                  : "bg-[#2563EB] text-white shadow-xs"
              }`}
            >
              {msg.role === "ai" ? <Sparkles className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
            </div>

            <div className="space-y-2">
              <div
                className={`px-6 py-4 rounded-[22px] text-sm leading-relaxed font-medium ${
                  msg.role === "user"
                    ? "bg-white border border-[#E2E8F0] text-[#1E293B] shadow-subtle rounded-tr-sm"
                    : "bg-[#F4EEFF] border border-[#8B5CF6]/20 text-[#1E293B] shadow-subtle rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "ai" && (
                <div className="flex items-center gap-2 px-1">
                  <button className="text-[#64748B] hover:text-[#8B5CF6] transition-colors p-1" title="Copy">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-[#64748B] hover:text-[#8B5CF6] transition-colors p-1" title="Helpful">
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 max-w-3xl">
            <div className="h-9 w-9 rounded-2xl shrink-0 flex items-center justify-center bg-[#8B5CF6] text-white">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="bg-[#F4EEFF] border border-[#8B5CF6]/20 rounded-2xl rounded-tl-sm px-6 py-4 flex items-center gap-1.5 shadow-subtle">
              <div className="w-2 h-2 bg-[#8B5CF6]/40 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#8B5CF6]/70 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area with Vibrant Purple Focus Glow */}
      <div className="bg-[#F4F7FE] border-t border-[#E2E8F0] p-6 shrink-0">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.length === 1 && mode === "coach" && (
            <div className="flex flex-wrap gap-2 mb-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="bg-white text-[#1E293B] hover:bg-[#F3E8FF] hover:text-[#8B5CF6] border border-[#E2E8F0] text-xs font-bold px-3.5 py-1.5 rounded-full transition-all shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end bg-white border border-[#E2E8F0] rounded-2xl shadow-subtle focus-within:border-[#8B5CF6] focus-within:shadow-[0_0_12px_rgba(139,92,246,0.35)] transition-all overflow-hidden p-2">
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
              className="bg-[#8B5CF6] text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 mb-0.5 mr-0.5 hover:bg-[#7C3AED] shadow-sm"
            >
              <Send className="h-4 w-4" />
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
