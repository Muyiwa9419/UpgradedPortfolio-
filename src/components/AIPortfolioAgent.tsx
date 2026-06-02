import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, MessageSquareCode, Sparkles, HelpCircle, Mail, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

const SUGGESTED_PROMPTS = [
  { text: "How does David grow my business?", icon: Sparkles },
  { text: "What coaching programs does David offer?", icon: MessageSquareCode },
  { text: "Draft a consulting inquiry email", icon: Mail }
];

export default function AIPortfolioAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "agent",
      text: "Welcome! I am David Olumuyiwa's AI Consulting & Coaching Assistant. Ask me how David improves business visibility, his websites that convert, his CRO methodologies, or his direct coaching programs and tech advisory!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKeyWarning, setShowKeyWarning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleMessageSend = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);

    try {
      // Map message lists to a clean format suitable as history for the request body
      const mappedHistory = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: mappedHistory
        })
      });

      if (!res.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await res.json();
      
      const agentMsg: ChatMessage = {
        id: `agt-${Date.now()}`,
        sender: "agent",
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: !!data.fallback
      };

      setMessages(prev => [...prev, agentMsg]);
      if (data.fallback) {
        // Show information that they can add their own key for custom real-time answers
        setShowKeyWarning(true);
      } else {
        setShowKeyWarning(false);
      }
    } catch (err) {
      console.error("AI chat communication error:", err);
      const errorMsg: ChatMessage = {
        id: `agt-err-${Date.now()}`,
        sender: "agent",
        text: "Apologies, my server communication relay experienced an outage. Please check that the API layer is fully synchronized and retry.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMessageSend(userInput);
  };

  return (
    <div className="bg-brand-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
      
      {/* Bot Chat Header */}
      <div className="bg-gradient-to-r from-brand-dark-950 to-brand-dark-900 border-b border-white/5 py-4 px-5 flex items-center justify-between select-none">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shadow-lg glow-border-cyan shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-semibold text-white tracking-wide">
              David's Recruiter Agent
            </h4>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan"></span>
              </span>
              <p className="text-[10px] font-mono text-gray-500 uppercase font-black uppercase">
                Powered by Gemini 3.5
              </p>
            </div>
          </div>
        </div>
        
        {/* Toggleable indicator if offline info is flagged */}
        <span className="text-[10px] font-mono text-gray-600 border border-white/5 bg-white/5 px-2 py-0.5 rounded uppercase">
          Agent-Proxy
        </span>
      </div>

      {/* Warning Box for Fallback Key status */}
      {showKeyWarning && (
        <div className="bg-brand-cyan/5 border-b border-brand-cyan/15 px-4 py-2.5 flex items-start space-x-2.5 text-xs text-brand-cyan selection:bg-brand-cyan/20">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <div className="leading-relaxed">
            <span className="font-bold">Info:</span> This is David's simulated bio agent because no <code className="font-mono bg-black/40 px-1 py-0.5 rounded text-[10px]">GEMINI_API_KEY</code> exists in the build's backend context. Add actual key in Settings &rarr; Secrets to test real context!
          </div>
        </div>
      )}

      {/* Messages Scrolling Hub */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 terminal-scroll bg-gradient-to-b from-brand-dark-900 to-brand-dark-950">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Profile Avatar indicator */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                m.sender === "user" 
                  ? "bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan" 
                  : "bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald"
              }`}>
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message text bubble */}
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs text-gray-300 leading-relaxed ${
                m.sender === "user" 
                  ? "bg-brand-dark-800 border border-white/10 text-white rounded-tr-none text-right" 
                  : "bg-white/5 border border-white/5 rounded-tl-none text-left"
              }`}>
                {/* Process lists / raw markdown formatting simply */}
                <div className="whitespace-pre-line space-y-1.5 selection:bg-brand-cyan/25">
                  {m.text}
                </div>
                
                {/* Timestamp metadata */}
                <p className={`text-[9px] text-gray-600 font-mono mt-2 font-semibold ${m.sender === "user" ? "text-right" : "text-left"}`}>
                  {m.timestamp}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Loader bubble */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center border bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl rounded-tl-none px-4 py-3 text-xs w-28 text-left">
                <div className="flex space-x-1 justify-start items-center h-2">
                  <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Suggested Quick Chip prompts */}
      <div className="bg-brand-dark-950 p-2.5 border-t border-white/5 flex flex-col gap-1.5 select-none font-mono text-[10px] shrink-0">
        <div className="flex items-center space-x-1 text-gray-500 px-1 font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Quick Prompts for Recruiters:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-0.5">
          {SUGGESTED_PROMPTS.map((chip, idx) => {
            const IconComp = chip.icon;
            return (
              <button
                key={idx}
                id={`btn-prompt-chip-${idx}`}
                onClick={() => handleMessageSend(chip.text)}
                className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/25 text-left transition truncate text-[10px] cursor-pointer flex items-center space-x-1.5"
              >
                <IconComp className="w-3 h-3 text-brand-cyan shrink-0" />
                <span className="truncate">{chip.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Form area */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-brand-dark-950 px-4 py-3 border-t border-white/5 flex items-center space-x-2 shrink-0"
      >
        <input
          type="text"
          id="chat-input-user-message"
          value={userInput}
          disabled={loading}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={loading ? "Generating agent intelligence..." : "Ask David's AI helper (e.g. How to scale business conversions?)..."}
          className="bg-transparent text-white outline-none flex-grow text-xs placeholder-gray-500 disabled:opacity-50 font-mono"
          autoComplete="off"
        />
        <button
          type="submit"
          id="chat-btn-submit"
          disabled={loading || !userInput.trim()}
          className="p-1.5 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan hover:text-black transition disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
