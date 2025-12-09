import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import StoryBoard from './components/StoryBoard';
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center mb-6">
            <Key className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">Acesso ao Portal</h1>
          <p className="text-slate-400 mb-8">
            Para interagir com o agente de Futuros do Design, é necessário selecionar uma chave de API válida.
          </p>
          
          <button
            onClick={handleSelectKey}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            Selecionar API Key
          </button>

          {keyError && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm text-left">
              <AlertTriangle size={16} className="flex-shrink-0" />
              <span>Erro ao validar chave. Por favor, tente selecionar novamente.</span>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-slate-700">
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1">
               Informações sobre faturamento <ExternalLink size={10} />
             </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Application
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-['Inter']">
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
        <div className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between">
          <h1 className="text-lg font-bold font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            FUTUROS
          </h1>
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-300">
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
            <div className="h-full overflow-y-auto p-6 md:p-12 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 font-['Space_Grotesk']">Base de Conhecimento: Cenários</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {SCENARIOS_DATA.map(sc => (
                  <div key={sc.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{sc.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${sc.turma === 'A' ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-800' : 'bg-purple-900/50 text-purple-400 border border-purple-800'}`}>
                        Turma {sc.turma}
                      </span>
                    </div>
                    <div className="mb-4">
                        <span className="text-xs text-slate-500 uppercase tracking-widest">Arquétipo</span>
                        <p className="text-indigo-400 font-medium">{sc.archetype}</p>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{sc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === AppView.SOLUTIONS && (
            <div className="h-full overflow-y-auto p-6 md:p-12 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 font-['Space_Grotesk']">Soluções Cadastradas</h2>
              {registeredSolutions.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                    <p className="text-slate-500">Nenhuma solução cadastrada ainda.</p>
                    <button onClick={() => setCurrentView(AppView.CHAT)} className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        Ir para o Chat cadastrar uma nova
                    </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {registeredSolutions.map((sol) => (
                    <div key={sol.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">{sol.nome_da_solucao}</h3>
                                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Turma {sol.turma}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">
                                Por: {sol.participantes.map(p => p.nome_completo).join(', ')}
                            </p>
                            <div className="bg-slate-950/50 p-4 rounded-lg mb-4 text-sm text-slate-300 border border-slate-800">
                                <p className="font-semibold text-slate-500 mb-1 text-xs uppercase">Resumo</p>
                                {sol.descricao_refinada.resumo}
                            </div>
                             <div className="flex flex-wrap gap-2">
                                {sol.cenarios_relacionados.map(cen => (
                                    <span key={cen} className="text-xs bg-indigo-950 text-indigo-300 px-2 py-1 rounded border border-indigo-900/50">
                                        {cen}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {sol.imagem && sol.imagem.url && (
                             <div className="w-full md:w-48 h-32 md:h-auto bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                                 <img src={sol.imagem.url} alt="Solução" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
              <UserCheck className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk'] text-center">Identificação</h1>
            <p className="text-slate-400 mb-6 text-center text-sm">
              Identifique-se para cadastrar soluções no portal. <br/>A visualização de conteúdo é livre.
            </p>
            
            <form onSubmit={handleUserRegistration} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Ex: Ana Silva"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Institucional</label>
                <input 
                  type="email" 
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="ana@cesar.school"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Turma</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormTurma('A')}
                    className={`py-3 rounded-lg border text-sm font-medium transition-all ${formTurma === 'A' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800'}`}
                  >
                    Turma A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTurma('B')}
                    className={`py-3 rounded-lg border text-sm font-medium transition-all ${formTurma === 'B' ? 'bg-purple-900/50 border-purple-500 text-purple-400' : 'bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800'}`}
                  >
                    Turma B
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
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