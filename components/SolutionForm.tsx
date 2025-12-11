import React, { useState } from 'react';
import { UserProfile, RegisteredSolution } from '../types';
import { Save, Plus, X, Upload, AlertCircle, CheckCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import IconImage from './IconImage';
import { SCENARIOS_DATA } from '../constants';

interface SolutionFormProps {
  userProfile: UserProfile;
  onSuccess: () => void;
}

interface Participant {
  nome_completo: string;
  email: string;
}

const SolutionForm: React.FC<SolutionFormProps> = ({ userProfile, onSuccess }) => {
  // Form state
  const [nomeSolucao, setNomeSolucao] = useState('');
  const [participantes, setParticipantes] = useState<Participant[]>([
    { nome_completo: userProfile.name, email: userProfile.email }
  ]);
  const [cenariosRelacionados, setCenariosRelacionados] = useState<string[]>([]);
  const [resumo, setResumo] = useState('');
  const [problemaQueResolve, setProblemaQueResolve] = useState('');
  const [comoFunciona, setComoFunciona] = useState('');
  const [relacaoComCenarios, setRelacaoComCenarios] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [linkSolucao, setLinkSolucao] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Filtrar cenários pela turma do usuário (apenas se não for professor)
  const scenariosDisponiveis = userProfile.turma === 'PROFESSOR' 
    ? SCENARIOS_DATA 
    : SCENARIOS_DATA.filter(s => s.turma === userProfile.turma);

  const addParticipant = () => {
    setParticipantes([...participantes, { nome_completo: '', email: '' }]);
  };

  const removeParticipant = (index: number) => {
    if (participantes.length > 1) {
      setParticipantes(participantes.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index: number, field: 'nome_completo' | 'email', value: string) => {
    const updated = [...participantes];
    updated[index][field] = value;
    setParticipantes(updated);
  };

  const toggleCenario = (cenarioId: string) => {
    if (cenariosRelacionados.includes(cenarioId)) {
      setCenariosRelacionados(cenariosRelacionados.filter(id => id !== cenarioId));
    } else {
      setCenariosRelacionados([...cenariosRelacionados, cenarioId]);
    }
  };

  const validateForm = (): string | null => {
    if (!nomeSolucao.trim()) return 'Nome da solução é obrigatório';
    if (participantes.some(p => !p.nome_completo.trim() || !p.email.trim())) {
      return 'Todos os participantes devem ter nome e email preenchidos';
    }
    if (cenariosRelacionados.length === 0) return 'Selecione pelo menos um cenário relacionado';
    if (!resumo.trim()) return 'Resumo é obrigatório';
    if (!problemaQueResolve.trim()) return 'Campo "Problema que resolve" é obrigatório';
    if (!comoFunciona.trim()) return 'Campo "Como funciona" é obrigatório';
    if (!relacaoComCenarios.trim()) return 'Campo "Relação com cenários" é obrigatório';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload: Partial<RegisteredSolution> = {
        nome_da_solucao: nomeSolucao.trim(),
        turma: userProfile.turma,
        participantes: participantes.map(p => ({
          nome_completo: p.nome_completo.trim(),
          email: p.email.trim().toLowerCase()
        })),
        cenarios_relacionados: cenariosRelacionados,
        descricao_refinada: {
          resumo: resumo.trim(),
          problema_que_resolve: problemaQueResolve.trim(),
          como_funciona: comoFunciona.trim(),
          relacao_com_os_cenarios: relacaoComCenarios.trim()
        },
        imagem: {
          tipo: imagemUrl.trim() ? 'url' : 'url',
          url: imagemUrl.trim() || 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=400'
        },
        link_solucao: linkSolucao.trim() || undefined
      };

      const response = await fetch('/.netlify/functions/solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao cadastrar solução');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao cadastrar solução');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: '400px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#dcfce7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <CheckCircle size={40} style={{ color: '#16a34a' }} />
        </div>
        <h2 className="text-2xl font-bold text-black mb-2">Solução Cadastrada!</h2>
        <p className="text-neutral">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-3xl font-extrabold text-black mb-2">Cadastrar Nova Solução</h1>
        <p className="text-neutral text-sm mb-4">Preencha os campos abaixo para registrar sua solução no portal.</p>
        
        {/* Progress Indicator */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          {[
            { label: 'Nome', filled: !!nomeSolucao },
            { label: 'Participantes', filled: participantes.every(p => p.nome_completo && p.email) },
            { label: 'Cenários', filled: cenariosRelacionados.length > 0 },
            { label: 'Descrição', filled: resumo && problemaQueResolve && comoFunciona && relacaoComCenarios }
          ].map((step, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{
                height: '4px',
                borderRadius: '2px',
                backgroundColor: step.filled ? 'var(--c-orange)' : '#e5e7eb',
                transition: 'background-color 0.3s ease'
              }} />
              <span style={{
                fontSize: '9px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: step.filled ? 'var(--c-orange)' : '#9ca3af'
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Nome da Solução */}
        <div className="card">
          <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
            Nome da Solução *
          </label>
          <input
            type="text"
            value={nomeSolucao}
            onChange={(e) => setNomeSolucao(e.target.value)}
            placeholder="Ex: Sistema de Reaproveitamento de Água"
            className="input-field"
            maxLength={100}
          />
        </div>

        {/* Participantes */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <label className="text-neutral uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 'bold' }}>
              Participantes * ({participantes.length})
            </label>
            <button
              type="button"
              onClick={addParticipant}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {participantes.map((p, index) => (
              <div key={index} className="flex gap-2 items-start">
                <input
                  type="text"
                  value={p.nome_completo}
                  onChange={(e) => updateParticipant(index, 'nome_completo', e.target.value)}
                  placeholder="Nome completo"
                  className="input-field"
                  style={{ flex: 1 }}
                />
                <input
                  type="email"
                  value={p.email}
                  onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                  placeholder="email@cesar.school"
                  className="input-field"
                  style={{ flex: 1 }}
                />
                {participantes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem' }}
                    title="Remover participante"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cenários Relacionados */}
        <div className="card">
          <label className="text-neutral uppercase tracking-widest mb-4 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
            Cenários Relacionados * (Selecione pelo menos um)
          </label>
          <div className="grid grid-cols-1 gap-4">
            {scenariosDisponiveis.map(cenario => (
              <button
                key={cenario.id}
                type="button"
                onClick={() => toggleCenario(cenario.id)}
                className="text-left transition-all"
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: cenariosRelacionados.includes(cenario.id) ? 'var(--c-orange)' : '#e5e7eb',
                  backgroundColor: cenariosRelacionados.includes(cenario.id) ? '#fff7ed' : 'white',
                  boxShadow: cenariosRelacionados.includes(cenario.id) ? '0 0 0 3px rgba(255, 96, 2, 0.1)' : 'none'
                }}
              >
                <div className="flex items-start gap-4">
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: '2px solid',
                    borderColor: cenariosRelacionados.includes(cenario.id) ? 'var(--c-orange)' : '#d1d5db',
                    backgroundColor: cenariosRelacionados.includes(cenario.id) ? 'var(--c-orange)' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    transition: 'all 0.2s ease'
                  }}>
                    {cenariosRelacionados.includes(cenario.id) && (
                      <IconImage name="check" alt="selecionado" size={16} fallback={<CheckCircle size={16} style={{ color: 'white' }} />} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-neutral" style={{ fontSize: '10px', fontWeight: 'bold' }}>
                        Turma {cenario.turma}
                      </span>
                      <span className="text-xs font-medium" style={{ color: 'var(--c-orange)' }}>
                        {cenario.archetype}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-black mb-2" style={{ lineHeight: '1.4' }}>
                      {cenario.title}
                    </h4>
                    <p className="text-xs text-neutral" style={{ lineHeight: '1.5', maxWidth: '100%' }}>
                      {cenario.description.substring(0, 150)}...
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Descrição da Solução */}
        <div className="card">
          <h3 className="text-lg font-bold text-black mb-4">Descrição da Solução</h3>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                Resumo *
              </label>
              <textarea
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                placeholder="Descreva de forma resumida sua solução (2-3 frases)"
                className="input-field"
                style={{ minHeight: '80px', resize: 'vertical' }}
                maxLength={500}
              />
              <div className="text-xs text-neutral mt-1">{resumo.length}/500 caracteres</div>
            </div>

            <div>
              <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                Problema que Resolve *
              </label>
              <textarea
                value={problemaQueResolve}
                onChange={(e) => setProblemaQueResolve(e.target.value)}
                placeholder="Qual problema essa solução se propõe a resolver?"
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                maxLength={1000}
              />
            </div>

            <div>
              <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                Como Funciona *
              </label>
              <textarea
                value={comoFunciona}
                onChange={(e) => setComoFunciona(e.target.value)}
                placeholder="Explique o funcionamento e as principais características da solução"
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                maxLength={1000}
              />
            </div>

            <div>
              <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
                Relação com os Cenários Selecionados *
              </label>
              <textarea
                value={relacaoComCenarios}
                onChange={(e) => setRelacaoComCenarios(e.target.value)}
                placeholder="Como sua solução se relaciona com os cenários que você selecionou acima?"
                className="input-field"
                style={{ minHeight: '100px', resize: 'vertical' }}
                maxLength={1000}
              />
            </div>
          </div>
        </div>

        {/* Imagem (Opcional) */}
        <div className="card">
          <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
            URL da Imagem (Opcional)
          </label>
          <div className="flex gap-2 items-start">
            <div style={{ flex: 1 }}>
              <input
                type="url"
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                className="input-field"
              />
              <p className="text-xs text-neutral mt-1">
                Cole o link de uma imagem que represente sua solução. Se deixar em branco, será usada uma imagem padrão.
              </p>
            </div>
            {imagemUrl && (
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                flexShrink: 0
              }}>
                <img 
                  src={imagemUrl} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=400';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Link da Solução (Opcional) */}
        <div className="card">
          <label className="text-neutral uppercase tracking-widest mb-2 block" style={{ fontSize: '11px', fontWeight: 'bold' }}>
            Link da Solução (Opcional)
          </label>
          <input
            type="url"
            value={linkSolucao}
            onChange={(e) => setLinkSolucao(e.target.value)}
            placeholder="https://exemplo.com/sua-solucao"
            className="input-field"
          />
          <p className="text-xs text-neutral mt-1">
            Cole o link para demonstração, repositório ou documentação da sua solução.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            <AlertCircle size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
            <p className="text-sm" style={{ color: '#dc2626' }}>{error}</p>
          </div>
        )}

        {/* Submit Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          paddingTop: '1rem',
          marginTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn btn-secondary"
            style={{ padding: '0.875rem 1.5rem' }}
          >
            ↑ Voltar ao Topo
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Cadastrando...
              </>
            ) : (
              <>
                <Save size={20} />
                Cadastrar Solução
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolutionForm;
