import React from 'react';
import { SCENARIOS_DATA } from '../constants';
import { AppView } from '../types';
import { BookOpen, MessageSquare, Database, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-72 bg-slate-900 border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-['Space_Grotesk']">
              FUTUROS DO DESIGN
            </h1>
            <p className="text-xs text-slate-400 mt-1">CESAR School 2025</p>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setView(AppView.CHAT)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === AppView.CHAT 
                ? 'bg-slate-800 text-cyan-400 border border-slate-700' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MessageSquare size={20} />
            <span className="font-medium">Agente do Portal</span>
          </button>

          <button
            onClick={() => setView(AppView.KNOWLEDGE)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === AppView.KNOWLEDGE 
                ? 'bg-slate-800 text-purple-400 border border-slate-700' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Cenários & Arquétipos</span>
          </button>

          <button
            onClick={() => setView(AppView.SOLUTIONS)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === AppView.SOLUTIONS 
                ? 'bg-slate-800 text-emerald-400 border border-slate-700' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Database size={20} />
            <span className="font-medium">Soluções Cadastradas</span>
          </button>

          <div className="mt-8 pt-4 border-t border-slate-700">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
              Cenários Ativos
            </h3>
            <div className="space-y-3">
              {SCENARIOS_DATA.map((scenario) => (
                <div key={scenario.id} className="bg-slate-800/50 p-3 rounded-md border border-slate-700/50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-white">{scenario.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${scenario.turma === 'A' ? 'bg-cyan-900 text-cyan-200' : 'bg-purple-900 text-purple-200'}`}>
                      Turma {scenario.turma}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
