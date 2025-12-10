import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import SolutionForm from './components/SolutionForm';
import StoryBoard from './components/StoryBoard';
import ManifestoMetodo from './components/ManifestoMetodo';
import AIIllustration from './components/AIIllustration';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import LoginModal from './components/LoginModal';
import { initializeGemini, getSolutions } from './services/geminiService';
import { AppView, RegisteredSolution, UserProfile as UserProfileType } from './types';
import { SCENARIOS_DATA, KORI_REPORTS_DATA } from './constants';
import { Menu, AlertTriangle, Key, ExternalLink, UserCheck, ArrowRight, X, FileText, Download, Cpu, Check, Filter, Sparkles, Search } from 'lucide-react';
import IconImage from './components/IconImage';

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = '421543325846-d8mdb1qp99qaa9dsl1lbn9hmhcaegr5v.apps.googleusercontent.com';

const getEnvApiKey = () => {
  // Since we now use server-side Gemini API (via Netlify Functions),
  // we return a dummy/placeholder value to bypass the API key screen.
  // The actual API key is stored server-side in GEMINI_API_KEY env var.
  return "SERVER_SIDE_GEMINI_API";
};

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(getEnvApiKey());
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [registeredSolutions, setRegisteredSolutions] = useState<RegisteredSolution[]>([]);
  const [keyError, setKeyError] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [extractionStatus, setExtractionStatus] = useState<Record<string, 'idle' | 'extracting' | 'done'>>({});
  const [scenariosFilter, setScenariosFilter] = useState<'ALL' | 'A' | 'B'>('ALL');
  const [extractionMessage, setExtractionMessage] = useState<string | null>(null);
  const [solutionsSearchQuery, setSolutionsSearchQuery] = useState('');

  useEffect(() => {
    // API key is now server-side only (GEMINI_API_KEY in Netlify env).
    // Set a placeholder value to initialize the app without the key selection screen.
    const envKey = getEnvApiKey();
    if (envKey) {
      setApiKey(envKey);
    }
  }, []);

  const handleSelectKey = async () => {
    // Placeholder for backward compatibility.
    // Since API is server-side, this won't actually select a key,
    // but keeps the UI consistent in case of future changes.
    setKeyError(false);
  };

  const handleUserRegistration = (name: string, email: string, turma: 'A' | 'B' | 'PROFESSOR') => {
    const isSuperUser = turma === 'PROFESSOR' && email === 'mcb2@cesar.school';
    
    setUserProfile({
      name,
      email,
      turma,
      isSuperUser
    });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setCurrentView(AppView.HOME);
  };

  const simulateDownload = (report: typeof KORI_REPORTS_DATA[0]) => {
    const text = `RELATÓRIO KORI - TURMA ${report.turma}\n\nEste é um arquivo simulado contendo a extração completa dos dados de pesquisa da Turma ${report.turma}.\n\nData de Geração: ${report.date}\nTamanho Original: ${report.size}\n\n(O download do PDF real requer backend configurado)`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.filename.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExtraction = (id: string, turma: 'A' | 'B') => {
    if (extractionStatus[id] === 'done') {
        setScenariosFilter(turma);
        setExtractionMessage(`Visualizando cenários extraídos do Relatório da Turma ${turma}.`);
        document.getElementById('scenarios-grid')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    setExtractionMessage(null);
    setExtractionStatus(prev => ({ ...prev, [id]: 'extracting' }));
    
    setTimeout(() => {
        setExtractionStatus(prev => ({ ...prev, [id]: 'done' }));
        setScenariosFilter(turma);
        setExtractionMessage(`Análise de IA concluída: 4 Cenários identificados e extraídos com sucesso do documento da Turma ${turma}.`);
        document.getElementById('scenarios-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  useEffect(() => {
    if (apiKey) {
      initializeGemini(apiKey, userProfile || undefined);
    }
  }, [apiKey, userProfile]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const solutions = await getSolutions();
            setRegisteredSolutions(solutions);
        } catch (e) {
            console.error("Error polling solutions", e);
        }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Poll every 5s instead of 2s for DB sanity
    return () => clearInterval(interval);
  }, []);

  const scenariosFilteredByTurma = scenariosFilter === 'ALL' 
    ? SCENARIOS_DATA 
    : SCENARIOS_DATA.filter(s => s.turma === scenariosFilter);

  const filteredSolutions = registeredSolutions.filter(sol => {
    const query = solutionsSearchQuery.toLowerCase().trim();
    if (!query) return true;

    const nameMatch = sol.nome_da_solucao.toLowerCase().includes(query);
    
    const participantMatch = sol.participantes.some(p => 
      p.nome_completo.toLowerCase().includes(query)
    );
      
    const scenarioMatch = sol.cenarios_relacionados.some(cen => 
      cen.toLowerCase().includes(query)
    );

    return nameMatch || participantMatch || scenarioMatch;
  });

  // 1. API Key Screen
  if (!apiKey) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--c-off-white)' }}>
        <div className="card" style={{ maxWidth: '400px', textAlign: 'center', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--c-orange)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <IconImage name="key" alt="chave de api" size={32} fallback={<Key className="text-white" size={32} />} />
          </div>
          <h1 className="text-2xl font-extrabold text-black mb-2">Acesso ao Portal</h1>
          <p className="text-neutral mb-8">
            Para interagir com o agente de Futuros do Design, é necessário selecionar uma chave de API válida.
          </p>
          
          <button
            onClick={handleSelectKey}
            className="btn btn-primary w-full"
            style={{ backgroundColor: 'var(--c-black)' }}
          >
            Selecionar API Key
          </button>

          {keyError && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', textAlign: 'left' }}>
              <IconImage name="alert-triangle" alt="erro" size={16} fallback={<AlertTriangle size={16} />} />
              <span>Erro ao validar chave. Por favor, tente selecionar novamente.</span>
            </div>
          )}
          
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--c-border)' }}>
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs font-bold text-neutral uppercase tracking-wide flex justify-center items-center gap-1">
               Informações sobre faturamento <IconImage name="external-link" alt="abrir link" size={10} fallback={<ExternalLink size={10} />} />
             </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        userProfile={userProfile}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />

      <div className="main-content">
        {/* Mobile Header */}
        <div className="mobile-header">
          <h1 className="text-lg font-extrabold text-orange leading-none">
            FUTUROS
          </h1>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray">
            <IconImage name="menu" alt="abrir menu" size={24} fallback={<Menu size={24} />} />
          </button>
        </div>

        <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          
          {currentView === AppView.DASHBOARD && (
            <Dashboard 
              userProfile={userProfile}
              solutions={registeredSolutions}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === AppView.HOME && (
            <ManifestoMetodo onNavigate={setCurrentView} />
          )}

          {currentView === AppView.CHAT && (
            <ChatInterface apiKey={apiKey} />
          )}

          {currentView === AppView.SOLUTION_REGISTRATION && userProfile && (
            <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
              <SolutionForm 
                userProfile={userProfile} 
                onSuccess={async () => {
                  const solutions = await getSolutions();
                  setRegisteredSolutions(solutions);
                  setCurrentView(AppView.SOLUTIONS);
                }}
              />
            </div>
          )}

          {currentView === AppView.SOLUTION_REGISTRATION && !userProfile && (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '400px',
              padding: '2rem'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fff7ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <UserCheck size={40} style={{ color: 'var(--c-orange)' }} />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Login Necessário</h2>
              <p className="text-neutral mb-6">Faça login para cadastrar uma solução</p>
              <button onClick={() => setIsLoginModalOpen(true)} className="btn btn-primary">
                Fazer Login
              </button>
            </div>
          )}

          {currentView === AppView.KNOWLEDGE && (
            <div style={{ height: '100%', overflowY: 'auto', padding: '2rem' }}>
              <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              
              {/* Context Section */}
              <div className="card" style={{ marginBottom: '3rem', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="text-3xl font-extrabold text-black mb-6">
                  Prospectar na Pós-Normalidade
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  <div>
                    <h3 className="font-bold text-orange mb-2">Ecossistemas Instáveis</h3>
                    <p>Sistemas sociotécnicos mudam rapidamente. Projetar requer compreender como essas dinâmicas evoluem e impactam pessoas e territórios.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange mb-2">Imaginar Alternativas</h3>
                    <p>Cenários ajudam a escapar da dependência do presente, fortalecendo a criatividade, a criticidade e a responsabilidade ética.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange mb-2">Decisão no Presente</h3>
                    <p>Reconhecer sinais fracos e antecipar riscos permite criar soluções mais robustas, adaptáveis e sensíveis às mudanças.</p>
                  </div>
                </div>
                
                {/* Kori Card */}
                <div style={{ marginTop: '2rem', backgroundColor: '#fff7ed', border: '1px solid #ffedd5', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                   <div style={{ flex: 1 }}>
                      <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--c-orange-deep)' }}>Metodologia Kori</h4>
                      <p className="text-sm text-gray">
                        Utilizamos a plataforma Kori para varredura de horizonte (3, 7, 15 anos), organizando fenômenos em <strong>Caos, Complexidade e Contradições</strong>, e aprofundando com <strong>CLA</strong>.
                      </p>
                   </div>
                   <div className="flex gap-3">
                      {['Varredura', 'CLA', 'Cenários'].map(t => (
                          <span key={t} className="badge" style={{ backgroundColor: 'white', color: 'var(--c-orange)', boxShadow: 'var(--shadow-sm)' }}>{t}</span>
                      ))}
                   </div>
                </div>
              </div>

              {/* Reports Download Section */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <IconImage name="file-text" alt="relatórios" size={20} fallback={<FileText className="text-neutral" size={20}/>} /> Relatórios Originais
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {KORI_REPORTS_DATA.map(report => {
                    const status = extractionStatus[report.id] || 'idle';
                    const isDone = status === 'done';
                    return (
                        <div key={report.id} className="card" style={isDone ? { borderColor: '#fed7aa', boxShadow: '0 0 0 1px #ffedd5' } : {}}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '1.125rem', backgroundColor: report.turma === 'A' ? '#06b6d4' : '#a855f7' }}>
                                    {report.turma}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-black">Relatório Turma {report.turma}</p>
                                    <p className="text-xs text-neutral font-medium mt-0.5">PDF • {report.size} • {report.date}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => simulateDownload(report)}
                                className="btn btn-secondary flex-1 text-xs"
                            >
                                <IconImage name="download" alt="baixar" size={14} fallback={<Download size={14} />} />
                                Baixar
                            </button>
                            <button 
                                onClick={() => handleExtraction(report.id, report.turma)}
                                disabled={status === 'extracting'}
                                className="btn flex-1 text-xs"
                                style={isDone ? { backgroundColor: '#fff7ed', color: 'var(--c-orange)', border: '1px solid #ffedd5' } : { backgroundColor: 'white', color: 'var(--c-orange)', border: '1px solid #fed7aa' }}
                            >
                                {status === 'extracting' ? (
                                    <>
                                        <IconImage name="cpu" alt="processando" size={14} fallback={<Cpu size={14} className="animate-spin" />} />
                                        Processando...
                                    </>
                                ) : isDone ? (
                                    <>
                                        <IconImage name="check" alt="concluído" size={14} fallback={<Check size={14} />} />
                                        Extraído
                                    </>
                                ) : (
                                    <>
                                        <IconImage name="cpu" alt="extrair" size={14} fallback={<Cpu size={14} />} />
                                        Extrair Cenários
                                    </>
                                )}
                            </button>
                        </div>
                        </div>
                    );
                  })}
                </div>
              </div>

              {/* Scenarios Grid */}
              <div id="scenarios-grid" style={{ scrollMarginTop: '2rem' }}>
                <div className="flex flex-col gap-4 mb-6 pt-8 border-t" style={{ borderColor: 'var(--c-border)' }}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-extrabold text-black">
                            Cenários Desenvolvidos
                        </h2>
                        {scenariosFilter !== 'ALL' && (
                            <button 
                                onClick={() => {
                                    setScenariosFilter('ALL');
                                    setExtractionMessage(null);
                                }}
                                className="badge flex items-center gap-1"
                                style={{ backgroundColor: '#fff7ed', color: 'var(--c-orange)', cursor: 'pointer', padding: '0.5rem 1rem' }}
                            >
                                <IconImage name="filter" alt="filtro" size={12} fallback={<Filter size={12} />} />
                                Filtro Ativo: Turma {scenariosFilter} <X size={12} className="ml-1" />
                            </button>
                        )}
                    </div>

                    {/* Extraction Success Banner */}
                    {extractionMessage && (
                        <div className="fade-in" style={{ backgroundColor: '#ecfdf5', border: '1px solid #d1fae5', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ padding: '0.25rem', backgroundColor: '#d1fae5', borderRadius: '50%', color: '#059669' }}>
                              <IconImage name="sparkles" alt="sucesso" size={16} fallback={<Sparkles size={16} />} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p className="text-sm font-bold" style={{ color: '#065f46' }}>Extração Concluída</p>
                                <p className="text-xs" style={{ color: '#047857' }}>{extractionMessage}</p>
                            </div>
                            <button onClick={() => setExtractionMessage(null)} style={{ color: '#10b981' }}>
                              <IconImage name="x" alt="fechar" size={16} fallback={<X size={16} />} />
                            </button>
                        </div>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', paddingBottom: '3rem' }}>
                    {scenariosFilteredByTurma.map(sc => (
                    <div key={sc.id} className="card fade-in" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '2rem 2rem 1rem 2rem', flex: 1 }}>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-xl font-bold text-black leading-tight">{sc.title}</h3>
                                <span className={`badge ${sc.turma === 'A' ? 'badge-A' : 'badge-B'}`}>
                                Turma {sc.turma}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-3 mb-5">
                                <div>
                                <span className="text-neutral uppercase tracking-widest block mb-0.5" style={{ fontSize: '10px', fontWeight: 'bold' }}>Arquétipo</span>
                                <p className="text-black font-medium text-sm">{sc.archetype}</p>
                                </div>
                                {sc.metaphor && (
                                <div>
                                    <span className="text-neutral uppercase tracking-widest block mb-0.5" style={{ fontSize: '10px', fontWeight: 'bold' }}>Metáfora / Mito</span>
                                    <p className="text-sm font-medium italic" style={{ color: 'var(--c-orange-deep)' }}>"{sc.metaphor}"</p>
                                </div>
                                )}
                            </div>

                            <p className="text-gray text-sm mb-6" style={{ lineHeight: 1.6 }}>{sc.description}</p>
                        </div>
                        
                        {/* AI Illustration Section */}
                        <div style={{ padding: '0 2rem 2rem 2rem' }}>
                            <AIIllustration 
                                prompt={sc.imagePrompt || sc.description} 
                                aspectRatio="video"
                            />
                        </div>
                    </div>
                    ))}
                </div>
              </div>
              </div>
            </div>
          )}

          {currentView === AppView.SOLUTIONS && (
            <div style={{ height: '100%', overflowY: 'auto', padding: '2rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-3xl font-extrabold text-black">Soluções Cadastradas</h2>
                 <div className="text-xs font-bold text-neutral uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-200">
                    {filteredSolutions.length} / {registeredSolutions.length} Registros
                 </div>
              </div>

              <div className="relative mb-8">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral" style={{ pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Buscar por nome da solução, participante ou cenário..."
                  value={solutionsSearchQuery}
                  onChange={(e) => setSolutionsSearchQuery(e.target.value)}
                  className="input-field w-full"
                  style={{ paddingLeft: '2.75rem', height: '52px' }}
                  aria-label="Buscar soluções"
                />
              </div>

              {filteredSolutions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', backgroundColor: 'white', borderRadius: '24px', border: '1px dashed #e5e7eb' }}>
                    {registeredSolutions.length > 0 ? (
                        <>
                          <p className="text-neutral font-medium mb-4">Nenhum resultado encontrado para "{solutionsSearchQuery}".</p>
                          <button onClick={() => setSolutionsSearchQuery('')} className="btn btn-secondary">
                            Limpar Busca
                          </button>
                        </>
                    ) : (
                        <>
                            <p className="text-neutral font-medium mb-4">Nenhuma solução cadastrada ainda.</p>
                            <button onClick={() => setCurrentView(AppView.CHAT)} className="btn btn-primary">
                                Cadastrar via Chat
                            </button>
                        </>
                    )}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {filteredSolutions.map((sol) => (
                    <div key={sol.id} className="card flex flex-col md:flex-row gap-8 fade-in">
                        <div style={{ flex: 1 }}>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-black">{sol.nome_da_solucao}</h3>
                                <span className="badge badge-neutral">Turma {sol.turma}</span>
                            </div>
                            <p className="text-neutral text-xs font-bold uppercase tracking-widest mb-6">
                                Por: {sol.participantes.map(p => p.nome_completo).join(', ')}
                            </p>
                            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #f3f4f6', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                <p className="font-bold text-orange mb-2 text-xs uppercase tracking-wide">Resumo da Solução</p>
                                {sol.descricao_refinada.resumo}
                            </div>
                             <div className="flex flex-wrap gap-2">
                                {sol.cenarios_relacionados.map(cen => (
                                    <span key={cen} className="badge" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', fontWeight: 'bold' }}>
                                        {cen}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {sol.imagem && sol.imagem.url && (
                             <div style={{ width: '250px', height: 'auto', backgroundColor: '#f9fafb', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                                 <img src={sol.imagem.url} alt="Solução" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                             </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
          )}

          {currentView === AppView.USER_PROFILE && userProfile && (
            <UserProfile 
              userProfile={userProfile}
              solutions={registeredSolutions}
              onLogout={handleLogout}
            />
          )}
        </main>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleUserRegistration}
      />
    </div>
  );
};

// Wrapper component com GoogleOAuthProvider
const AppWithGoogleAuth: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  );
};

export default AppWithGoogleAuth;