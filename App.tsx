import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import StoryBoard from './components/StoryBoard';
import AIIllustration from './components/AIIllustration';
import { initializeGemini, getSolutions } from './services/geminiService';
import { AppView, RegisteredSolution, UserProfile } from './types';
import { SCENARIOS_DATA } from './constants';
import { Menu, AlertTriangle, Key, ExternalLink, UserCheck, ArrowRight, X } from 'lucide-react';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(process.env.API_KEY || null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Default view is now HOME
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [registeredSolutions, setRegisteredSolutions] = useState<RegisteredSolution[]>([]);
  const [keyError, setKeyError] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Registration Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTurma, setFormTurma] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Check for API Key if not already in env
    const checkKey = async () => {
      if (!apiKey && (window as any).aistudio) {
        try {
          const hasKey = await (window as any).aistudio.hasSelectedApiKey();
          if (hasKey) {
             setApiKey(process.env.API_KEY || 'VALID_KEY_PLACEHOLDER'); 
          }
        } catch (e) {
          console.error("Error checking key", e);
        }
      }
    };
    checkKey();
  }, [apiKey]);

  const handleSelectKey = async () => {
    if ((window as any).aistudio) {
      try {
        await (window as any).aistudio.openSelectKey();
        setApiKey(process.env.API_KEY || 'VALID_KEY_PLACEHOLDER');
        setKeyError(false);
      } catch (e: any) {
        if (e.message && e.message.includes("Requested entity was not found")) {
          setKeyError(true);
        }
      }
    }
  };

  const handleUserRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail) {
      setUserProfile({
        name: formName,
        email: formEmail,
        turma: formTurma
      });
      setIsLoginModalOpen(false);
    }
  };

  useEffect(() => {
    if (apiKey) {
      // initializeGemini handles both anonymous (null profile) and logged in users
      // It also preserves history inside the service
      initializeGemini(apiKey, userProfile || undefined);
    }
  }, [apiKey, userProfile]);

  // Poll for solutions changes
  useEffect(() => {
    const interval = setInterval(() => {
      setRegisteredSolutions(getSolutions());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 1. API Key Screen (Always blocking)
  if (!apiKey) {
    return (
      <div className="min-h-screen bg-cesar-off-white flex items-center justify-center p-4 font-sans text-cesar-gray">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 text-center">
          <div className="w-16 h-16 bg-cesar-orange rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
            <Key className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-cesar-black mb-2">Acesso ao Portal</h1>
          <p className="text-cesar-neutral mb-8 leading-relaxed">
            Para interagir com o agente de Futuros do Design, é necessário selecionar uma chave de API válida.
          </p>
          
          <button
            onClick={handleSelectKey}
            className="w-full py-4 px-4 bg-cesar-black hover:bg-gray-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            Selecionar API Key
          </button>

          {keyError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm text-left">
              <AlertTriangle size={16} className="flex-shrink-0" />
              <span>Erro ao validar chave. Por favor, tente selecionar novamente.</span>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-100">
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs font-bold text-cesar-neutral hover:text-cesar-orange flex items-center justify-center gap-1 uppercase tracking-wide">
               Informações sobre faturamento <ExternalLink size={10} />
             </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Application
  return (
    <div className="flex h-screen bg-cesar-off-white text-cesar-gray overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        userProfile={userProfile}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between shadow-sm z-10">
          <h1 className="text-lg font-extrabold text-cesar-orange leading-none">
            FUTUROS
          </h1>
          <button onClick={() => setIsSidebarOpen(true)} className="text-cesar-gray">
            <Menu size={24} />
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          
          {currentView === AppView.HOME && (
            <StoryBoard onNavigate={setCurrentView} />
          )}

          {currentView === AppView.CHAT && (
            <ChatInterface apiKey={apiKey} />
          )}

          {currentView === AppView.KNOWLEDGE && (
            <div className="h-full overflow-y-auto p-6 md:p-12 max-w-5xl mx-auto bg-cesar-off-white">
              <h2 className="text-3xl font-extrabold text-cesar-black mb-8 tracking-tight">Base de Conhecimento: Cenários</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {SCENARIOS_DATA.map(sc => (
                  <div key={sc.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                    <div className="p-8 pb-4 flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-cesar-black group-hover:text-cesar-orange transition-colors">{sc.title}</h3>
                        <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${sc.turma === 'A' ? 'bg-cyan-50 text-cyan-600' : 'bg-purple-50 text-purple-600'}`}>
                          Turma {sc.turma}
                        </span>
                      </div>
                      <div className="mb-4">
                          <span className="text-[10px] font-bold text-cesar-neutral uppercase tracking-widest block mb-1">Arquétipo</span>
                          <p className="text-cesar-black font-medium">{sc.archetype}</p>
                      </div>
                      <p className="text-cesar-gray leading-relaxed text-sm mb-6">{sc.description}</p>
                    </div>
                    
                    {/* Integrated AI Illustration Section */}
                    <div className="border-t border-gray-50 bg-gray-50/50 p-6">
                      <AIIllustration 
                        prompt={sc.imagePrompt || sc.description} 
                        className="w-full bg-white shadow-sm"
                        aspectRatio="video"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === AppView.SOLUTIONS && (
            <div className="h-full overflow-y-auto p-6 md:p-12 max-w-5xl mx-auto bg-cesar-off-white">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-extrabold text-cesar-black tracking-tight">Soluções Cadastradas</h2>
                 <div className="text-xs font-bold text-cesar-neutral uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-200">
                    {registeredSolutions.length} Registros
                 </div>
              </div>

              {registeredSolutions.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 border-dashed">
                    <p className="text-cesar-neutral font-medium mb-4">Nenhuma solução cadastrada ainda.</p>
                    <button onClick={() => setCurrentView(AppView.CHAT)} className="px-6 py-3 bg-cesar-orange text-white rounded-xl font-bold hover:bg-cesar-orange-deep transition-colors text-sm">
                        Cadastrar via Chat
                    </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {registeredSolutions.map((sol) => (
                    <div key={sol.id} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all duration-300">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-cesar-black">{sol.nome_da_solucao}</h3>
                                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-cesar-gray uppercase tracking-wide">Turma {sol.turma}</span>
                            </div>
                            <p className="text-cesar-neutral text-xs font-bold uppercase tracking-widest mb-6">
                                Por: {sol.participantes.map(p => p.nome_completo).join(', ')}
                            </p>
                            <div className="bg-cesar-off-white p-6 rounded-xl mb-6 text-sm text-cesar-gray border border-gray-100 leading-relaxed">
                                <p className="font-bold text-cesar-orange mb-2 text-xs uppercase tracking-wide">Resumo da Solução</p>
                                {sol.descricao_refinada.resumo}
                            </div>
                             <div className="flex flex-wrap gap-2">
                                {sol.cenarios_relacionados.map(cen => (
                                    <span key={cen} className="text-[10px] font-bold bg-white text-cesar-black px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                                        {cen}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {sol.imagem && sol.imagem.url && (
                             <div className="w-full md:w-64 h-48 md:h-auto bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-inner">
                                 <img src={sol.imagem.url} alt="Solução" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                             </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cesar-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-6 right-6 text-cesar-neutral hover:text-cesar-orange transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-14 h-14 bg-cesar-orange rounded-xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
              <UserCheck className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-cesar-black mb-2 text-center tracking-tight">Identificação</h1>
            <p className="text-cesar-gray mb-8 text-center text-sm leading-relaxed px-4">
              Identifique-se para cadastrar soluções no portal. <br/>A visualização de conteúdo é livre.
            </p>
            
            <form onSubmit={handleUserRegistration} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-cesar-neutral uppercase tracking-widest mb-1.5">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-cesar-black focus:outline-none focus:ring-2 focus:ring-cesar-orange focus:bg-white transition-all font-medium"
                  placeholder="Ex: Ana Silva"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-cesar-neutral uppercase tracking-widest mb-1.5">Email Institucional</label>
                <input 
                  type="email" 
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-cesar-black focus:outline-none focus:ring-2 focus:ring-cesar-orange focus:bg-white transition-all font-medium"
                  placeholder="ana@cesar.school"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-cesar-neutral uppercase tracking-widest mb-1.5">Turma</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormTurma('A')}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${formTurma === 'A' ? 'bg-cyan-50 border-cyan-200 text-cyan-700 shadow-sm' : 'bg-white border-gray-200 text-cesar-neutral hover:bg-gray-50'}`}
                  >
                    Turma A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTurma('B')}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${formTurma === 'B' ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm' : 'bg-white border-gray-200 text-cesar-neutral hover:bg-gray-50'}`}
                  >
                    Turma B
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-4 bg-cesar-black hover:bg-gray-800 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Identificar-se <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;