import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Navigation, Calendar } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface VandanaAIChatProps {
  onSearchBuses: (from: string, to: string) => void;
}

export const VandanaAIChat: React.FC<VandanaAIChatProps> = ({
  onSearchBuses,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaste! Welcome to Vandana Travels. I am your AI Travel Concierge. Ask me anything about bus timings, fares, boarding points in Kolkata, luggage limits, or coach recommendations!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What are the morning bus timings to Digha?',
    'What is the luggage policy for AC Sleeper?',
    'Where is the Esplanade boarding counter?',
    'How do I cancel my ticket for refund?',
  ];

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const botReply =
        data.reply ||
        'Thank you for reaching out to Vandana Travels. For instant bookings and schedules between Kolkata, Digha, Puri, Darjeeling and Bhubaneswar, please use our online booking panel or contact our 24x7 desk at +91 98300 45678.';

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content:
            'Vandana Travels operates daily luxury buses from Kolkata (Esplanade, Babughat, Karunamoyee) to Digha, Puri, Bhubaneswar, Darjeeling, and Mandarmani. You can book directly using our booking search above or call +91 98300 45678.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 bg-orange-600 hover:bg-orange-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-orange-600/40 hover:shadow-orange-600/60 transition-all duration-300 flex items-center gap-2.5 cursor-pointer transform hover:scale-105"
          aria-label="Open Vandana AI Travel Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-orange-600" />
          </div>
          <span className="hidden sm:inline font-bold text-sm tracking-tight">
            Ask Vandana AI
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="bg-[#0b192c] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm tracking-tight">Vandana AI Concierge</h3>
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">● 24×7 Online Travel Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Shortcuts bar */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setIsOpen(false);
                onSearchBuses('Kolkata', 'Puri');
              }}
              className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3" /> Book Kolkata → Puri
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onSearchBuses('Kolkata', 'Digha');
              }}
              className="font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3" /> Book Kolkata → Digha
            </button>
          </div>

          {/* Messages Thread */}
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    V
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-xs text-slate-500">
                <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  V
                </div>
                <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-200" />
                  <span className="text-xs text-slate-400 ml-1">Vandana AI is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 text-[11px] font-medium rounded-full whitespace-nowrap transition-colors border border-slate-200 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about buses, fares, boarding..."
              className="flex-grow px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
