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
      content: 'Olá! Sou o agente do **Portal Futuros do Design**. \n\nEstou aqui para explicar os cenários das Turmas A e B, analisar fenômenos ou ajudar você a cadastrar uma nova solução.\n\nComo posso ajudar hoje?',
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
    <div className="flex flex-col h-full bg-cesar-off-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`
              flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border
              ${msg.role === 'model' 
                ? 'bg-white border-gray-200 text-cesar-orange' 
                : 'bg-cesar-gray border-transparent text-white'}
            `}>
              {msg.role === 'model' ? <Sparkles size={18} /> : <User size={18} />}
            </div>

            {/* Bubble */}
            <div className={`
              flex flex-col max-w-[85%] md:max-w-[70%]
              ${msg.role === 'user' ? 'items-end' : 'items-start'}
            `}>
              <div className={`
                px-6 py-4 shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-cesar-orange text-white rounded-2xl rounded-tr-none' 
                  : 'bg-white text-cesar-gray border border-gray-100 rounded-2xl rounded-tl-none'}
              `}>
                <div className={`prose max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-neutral'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              <span className="text-[10px] text-cesar-neutral mt-1.5 px-1 font-medium">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Tool Execution Indicator */}
        {activeTool && (
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="bg-white border border-orange-200 text-cesar-orange px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-sm font-medium animate-pulse">
              <Cpu className="animate-spin" size={16} />
              <span>Processando: {activeTool === 'refinarDescricaoSolucao' ? 'Refinando texto...' : 'Registrando solução...'}</span>
            </div>
          </div>
        )}

        {isLoading && !activeTool && (
          <div className="flex items-center gap-2 text-cesar-neutral text-sm ml-14">
            <Loader2 className="animate-spin" size={16} />
            <span>Gerando resposta...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre os cenários ou cadastre uma solução..."
            className="w-full bg-gray-50 text-cesar-gray placeholder-cesar-neutral border border-gray-200 rounded-xl px-4 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-cesar-orange focus:border-transparent resize-none h-[60px] max-h-[120px] transition-all shadow-inner"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cesar-orange text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cesar-orange-deep transition-all shadow-md hover:shadow-orange-200"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-cesar-neutral mt-3 font-medium">
          Portal Interativo v1.0 • CESAR School 2025
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;