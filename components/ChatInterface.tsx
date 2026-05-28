import React, { useState, useRef, useEffect } from 'react';
import { Message, DraftSolution } from '../types';
import { sendMessage } from '../services/geminiService';
import { Send, Cpu, User, Loader2, Sparkles, Edit2, CheckCircle, Save, AlertCircle, HelpCircle } from 'lucide-react';
import IconImage from './IconImage';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  apiKey: string;
}

interface ChatMessage extends Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  isStreaming?: boolean;
  error?: boolean;
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
    setTempValue(value); 
  };

  const saveEdit = (section: string) => {
    if (section === 'nome') setData({ ...data, nome_da_solucao: tempValue });
    if (section === 'turma') setData({ ...data, turma: tempValue });
    if (section === 'participantes') {
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
    <div className="card fade-in" style={{ border: '1px solid rgba(255, 96, 2, 0.3)', margin: '1.5rem auto', maxWidth: '42rem', boxShadow: '0 0 40px rgba(255,96,2,0.1), 0 20px 60px rgba(0,0,0,0.6)' }}>
      <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255,96,2,0.12)' }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,96,2,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-orange-cesar)', border: '1px solid rgba(255,96,2,0.3)' }}>
          <IconImage name="edit-2" alt="editar" size={20} fallback={<Edit2 size={20} />} />
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--c-text-primary)' }}>Revisão Final</h3>
          <p className="text-xs" style={{ color: 'rgba(237,232,223,0.45)' }}>✏️ Edite os dados se necessário antes de salvar. Todos os campos são editáveis.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Nome */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="uppercase tracking-widest" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(237,232,223,0.4)' }}>Nome da Solução</label>
            {editingSection !== 'nome' && (
              <button onClick={() => startEdit('nome', data.nome_da_solucao)} className="text-orange text-xs font-bold" style={{ textDecoration: 'underline' }}>Editar</button>
            )}
          </div>
          {editingSection === 'nome' ? (
            <div className="flex gap-2">
              <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="input-field" />
              <button onClick={() => saveEdit('nome')} className="btn btn-primary" style={{ padding: '0.5rem' }}><IconImage name="save" alt="salvar" size={16} fallback={<Save size={16} />} /></button>
            </div>
          ) : (
            <p className="font-bold text-lg" style={{ color: 'var(--c-text-primary)' }}>{data.nome_da_solucao}</p>
          )}
        </div>

        {/* Participantes & Turma */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="uppercase tracking-widest" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(237,232,223,0.4)' }}>Turma</label>
                    {editingSection !== 'turma' && (
                    <button onClick={() => startEdit('turma', data.turma)} className="text-orange text-xs font-bold" style={{ textDecoration: 'underline' }}>Editar</button>
                    )}
                </div>
                {editingSection === 'turma' ? (
                    <div className="flex gap-2">
                        <select value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="input-field" style={{ padding: '0.5rem' }}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="PROFESSOR">Professor</option>
                        </select>
                        <button onClick={() => saveEdit('turma')} className="btn btn-primary" style={{ padding: '0.25rem' }}><IconImage name="save" alt="salvar" size={14} fallback={<Save size={14} />} /></button>
                    </div>
                ) : (
                    <span className="badge badge-neutral" style={{ fontSize: '0.8rem' }}>{data.turma}</span>
                )}
            </div>
            
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="uppercase tracking-widest" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(237,232,223,0.4)' }}>Participantes</label>
                    {editingSection !== 'participantes' && (
                    <button onClick={() => startEdit('participantes', data.participantes.map(p => `${p.nome_completo} (${p.email})`).join(', '))} className="text-orange text-xs font-bold" style={{ textDecoration: 'underline' }}>Editar</button>
                    )}
                </div>
                {editingSection === 'participantes' ? (
                    <div className="flex gap-2 items-start">
                        <textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="input-field" style={{ height: '80px' }} />
                        <button onClick={() => saveEdit('participantes')} className="btn btn-primary" style={{ padding: '0.5rem' }}><IconImage name="save" alt="salvar" size={16} fallback={<Save size={16} />} /></button>
                    </div>
                ) : (
                    <p className="text-sm" style={{ lineHeight: '1.6', color: 'rgba(237,232,223,0.6)' }}>
                        {data.participantes.map(p => p.nome_completo).join(', ')}
                    </p>
                )}
            </div>
        </div>

        {/* Resumo */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="uppercase tracking-widest" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(237,232,223,0.4)' }}>Resumo Refinado</label>
            {editingSection !== 'resumo' && (
              <button onClick={() => startEdit('resumo', data.descricao_refinada.resumo)} className="text-orange text-xs font-bold" style={{ textDecoration: 'underline' }}>Editar</button>
            )}
          </div>
          {editingSection === 'resumo' ? (
            <div className="flex gap-2 items-start">
              <textarea value={tempValue} onChange={(e) => setTempValue(e.target.value)} className="input-field" style={{ height: '100px' }} />
              <button onClick={() => saveEdit('resumo')} className="btn btn-primary" style={{ padding: '0.5rem' }}><IconImage name="save" alt="salvar" size={16} fallback={<Save size={16} />} /></button>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,96,2,0.08)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,96,2,0.2)', fontStyle: 'italic', fontSize: '0.875rem', color: 'rgba(237,232,223,0.72)' }}>
                "{data.descricao_refinada.resumo}"
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={() => onConfirm(data)}
        className="btn btn-primary w-full"
        style={{ marginTop: '2rem' }}
      >
        <IconImage name="check-circle" alt="confirmar" size={18} fallback={<CheckCircle size={18} />} />
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
      content: `Bem-vindo ao **Portal Futuros do Design**! 🚀

Sou seu assistente para explorar e compreender os **Futuros do Design a partir da Pós-Normalidade**.

Posso ajudá-lo a:
- 🔍 **Explorar fenômenos** mapeados pela análise STEEPLED (Social, Tecnológico, Econômico, Ambiental, Político, Legal, Ético, Demográfico)
- 📚 **Navegar cenários** desenvolvidos pelas Turmas A e B
- 💡 **Compreender conexões** entre sinais fracos, arquétipos e possíveis futuros
- 🎯 **Analisar implicações** de tendências emergentes para o design

**O que você gostaria de explorar?**`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
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
        }
      );
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setMessages(prev => prev.map(m => 
        m.id === aiMsgId ? { ...m, content: `⚠️ **Erro ao processar solicitação**\n\nDesculpe, ocorreu um problema ao tentar processar sua mensagem. Por favor, tente novamente.\n\n_Detalhes: ${errorMessage}_`, error: true } : m
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
    <div className="flex flex-col h-full bg-page">
      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map((msg) => (
          !msg.content.startsWith('[CONFIRMAÇÃO DO USUÁRIO]') && (
          <div key={msg.id} className={`msg-row ${msg.role}`} style={{ opacity: msg.error ? 0.9 : 1 }}>
            {/* Avatar */}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: msg.error ? 'rgba(220,38,38,0.15)' : (msg.role === 'model' ? 'rgba(255,96,2,0.1)' : 'rgba(255,255,255,0.08)'),
              color: msg.error ? '#f87171' : (msg.role === 'model' ? 'var(--c-orange-cesar)' : 'white'),
              border: msg.role === 'model' ? '1px solid rgba(255,96,2,0.2)' : 'none'
            }}>
              {msg.error ? (
                <IconImage name="alert-circle" alt="erro" size={18} fallback={<AlertCircle size={18} />} />
              ) : (
                msg.role === 'model' ? <IconImage name="sparkles" alt="modelo" size={18} fallback={<Sparkles size={18} />} /> : <IconImage name="user" alt="usuário" size={18} fallback={<User size={18} />} />
              )}
            </div>

            {/* Bubble */}
            <div className={`msg-bubble ${msg.role}`} style={{
              backgroundColor: msg.error ? 'rgba(220,38,38,0.08)' : undefined,
              borderColor: msg.error ? 'rgba(220,38,38,0.3)' : undefined,
              borderWidth: msg.error ? '1px' : undefined
            }}>
                <div className="markdown-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
            </div>
          </div>
          )
        ))}
        
        {/* Tool Execution Indicator */}
        {activeTool && (
          <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-sm font-bold" style={{ animation: 'fadeIn 0.3s ease-in', background: 'rgba(11,11,17,0.88)', border: '1px solid rgba(255,96,2,0.25)', color: 'var(--c-orange-cesar)', padding: '0.5rem 1.25rem', borderRadius: '9999px', backdropFilter: 'blur(12px)' }}>
              <IconImage name="cpu" alt="processando" size={16} fallback={<Cpu className="animate-spin" size={16} />} />
              <span>
                {activeTool === 'refinarDescricaoSolucao' && '✨ Refinando texto com IA...'}
                {activeTool === 'apresentarRascunhoParaRevisao' && '📋 Gerando cartão de revisão...'}
                {activeTool === 'registrarSolucao' && '💾 Registrando solução no banco de dados...'}
              </span>
            </div>
          </div>
        )}

        {/* Draft Review Card */}
        {isReviewing && draftData && (
            <DraftReviewCard initialData={draftData} onConfirm={handleDraftConfirmation} />
        )}

        {isLoading && !activeTool && (
            <div className="flex items-center gap-2 text-neutral text-sm" style={{ marginLeft: '4rem', animation: 'fadeIn 0.3s ease-in' }}>
            <IconImage name="loader2" alt="carregando" size={16} fallback={<Loader2 className="animate-spin" size={16} />} />
            <span>Gerando resposta...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1.5rem', background: 'var(--c-dark-elevated)', borderTop: '1px solid rgba(255,96,2,0.1)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isReviewing ? "Revise os dados acima e clique em confirmar..." : "Pergunte sobre os cenários ou cadastre uma solução..."}
              className="input-field"
              style={{ 
                height: '60px', 
                resize: 'none', 
                fontSize: '1rem',
                transition: 'border-color 0.2s ease',
                borderColor: input.trim() ? 'var(--c-orange)' : 'var(--c-border)'
              }}
              disabled={isLoading || isReviewing}
              title="Pressione Enter para enviar, Shift+Enter para nova linha"
            />
            {!input.trim() && !isReviewing && (
              <p className="text-neutral" style={{ fontSize: '10px', fontWeight: 500, paddingLeft: '0.5rem' }}>
                💡 Dica: Pergunte sobre cenários, contribua com ideias ou solicite cadastro de uma solução
              </p>
            )}
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading || isReviewing}
            className="btn btn-primary"
            style={{ 
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--c-orange)', 
              color: 'white', 
              borderRadius: '8px', 
              opacity: (!input.trim() || isLoading) ? 0.5 : 1,
              transition: 'all 0.2s ease',
              cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              minWidth: '45px',
              minHeight: '45px'
            }}
            title={!input.trim() ? "Digite uma mensagem para enviar" : "Enviar mensagem (Enter)"}
          >
            {isLoading ? (
              <IconImage name="loader2" alt="carregando" size={20} fallback={<Loader2 size={20} className="animate-spin" />} />
            ) : (
              <IconImage name="send" alt="enviar" size={20} fallback={<Send size={20} />} />
            )}
          </button>
        </div>
        <p className="text-center text-neutral mt-3 font-medium" style={{ fontSize: '10px' }}>
          Portal Interativo v1.0 • CESAR School 2025
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;