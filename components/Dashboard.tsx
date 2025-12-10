import React from 'react';
import { UserProfile, RegisteredSolution, AppView } from '../types';
import { SCENARIOS_DATA } from '../constants';
import { ArrowRight, MessageSquare, BookOpen, Database, Clock, TrendingUp, Sparkles } from 'lucide-react';
import IconImage from './IconImage';

interface DashboardProps {
    userProfile: UserProfile | null;
    solutions: RegisteredSolution[];
    onNavigate: (view: AppView) => void;
}

const StatCard: React.FC<{ icon: React.ElementType, value: number, label: string, color: string }> = ({ icon: Icon, value, label, color }) => (
    <div 
        className="card" 
        style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            cursor: 'default',
            border: `1px solid ${color}33`
        }}
        onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 24px ${color}22`;
        }}
        onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
        title={label}
    >
        <div style={{ padding: '1rem', borderRadius: '50%', backgroundColor: `${color}1A`, color: color }}>
            <Icon size={28} />
        </div>
        <div>
            <p className="text-3xl font-extrabold text-black">{value}</p>
            <p className="text-sm font-bold text-neutral">{label}</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ userProfile, solutions, onNavigate }) => {
    const recentSolutions = solutions.slice(0, 3);

    return (
        <div style={{ height: '100%', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <IconImage name="sparkles" alt="destaque" size={32} fallback={<Sparkles size={32} style={{ color: 'var(--c-orange)' }} />} />
                        <h1 className="text-4xl font-extrabold text-black">
                            {userProfile ? `Bem-vindo, ${userProfile.name.split(' ')[0]}!` : 'Dashboard de Prospecção'}
                        </h1>
                    </div>
                    <p className="text-lg text-neutral mt-2">
                        🎯 Seu centro de comando para explorar os Futuros do Design. Acompanhe contribuições e descubra oportunidades.
                    </p>
                </header>

                {/* Stat Cards */}
                <div className="flex gap-6 mb-10 flex-col md:flex-row">
                    <StatCard icon={Database} value={solutions.length} label="Soluções Registradas" color="var(--c-orange)" />
                    <StatCard icon={BookOpen} value={SCENARIOS_DATA.length} label="Cenários Disponíveis" color="#3b82f6" />
                </div>
                
                {/* Main Grid */}
                {/* FIX: Replaced inline styles with Tailwind CSS classes for a responsive grid layout. */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column: CTAs & Recent Activity */}
                    <div className="flex flex-col gap-8 col-span-3 md:col-span-2">
                        {/* Call to Actions */}
                        <div className="card" style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
                          <button onClick={() => onNavigate(AppView.CHAT)} className="btn btn-primary" style={{ flex: 1, flexDirection: 'column', height: '120px', gap: '0.5rem' }}>
                              <IconImage name="message-square" alt="conversar" size={24} fallback={<MessageSquare size={24} />} />
                                <span className="text-base">Conversar com Agente</span>
                           </button>
                           <button onClick={() => onNavigate(AppView.KNOWLEDGE)} className="btn btn-secondary" style={{ flex: 1, flexDirection: 'column', height: '120px', gap: '0.5rem' }}>
                              <IconImage name="book-open" alt="explorar" size={24} fallback={<BookOpen size={24} />} />
                               <span className="text-base">Explorar Cenários</span>
                           </button>
                        </div>
                        
                        {/* Recent Activity */}
                        <div>
                           <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                               <IconImage name="clock" alt="atividade" size={22} fallback={<Clock className="text-neutral" size={22}/>} />
                               Atividade Recente
                           </h2>
                           <div className="flex flex-col gap-4">
                               {recentSolutions.length > 0 ? (
                                   recentSolutions.map(sol => (
                                       <div key={sol.id} className="card flex justify-between items-center fade-in">
                                           <div>
                                               <p className="font-bold text-black">{sol.nome_da_solucao}</p>
                                               <p className="text-sm text-neutral">
                                                   por {sol.participantes[0]?.nome_completo}
                                                   {sol.participantes.length > 1 && ' e outros'}
                                               </p>
                                           </div>
                                           <span className={`badge ${sol.turma === 'A' ? 'badge-A' : 'badge-B'}`}>Turma {sol.turma}</span>
                                       </div>
                                   ))
                               ) : (
                                   <div className="card text-center text-neutral font-medium">
                                       Nenhuma solução cadastrada ainda. Seja o primeiro!
                                   </div>
                               )}
                           </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Info */}
                    {/* FIX: Replaced invalid inline style media query with Tailwind CSS classes. */}
                    <div className="card col-span-3 md:col-span-1" style={{ backgroundColor: '#161616', color: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3 className="text-xl font-bold text-orange">Sobre o Portal</h3>
                        <p className="text-sm" style={{ color: '#d4d4d4', lineHeight: '1.6', flexGrow: 1 }}>
                            Este é um repositório vivo da disciplina Teoria e Futuro do Design. Use o agente de IA para explorar e registrar suas ideias.
                        </p>
                            <button 
                            onClick={() => onNavigate(AppView.HOME)}
                            className="btn btn-ghost" 
                            style={{ color: 'white', justifyContent: 'flex-start', padding: 0, marginTop: 'auto', alignSelf: 'flex-start' }}
                        >
                            Ver Manifesto & Método <IconImage name="arrow-right" alt="ver manifesto" size={16} fallback={<ArrowRight size={16} />} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
