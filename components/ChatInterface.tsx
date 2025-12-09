import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessage } from '../services/geminiService';
import { Send, Cpu, User, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  apiKey: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Olá! Sou o agente do **Portal Futuros do Design**. 🌌\n\nEstou aqui para explicar os cenários das Turmas A e B, analisar fenômenos ou ajudar você a cadastrar uma nova solução.\n\nComo posso ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTool]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiMsgId = (Date.now() + 1).toString();
    const aiMsg: Message = {
      id: aiMsgId,
      role: 'model',
      content: '',
      isStreaming: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);

    try {
      await sendMessage(
        userMsg.content,
        (text) => {
          setMessages(prev => prev.map(m => 
            m.id === aiMsgId ? { ...m, content: text } : m
          ));
        },
        (toolName, args) => {
          setActiveTool(toolName);
          // Optional: Add a system message showing the tool was called
          const sysMsg: Message = {
            id: Date.now().toString() + '-tool',
            role: 'system',
            content: `Executando: ${toolName}...`,
            timestamp: new Date(),
            functionCall: { name: toolName, args }
          };
          setMessages(prev => {
             // Insert before the current streaming message or append?
             // Let's just insert before the model message for clarity, 
             // but strictly we can't easily reorder. 
             // Let's just set active tool state to show a loader overlay.
             return prev; 
          });
        }
      );
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(m => 
        m.id === aiMsgId ? { ...m, content: m.content + '\n\n[Erro de conexão. Tente novamente.]' } : m
      ));
    } finally {
      setIsLoading(false);
      setMessages(prev => prev.map(m => 
        m.id === aiMsgId ? { ...m, isStreaming: false } : m
      ));
      setActiveTool(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              ${msg.role === 'model' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-slate-700'}
            `}>
              {msg.role === 'model' ? <Sparkles size={20} className="text-white" /> : <User size={20} className="text-slate-300" />}
            </div>

            <div className={`
              flex flex-col max-w-[85%] md:max-w-[70%]
              ${msg.role === 'user' ? 'items-end' : 'items-start'}
            `}>
              <div className={`
                px-5 py-4 rounded-2xl shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-slate-700 text-white rounded-tr-sm' 
                  : 'bg-white/10 backdrop-blur-md text-slate-100 rounded-tl-sm border border-white/5'}
              `}>
                <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Tool Execution Indicator */}
        {activeTool && (
          <div className="flex items-center gap-3 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg mx-auto max-w-md animate-pulse">
            <Cpu className="text-cyan-400 animate-spin" size={20} />
            <div className="text-sm text-cyan-200">
              <span className="font-bold">Sistema:</span> Processando {activeTool === 'refinarDescricaoSolucao' ? 'refinamento inteligente' : 'registro seguro'}...
            </div>
          </div>
        )}

        {isLoading && !activeTool && (
          <div className="flex items-center gap-2 text-slate-500 text-sm ml-14">
            <Loader2 className="animate-spin" size={16} />
            <span>Digitando...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre os cenários ou cadastre uma solução..."
            className="w-full bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-2">
          Portal Interativo v1.0 • CESAR School
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
