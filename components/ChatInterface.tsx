
import React, { useState, useRef, useEffect } from 'react';
import { Message, DraftSolution } from '../types';
import { sendMessage } from '../services/geminiService';
import { Send, Cpu, User, Loader2, Sparkles, Edit2, CheckCircle, X, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  apiKey: string;
}

const DraftReviewCard: React.FC<{
  initialData: DraftSolution;
  onConfirm: (finalData: DraftSolution) => void;
}> = ({ initialData, onConfirm }) => {
  const [data, setData] = useState<DraftSolution>(initialData);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<any>(null);

  const startEdit = (section: string, value: any) => {
    setEditingSection(section);
    setTempValue(value); // Deep copy if needed, but simple types work for now
  };

  const saveEdit = (section: string) => {
    if (section === 'nome') setData({ ...data, nome_da_solucao: tempValue });
    if (section === 'turma') setData({ ...data, turma: tempValue });
    if (section === 'participantes') {
        // Parsing the textarea back to array
        const parts = tempValue.split(',').map((p: string) => {
            const [name, email] = p.trim().split('(');
            return { 
                nome_completo: name.trim(), 
                email: email ? email.replace(')', '').trim() : '' 
            };
        });
        setData({ ...data, participantes: parts });
    }
    if (section === 'cenarios') setData({ ...data, cenarios_relacionados: tempValue.split(',').map((s: string) => s.trim()) });
    if (section === 'resumo') setData({ ...data, descricao_refinada: { ...data.descricao_refinada, resumo: tempValue } });
    
    setEditingSection(null);
  };

  return (
    <div className="bg-white border-2 border-orange-100 rounded-2xl p-6 shadow-xl my-6 max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-cesar-orange">
          <Edit2 size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-cesar-black">Revisão Final</h3>
          <p className="text-xs text-cesar-neutral">Edite os dados se necessário antes de salvar.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Nome */}
        <div className="group">
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] font-bold text-cesar-neutral uppercase tracking-widest">Nome da Solução</label>
            {editingSection !== 'nome' && (
              <button onClick={() => startEdit('nome', data.nome_da_solucao)} className="text-cesar-orange opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:underline">Editar</button>
            )}
          </div>
          {editingSection === 'nome' ? (
            <div className="flex gap-2">
              <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="flex-1 bg-gray-50 border border-orange-200 rounded p-2 text-sm" />
              <button onClick={() => saveEdit('nome')} className="p-2 bg-cesar-orange text-white rounded"><Save size={16} /></button>
            </div>
          ) : (
            <p className="text-cesar-black font-bold text-lg">{data.nome_da_solucao}</p>
          )}
        </div>

        {/* Participantes & Turma */}
        <div className="grid grid-cols-2 gap-4">
            <div className="group">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-cesar-neutral uppercase tracking-widest">Turma</label>
                    {editingSection !== 'turma' && (
                    <button onClick={() => startEdit('turma', data.turma)} className="text-cesar-orange opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:underline">Editar</button>
                    )}
                </div>
                {editingSection === 'turma' ? (
                    <div className="flex gap-2">
                        <select value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="bg-gray-50 border border-orange-200 rounded p-1 text-sm">
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                        <button onClick={() => saveEdit('turma')} className="p-1 bg-cesar-orange text-white rounded"><Save size={14} /></button>
                    </div>
                ) : (
                    <span className="bg-gray-100 text-cesar-gray px-2 py-1 rounded text-xs font-bold">{data.turma}</span>
                )}
            </div>
            
            <div className="group">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-cesar-neutral uppercase tracking-widest">Participantes</label>
                    {editingSection !== 'participantes' && (
                    <button onClick={() => startEdit('participantes', data.participantes.map(p => `${p.nome_completo} (${p.email})`).join(', '))} className="text-cesar-orange opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:underline">Editar</button>
                    )}
                </div>
                {editingSection === 'participantes' ? (
                    <div className="flex gap-2 items-start">
                        <textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="flex-1 bg-gray-50 border border-orange-200 rounded p-2 text-sm h-20" />
                        <button onClick={() => saveEdit('participantes')} className="p-2 bg-cesar-orange text-white rounded"><Save size={16} /></button>
                    </div>
                ) : (
                    <p className="text-sm text-cesar-gray leading-relaxed">
                        {data.participantes.map(p => p.nome_completo).join(', ')}
                    </p>
                )}
            </div>
        </div>

        {/* Resumo */}
        <div className="group">
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] font-bold text-cesar-neutral uppercase tracking-widest">Resumo Refinado</label>
            {editingSection !== 'resumo' && (
              <button onClick={() => startEdit('resumo', data.descricao_refinada.resumo)} className="text-cesar-orange opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:underline">Editar</button>
            )}
          </div>
          {editingSection === 'resumo' ? (
            <div className="flex gap-2 items-start">
              <textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="flex-1 bg-gray-50 border border-orange-200 rounded p-2 text-sm h-24" />
              <button onClick={() => saveEdit('resumo')} className="p-2 bg-cesar-orange text-white rounded"><Save size={16} /></button>
            </div>
          ) : (
            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 text-sm text-cesar-gray italic">
                "{data.descricao_refinada.resumo}"
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => onConfirm(data)}
        className="w-full mt-8 py-3 bg-cesar-orange hover:bg-cesar-orange-deep text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
      >
        <CheckCircle size={18} />
        Confirmar e Registrar Solução
      </button>
    </div>
  );
};

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
  
  // State for Review Workflow
  const [isReviewing, setIsReviewing] = useState(false);
  const [draftData, setDraftData] = useState<DraftSolution | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTool, isReviewing]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
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
          
          if (toolName === 'apresentarRascunhoParaRevisao') {
             setDraftData(args as DraftSolution);
             setIsReviewing(true);
          }

          // Optional: Add a system message showing the tool was called
          const sysMsg: Message = {
            id: Date.now().toString() + '-tool',
            role: 'system',
            content: `Executando: ${toolName}...`,
            timestamp: new Date(),
            functionCall: { name: toolName, args }
          };
          // We don't render system messages in the main UI usually, but tracking history
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

  const handleDraftConfirmation = (finalData: DraftSolution) => {
    setIsReviewing(false);
    setDraftData(null);
    
    // Construct a prompt that forces the AI to register with the VALIDATED data
    const confirmationPrompt = `[CONFIRMAÇÃO DO USUÁRIO]
Os dados do rascunho foram revisados e aprovados pelo usuário.
Prossiga IMEDIATAMENTE com a função "registrarSolucao" usando EXATAMENTE os dados abaixo:

Nome: ${finalData.nome_da_solucao}
Turma: ${finalData.turma}
Participantes: ${JSON.stringify(finalData.participantes)}
Cenários: ${JSON.stringify(finalData.cenarios_relacionados)}
Descrição Refinada: ${JSON.stringify(finalData.descricao_refinada)}
Imagem: ${JSON.stringify(finalData.imagem)}
Data: ${new Date().toISOString()}

Não faça mais perguntas. Registre agora.`;

    handleSend(confirmationPrompt);
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
          !msg.content.startsWith('[CONFIRMAÇÃO DO USUÁRIO]') && ( // Hide the system prompt injection from UI
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
          )
        ))}
        
        {/* Tool Execution Indicator */}
        {activeTool && (
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="bg-white border border-orange-200 text-cesar-orange px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-sm font-medium animate-pulse">
              <Cpu className="animate-spin" size={16} />
              <span>
                {activeTool === 'refinarDescricaoSolucao' && 'Refinando texto com IA...'}
                {activeTool === 'apresentarRascunhoParaRevisao' && 'Gerando cartão de revisão...'}
                {activeTool === 'registrarSolucao' && 'Registrando solução no banco de dados...'}
              </span>
            </div>
          </div>
        )}

        {/* Draft Review Card (Interjected in stream) */}
        {isReviewing && draftData && (
            <DraftReviewCard initialData={draftData} onConfirm={handleDraftConfirmation} />
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
            placeholder={isReviewing ? "Revise os dados acima e clique em confirmar..." : "Pergunte sobre os cenários ou cadastre uma solução..."}
            className="w-full bg-gray-50 text-cesar-gray placeholder-cesar-neutral border border-gray-200 rounded-xl px-4 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-cesar-orange focus:border-transparent resize-none h-[60px] max-h-[120px] transition-all shadow-inner disabled:opacity-50"
            disabled={isLoading || isReviewing}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading || isReviewing}
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
