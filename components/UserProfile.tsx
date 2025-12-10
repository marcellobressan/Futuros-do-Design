import React, { useState, useEffect } from 'react';
import { LogOut, Mail, User, Calendar, BookOpen, Sparkles } from 'lucide-react';
import IconImage from './IconImage';
import { UserProfile as UserProfileType, RegisteredSolution } from '../types';

interface UserProfilePageProps {
  userProfile: UserProfileType;
  solutions: RegisteredSolution[];
  onLogout: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ userProfile, solutions, onLogout }) => {
  const userSolutions = solutions.filter(sol =>
    sol.participantes.some(p => p.email === userProfile.email)
  );

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      onLogout();
    }
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '2rem', backgroundColor: 'var(--c-bg-page)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header com dados do usuário */}
        <div className="card" style={{ marginBottom: '3rem', background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)', border: '1px solid #ffedd5' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--c-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-black mb-1">{userProfile.name}</h1>
                <div className="flex items-center gap-3 text-gray text-sm">
                  <IconImage name="mail" alt="email" size={16} fallback={<Mail size={16} />} />
                  {userProfile.email}
                </div>
                <div className="flex items-center gap-3 text-gray text-sm mt-2">
                  <IconImage name="user-check" alt="turma" size={16} fallback={<User size={16} />} />
                  {userProfile.turma === 'PROFESSOR' ? (
                    <span className="font-semibold">
                      Professor {userProfile.isSuperUser && <span style={{ color: '#f59e0b' }}>• Super User</span>}
                    </span>
                  ) : (
                    <span className="font-semibold">Turma {userProfile.turma}</span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }}
            >
              <IconImage name="log-out" alt="sair" size={18} fallback={<LogOut size={18} />} />
              Sair
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-orange)' }}>
                <IconImage name="sparkles" alt="soluções" size={28} fallback={<Sparkles size={28} />} />
              </div>
              <div>
                <p className="text-sm text-neutral font-semibold uppercase">Soluções Cadastradas</p>
                <p className="text-2xl font-extrabold text-black">{userSolutions.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <IconImage name="book-open" alt="cenários" size={28} fallback={<BookOpen size={28} />} />
              </div>
              <div>
                <p className="text-sm text-neutral font-semibold uppercase">Cenários Relacionados</p>
                <p className="text-2xl font-extrabold text-black">
                  {new Set(userSolutions.flatMap(s => s.cenarios_relacionados)).size}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <IconImage name="calendar" alt="data" size={28} fallback={<Calendar size={28} />} />
              </div>
              <div>
                <p className="text-sm text-neutral font-semibold uppercase">Última Submissão</p>
                <p className="text-lg font-extrabold text-black">
                  {userSolutions.length > 0
                    ? new Date(userSolutions[0].data_submissao).toLocaleDateString('pt-BR')
                    : 'Nenhuma'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Soluções */}
        <div>
          <h2 className="text-2xl font-extrabold text-black mb-6 flex items-center gap-2">
            <IconImage name="sparkles" alt="minhas soluções" size={24} fallback={<Sparkles className="text-orange" size={24} />} />
            Minhas Soluções
          </h2>

          {userSolutions.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {userSolutions.map(sol => (
                <div key={sol.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Imagem da Solução */}
                  {sol.imagem?.url && (
                    <div style={{ width: '100%', height: '180px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                      <img
                        src={sol.imagem.url}
                        alt={sol.nome_da_solucao}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Conteúdo da Solução */}
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-black flex-1">{sol.nome_da_solucao}</h3>
                      <span className={`badge ${sol.turma === 'A' ? 'badge-A' : 'badge-B'}`}>
                        Turma {sol.turma}
                      </span>
                    </div>

                    {/* Resumo */}
                    <p className="text-sm text-gray mb-3" style={{ lineHeight: 1.5 }}>
                      <strong>Resumo:</strong> {sol.descricao_refinada.resumo}
                    </p>

                    {/* Problema que resolve */}
                    <p className="text-sm text-gray mb-3" style={{ lineHeight: 1.5 }}>
                      <strong>Problema:</strong> {sol.descricao_refinada.problema_que_resolve}
                    </p>

                    {/* Cenários */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-orange uppercase mb-2">Cenários Relacionados</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {sol.cenarios_relacionados.map(cen => (
                          <span key={cen} className="badge" style={{ backgroundColor: '#fff7ed', color: 'var(--c-orange)', fontSize: '0.75rem' }}>
                            {cen}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Participantes */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray uppercase mb-1">Participantes</p>
                      <p className="text-sm text-gray">
                        {sol.participantes.map(p => p.nome_completo).join(', ')}
                      </p>
                    </div>

                    {/* Data */}
                    <p className="text-xs text-neutral">
                      Submetida em {new Date(sol.data_submissao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '3rem', backgroundColor: '#f9fafb' }}>
              <IconImage name="sparkles" alt="vazio" size={48} fallback={<Sparkles size={48} className="text-gray mx-auto mb-3" />} />
              <p className="text-lg font-bold text-black mb-2">Nenhuma solução cadastrada ainda</p>
              <p className="text-gray text-sm">Comece cadastrando suas primeiras ideias sobre os Futuros do Design.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
