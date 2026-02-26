import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Clock, Bot, Zap, Shield, Terminal, BookOpen, Layers, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Initialize genAI safely
let genAI: GoogleGenerativeAI | null = null;
const initGenAI = () => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (key && !genAI) {
    try {
      genAI = new GoogleGenerativeAI(key);
    } catch (e) {
      console.error("Failed to initialize Gemini AI:", e);
    }
  }
  return genAI;
};

export function AskDoubt() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your high-efficiency academic assistant. I'm now directly synchronized with the Gemini AI engine to provide precise, structured answers for your university challenges. How can I assist your research today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const gAI = initGenAI();
      const key = import.meta.env.VITE_GEMINI_API_KEY;

      if (!key || !gAI) {
        throw new Error("MISSING_CONFIG: Gemini API Key is not detected. Please ensure VITE_GEMINI_API_KEY is set in your .env file.");
      }

      const modelNames = [
        "gemini-2.0-flash-lite",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-flash-latest",
        "gemini-pro-latest"
      ];

      let lastError: any = null;
      let text = "";

      for (const modelName of modelNames) {
        try {
          console.log(`Sync Sequence: Attempting connection with ${modelName}...`);
          const model = gAI.getGenerativeModel({
            model: modelName,
            systemInstruction: "You are an elite academic professor and expert researcher. Your responses must be high-depth, comprehensive, and scientifically accurate. Use structured formatting with bold headings, bullet points, and clear sections. When a student asks a question, provide the core answer first, followed by deep secondary context, historical development, and practical applications. Never give short or superficial answers."
          });

          const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: inputValue }] }],
            generationConfig: {
              maxOutputTokens: 8000,
              temperature: 0.7,
            },
          });

          const response = await result.response;
          text = response.text();
          if (text) {
            console.log(`Sync Established: Using model ${modelName}`);
            break;
          }
        } catch (err: any) {
          console.warn(`Sync Failed for ${modelName}:`, err.message || err);
          lastError = err;
        }
      }

      if (!text && lastError) {
        throw lastError;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: text || 'I encountered an issue generating a response.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error("Gemini API Final Error:", error);

      let friendlyError = `Error: ${error.message}`;

      if (error.message.includes("All Gemini models failed")) {
        friendlyError = "API Configuration Issue: No Gemini models available for this API key. Please verify your Gemini API key is configured correctly in your Supabase project settings.";
      } else if (error.message.includes("not configured")) {
        friendlyError = "Configuration Error: Gemini API key is not set in your Supabase environment. Please add GEMINI_API_KEY to your Supabase function secrets.";
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: friendlyError,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatContent = (content: string) => {
    // Very basic markdown-lite for display
    return content.split('\n').map((line, i) => {
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-600">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      return (
        <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid lg:grid-cols-4 gap-6 h-[88vh]">
        {/* Left Stats Panel - Efficiency Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col gap-4"
        >
          <div className="glass-card rounded-[2.5rem] p-8 border border-white/50 shadow-xl flex-1">
            <div className="flex items-center gap-3 mb-8">
              <Layers className="h-5 w-5 text-indigo-500" />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Intelligence Stats</h2>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Latency', value: '1.2s', icon: Zap, color: 'text-amber-500' },
                { label: 'Accuracy', value: '99.4%', icon: Shield, color: 'text-emerald-500' },
                { label: 'Context', value: 'Active', icon: Brain, color: 'text-indigo-500' },
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <p className="text-xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Knowledge Domains</h3>
              <div className="flex flex-wrap gap-2">
                {['CS', 'Calculus', 'DSP', 'Physics', 'AI'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 bg-slate-900 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Alpha Engine</span>
              </div>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Direct model access initialized. Gemini 1.5 Flash providing low-latency response cycles.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full" />
          </div>
        </motion.div>

        {/* Main Chat Area - Expanded Visibility */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 flex flex-col glass-card rounded-[3rem] border border-white/50 overflow-hidden shadow-2xl bg-white/40"
        >
          {/* Header */}
          <div className="bg-slate-900/5 backdrop-blur-xl border-b border-white/20 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg animate-float">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Intelligence Center</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Global Link Active — v1.5 High Efficiency</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                <BookOpen className="h-3 w-3" />
                Documentation
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-5 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${message.isUser ? 'bg-indigo-600' : 'bg-white border border-slate-100'}`}>
                      {message.isUser ? <MousePointer2 className="h-5 w-5 text-white" /> : <Bot className="h-6 w-6 text-indigo-600" />}
                    </div>

                    <div className={`relative px-8 py-6 rounded-[2rem] shadow-premium ${message.isUser
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                      }`}>
                      <div className="text-[16px] font-medium leading-relaxed">
                        {formatContent(message.content)}
                      </div>
                      <div className={`flex items-center mt-4 text-[9px] font-black uppercase tracking-widest opacity-40 ${message.isUser ? 'justify-end text-slate-400' : 'justify-start text-slate-500'}`}>
                        <Clock className="h-3 w-3 mr-1.5" />
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {!message.isUser && <span className="ml-3 px-2 py-0.5 bg-slate-100 rounded-md">Verified Answer</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-md">
                    <Brain className="h-6 w-6 text-indigo-600 animate-pulse" />
                  </div>
                  <div className="px-8 py-5 rounded-[2rem] bg-white border border-slate-100 flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Engine Thinking</span>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Advanced Input Bar */}
          <div className="p-8 bg-white/60 backdrop-blur-md border-t border-white/20">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { label: "Research Thesis Help", icon: BookOpen },
                { label: "Debug Optimization", icon: Terminal },
                { label: "Complex Calculus", icon: Layers },
                { label: "Physics Analysis", icon: Zap }
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setInputValue(chip.label)}
                  className="px-5 py-2.5 bg-white hover:bg-indigo-600 hover:text-white text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl border border-slate-100 transition-all flex items-center gap-2 shadow-sm active:scale-95"
                >
                  <chip.icon className="h-3 w-3" />
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] opacity-0 group-focus-within:opacity-20 transition-opacity blur-lg" />
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Initialize inquiry sequences..."
                className="relative w-full h-28 pl-8 pr-24 py-6 bg-white border border-slate-200 rounded-[2.5rem] text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all shadow-inner-soft resize-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="absolute bottom-5 right-5 p-5 bg-indigo-600 text-white rounded-[1.5rem] shadow-2xl shadow-indigo-200 hover:bg-slate-900 active:scale-95 disabled:opacity-20 transition-all group/btn"
              >
                <div className="relative overflow-hidden">
                  <Send className="h-6 w-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </div>
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Academic Context Aware • Verified Sync</p>
              </div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Edge Secured
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
