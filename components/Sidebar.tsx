import React from 'react';
import { SCENARIOS_DATA } from '../constants';
import { AppView, UserProfile } from '../types';
import { BookOpen, MessageSquare, Database, X, LogIn, Compass, LayoutGrid, ChevronRight, User } from 'lucide-react';
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
    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer
    ${currentView === view ? 'font-bold' : 'hover:text-orange-deep'}
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
        <div style={{ padding: '1.75rem 1.5rem 1.5rem', borderBottom: '1px solid rgba(255, 96, 2, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-orange leading-none" style={{ lineHeight: '1', fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--c-orange-cesar)', textShadow: '0 0 20px rgba(255,96,2,0.4)' }}>
              FUTUROS<br/>DO DESIGN
            </h1>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(237,232,223,0.38)', marginTop: '0.5rem' }}>
              CESAR School 2025
            </p>
          </div>
          <button onClick={toggleSidebar} style={{ display: window.innerWidth > 768 ? 'none' : 'flex', color: 'rgba(237,232,223,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <IconImage name="x" alt="fechar" size={20} fallback={<X size={20} />} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => { setView(AppView.HOME); toggleSidebar(); }}
            className={navItemClass(AppView.HOME)} 
            style={currentView === AppView.HOME ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
            title="Conheça o manifesto e a metodologia do portal"
          >
            <IconImage name="compass" alt="manifesto e método" size={20} fallback={<Compass size={20} />} />
            <span>Manifesto & Método</span>
            {currentView === AppView.HOME && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>
          
          <button 
            onClick={() => { setView(AppView.DASHBOARD); toggleSidebar(); }}
            className={navItemClass(AppView.DASHBOARD)} 
            style={currentView === AppView.DASHBOARD ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
            title="Acesso rápido aos dados e resumos"
          >
            <IconImage name="layout-grid" alt="dashboard" size={20} fallback={<LayoutGrid size={20} />} />
            <span>Dashboard</span>
            {currentView === AppView.DASHBOARD && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>
          
          <button 
            onClick={() => { setView(AppView.CHAT); toggleSidebar(); }}
            className={navItemClass(AppView.CHAT)} 
            style={currentView === AppView.CHAT ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
            title="Converse com o assistente IA e explore Futuros do Design"
          >
            <IconImage name="message-square" alt="agente do portal" size={20} fallback={<MessageSquare size={20} />} />
            <span>Agente do Portal</span>
            {currentView === AppView.CHAT && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <button 
            onClick={() => { setView(AppView.SOLUTION_REGISTRATION); toggleSidebar(); }}
            className={navItemClass(AppView.SOLUTION_REGISTRATION)} 
            style={currentView === AppView.SOLUTION_REGISTRATION ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
            title="Registrar uma solução designada para Futuros do Design"
          >
            <IconImage name="message-square" alt="cadastro de soluções" size={20} fallback={<MessageSquare size={20} />} />
            <span>Cadastrar Solução</span>
            {currentView === AppView.SOLUTION_REGISTRATION && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <button 
            onClick={() => { setView(AppView.KNOWLEDGE); toggleSidebar(); }}
            className={navItemClass(AppView.KNOWLEDGE)} 
            style={currentView === AppView.KNOWLEDGE ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
            title="Explore cenários e arquétipos do projeto"
          >
            <IconImage name="book-open" alt="cenários e arquétipos" size={20} fallback={<BookOpen size={20} />} />
            <span>Cenários & Arquétipos</span>
            {currentView === AppView.KNOWLEDGE && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>

          <button 
            onClick={() => { setView(AppView.SOLUTIONS); toggleSidebar(); }}
            className={navItemClass(AppView.SOLUTIONS)} 
            style={currentView === AppView.SOLUTIONS ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
            title="Veja todas as soluções registradas"
          >
            <IconImage name="database" alt="soluções cadastradas" size={20} fallback={<Database size={20} />} />
            <span>Soluções Cadastradas</span>
            {currentView === AppView.SOLUTIONS && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
          </button>
        </nav>

        {/* User Profile Section */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 96, 2, 0.12)', backgroundColor: 'transparent' }}>
          {userProfile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => { setView(AppView.USER_PROFILE); toggleSidebar(); }}
                className={navItemClass(AppView.USER_PROFILE)} 
                style={currentView === AppView.USER_PROFILE ? { background: 'rgba(255,96,2,0.1)', color: 'var(--c-orange-cesar)', borderLeft: '2px solid var(--c-orange-cesar)', boxShadow: '0 0 12px rgba(255,96,2,0.12)' } : { color: 'rgba(237,232,223,0.55)', borderLeft: '2px solid transparent' }}
                title="Veja seu perfil e soluções cadastradas"
              >
                <IconImage name="user" alt="meu perfil" size={20} fallback={<User size={20} />} />
                <span>Meu Perfil</span>
                {currentView === AppView.USER_PROFILE && <IconImage name="chevron-right" alt="selecionado" size={16} fallback={<ChevronRight size={16} style={{ marginLeft: 'auto' }} />} />}
              </button>
              <div 
                className="flex items-center gap-3 p-3" 
                style={{ 
                  borderRadius: '8px', 
                  padding: '0.75rem', 
                  border: '1px solid rgba(255,96,2,0.14)',
                  backgroundColor: 'rgba(255,96,2,0.06)',
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
                  <p className="text-sm font-bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--c-text-primary)' }}>
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-neutral" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {userProfile.turma === 'PROFESSOR' ? (
                      <>
                        👨‍🏫 Professor {userProfile.isSuperUser && <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>(Admin)</span>}
                      </>
                    ) : (
                      <></>  
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="btn w-full"
              style={{ 
                width: '100%', 
                background: 'linear-gradient(135deg, rgba(255,96,2,0.15) 0%, rgba(255,119,34,0.1) 100%)',
                color: 'var(--c-orange-cesar)',
                border: '1px solid rgba(255,96,2,0.4)',
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