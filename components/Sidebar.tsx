import React from 'react';
import { SCENARIOS_DATA } from '../constants';
import { AppView, UserProfile } from '../types';
import { BookOpen, MessageSquare, Database, X, LogIn, Compass, LayoutGrid, ChevronRight } from 'lucide-react';
import IconImage from './IconImage';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  userProfile: UserProfile | null;
  onLoginClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, toggleSidebar, userProfile, onLoginClick }) => {
  
  const navItemClass = (view: AppView) => `
    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer
    ${currentView === view ? 'bg-orange-50 text-orange font-bold' : 'text-gray hover:bg-gray-50 hover:text-orange-deep'}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="mobile-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        {/* Header / Logo Area */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-orange leading-none" style={{ lineHeight: '1' }}>
              FUTUROS<br/>DO DESIGN
            </h1>
            <p className="text-neutral mt-2 uppercase tracking-wide" style={{ fontSize: '11px', fontWeight: 500 }}>
              CESAR School 2025
            </p>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-neutral hover:text-orange" style={{ display: window.innerWidth > 768 ? 'none' : 'block' }}>
            <IconImage name="x" alt="fechar" size={24} fallback={<X size={24} />} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => { setView(AppView.HOME); toggleSidebar(); }}
            className={navItemClass(AppView.HOME)} 
            style={currentView === AppView.HOME ? { backgroundColor: '#fff7ed', color: '#ff6002' } : { color: '#3f3f3f' }}
            title="Conheça o manifesto e a metodologia do portal"
          >
            <IconImage name="compass" alt="manifesto e método" size={20} fallback={<Compass size={20} />} />
            <span>Manifesto & Método</span>
            {currentView === AppView.HOME && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>
          
          <button 
            onClick={() => { setView(AppView.DASHBOARD); toggleSidebar(); }}
            className={navItemClass(AppView.DASHBOARD)} 
            style={currentView === AppView.DASHBOARD ? { backgroundColor: '#fff7ed', color: '#ff6002' } : { color: '#3f3f3f' }}
            title="Acesso rápido aos dados e resumos"
          >
            <IconImage name="layout-grid" alt="dashboard" size={20} fallback={<LayoutGrid size={20} />} />
            <span>Dashboard</span>
            {currentView === AppView.DASHBOARD && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>
          
          <button 
            onClick={() => { setView(AppView.CHAT); toggleSidebar(); }}
            className={navItemClass(AppView.CHAT)} 
            style={currentView === AppView.CHAT ? { backgroundColor: '#fff7ed', color: '#ff6002' } : { color: '#3f3f3f' }}
            title="Converse com o assistente IA e explore Futuros do Design"
          >
            <IconImage name="message-square" alt="agente do portal" size={20} fallback={<MessageSquare size={20} />} />
            <span>Agente do Portal</span>
            {currentView === AppView.CHAT && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <button 
            onClick={() => { setView(AppView.SOLUTION_REGISTRATION); toggleSidebar(); }}
            className={navItemClass(AppView.SOLUTION_REGISTRATION)} 
            style={currentView === AppView.SOLUTION_REGISTRATION ? { backgroundColor: '#fff7ed', color: '#ff6002' } : { color: '#3f3f3f' }}
            title="Registrar uma solução designada para Futuros do Design"
          >
            <IconImage name="message-square" alt="cadastro de soluções" size={20} fallback={<MessageSquare size={20} />} />
            <span>Cadastrar Solução</span>
            {currentView === AppView.SOLUTION_REGISTRATION && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <button 
            onClick={() => { setView(AppView.KNOWLEDGE); toggleSidebar(); }}
            className={navItemClass(AppView.KNOWLEDGE)} 
            style={currentView === AppView.KNOWLEDGE ? { backgroundColor: '#fff7ed', color: '#ff6002' } : { color: '#3f3f3f' }}
            title="Explore cenários e arquétipos do projeto"
          >
            <IconImage name="book-open" alt="cenários e arquétipos" size={20} fallback={<BookOpen size={20} />} />
            <span>Cenários & Arquétipos</span>
            {currentView === AppView.KNOWLEDGE && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <button 
            onClick={() => { setView(AppView.SOLUTIONS); toggleSidebar(); }}
            className={navItemClass(AppView.SOLUTIONS)} 
            style={currentView === AppView.SOLUTIONS ? { backgroundColor: '#fff7ed', color: '#ff6002' } : { color: '#3f3f3f' }}
            title="Veja todas as soluções registradas"
          >
            <IconImage name="database" alt="soluções cadastradas" size={20} fallback={<Database size={20} />} />
            <span>Soluções Cadastradas</span>
            {currentView === AppView.SOLUTIONS && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--c-border)' }}>
            <h3 className="text-neutral uppercase tracking-widest" style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '1rem', paddingLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎯 Cenários Ativos</span>
            </h3>
            <div className="flex flex-col gap-2">
              {SCENARIOS_DATA.map((scenario) => (
                <div 
                  key={scenario.id} 
                  className="card" 
                  style={{ 
                    padding: '0.75rem', 
                    background: '#fcfcfc', 
                    border: '1px solid #f3f4f6', 
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                    borderLeft: `3px solid ${scenario.turma === 'A' ? '#ff6002' : '#0066cc'}`
                  }}
                  title={scenario.description}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-gray">
                      {scenario.title}
                    </span>
                    <span className={`badge ${scenario.turma === 'A' ? 'badge-A' : 'badge-B'}`} style={{ fontSize: '10px' }}>
                      {scenario.turma}
                    </span>
                  </div>
                  <p className="text-neutral" style={{ fontSize: '11px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile Section */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--c-border)', backgroundColor: '#f9fafb' }}>
          {userProfile ? (
            <div 
              className="flex items-center gap-3 bg-white p-3 rounded-xl" 
              style={{ 
                borderRadius: '12px', 
                padding: '0.75rem', 
                border: '1px solid var(--c-border)',
                backgroundColor: 'white',
                transition: 'all 0.2s ease'
              }}
              title={`Conectado como ${userProfile.name}`}
            >
              <div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--c-orange)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 'bold', 
                  fontSize: '14px',
                  flexShrink: 0
                }}
              >
                 {userProfile.name.substring(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="text-sm font-bold text-black" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {userProfile.name}
                </p>
                <p className="text-xs text-neutral" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  📚 Turma {userProfile.turma}
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="btn w-full"
              style={{ 
                width: '100%', 
                backgroundColor: 'var(--c-black)', 
                color: 'white',
                transition: 'all 0.2s ease'
              }}
              title="Clique para se identificar na plataforma"
            >
              <IconImage name="log-in" alt="entrar" size={18} fallback={<LogIn size={18} />} />
              <span className="text-sm">Entrar / Identificar-se</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;