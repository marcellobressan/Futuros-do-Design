import React from 'react';
import { SCENARIOS_DATA } from '../constants';
import { AppView, UserProfile } from '../types';
import { BookOpen, MessageSquare, Database, X, LogIn, Compass } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  userProfile: UserProfile | null;
  onLoginClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, toggleSidebar, userProfile, onLoginClick }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-72 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col shadow-lg md:shadow-none
      `}>
        {/* Header / Logo Area */}
        <div className="p-8 pb-6 border-b border-gray-100 flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-cesar-orange leading-none tracking-tight">
              FUTUROS<br/>DO DESIGN
            </h1>
            <p className="text-[11px] font-medium text-cesar-neutral mt-2 tracking-wide uppercase">
              CESAR School 2025
            </p>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-cesar-neutral hover:text-cesar-orange">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setView(AppView.HOME)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === AppView.HOME
                ? 'bg-orange-50 text-cesar-orange font-bold' 
                : 'text-cesar-gray hover:bg-gray-50 hover:text-cesar-orange-deep'
            }`}
          >
            <Compass size={20} className={currentView === AppView.HOME ? 'text-cesar-orange' : 'text-cesar-neutral group-hover:text-cesar-orange-deep'} />
            <span>Manifesto & Método</span>
          </button>

          <button
            onClick={() => setView(AppView.CHAT)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === AppView.CHAT 
                ? 'bg-orange-50 text-cesar-orange font-bold' 
                : 'text-cesar-gray hover:bg-gray-50 hover:text-cesar-orange-deep'
            }`}
          >
            <MessageSquare size={20} className={currentView === AppView.CHAT ? 'text-cesar-orange' : 'text-cesar-neutral group-hover:text-cesar-orange-deep'} />
            <span>Agente do Portal</span>
          </button>

          <button
            onClick={() => setView(AppView.KNOWLEDGE)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === AppView.KNOWLEDGE 
                ? 'bg-orange-50 text-cesar-orange font-bold' 
                : 'text-cesar-gray hover:bg-gray-50 hover:text-cesar-orange-deep'
            }`}
          >
            <BookOpen size={20} className={currentView === AppView.KNOWLEDGE ? 'text-cesar-orange' : 'text-cesar-neutral group-hover:text-cesar-orange-deep'} />
            <span>Cenários & Arquétipos</span>
          </button>

          <button
            onClick={() => setView(AppView.SOLUTIONS)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === AppView.SOLUTIONS 
                ? 'bg-orange-50 text-cesar-orange font-bold' 
                : 'text-cesar-gray hover:bg-gray-50 hover:text-cesar-orange-deep'
            }`}
          >
            <Database size={20} className={currentView === AppView.SOLUTIONS ? 'text-cesar-orange' : 'text-cesar-neutral group-hover:text-cesar-orange-deep'} />
            <span>Soluções Cadastradas</span>
          </button>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-[10px] font-bold text-cesar-neutral uppercase tracking-widest mb-4 px-2">
              Cenários Ativos
            </h3>
            <div className="space-y-3">
              {SCENARIOS_DATA.map((scenario) => (
                <div key={scenario.id} className="bg-cesar-off-white/50 hover:bg-white p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-cesar-gray group-hover:text-cesar-orange-deep transition-colors">
                      {scenario.title}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                      scenario.turma === 'A' 
                        ? 'bg-cyan-50 text-cyan-600' 
                        : 'bg-purple-50 text-purple-600'
                    }`}>
                      {scenario.turma}
                    </span>
                  </div>
                  <p className="text-[11px] text-cesar-neutral leading-relaxed line-clamp-2">
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          {userProfile ? (
            <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-cesar-orange text-white flex items-center justify-center font-bold text-sm">
                 {userProfile.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-cesar-black truncate">{userProfile.name}</p>
                <p className="text-xs text-cesar-neutral truncate">Turma {userProfile.turma}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-cesar-black hover:bg-gray-800 text-white transition-all shadow-sm group"
            >
              <LogIn size={18} className="text-cesar-off-white group-hover:text-white" />
              <span className="text-sm font-medium">Entrar / Identificar-se</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;