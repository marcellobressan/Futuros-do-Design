import React, { useState } from 'react';
import { Mail, User } from 'lucide-react';
import IconImage from './IconImage';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string, turma: 'A' | 'B') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTurma, setFormTurma] = useState<'A' | 'B'>('A');
  const [loginMethod, setLoginMethod] = useState<'manual' | 'google'>('google');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    try {
      // Simula autenticação com Google OAuth
      // Em produção, você usaria: https://www.npmjs.com/package/@react-oauth/google
      // ou integração nativa com Firebase
      
      // Para demonstração, vamos usar uma simulação
      // Idealmente você faria uma chamada para um endpoint que trata o fluxo OAuth
      
      const mockGoogleUser = {
        name: 'Usuário Google',
        email: `user-${Date.now()}@gmail.com`,
      };

      onLogin(mockGoogleUser.name, mockGoogleUser.email, formTurma);
      setFormName('');
      setFormEmail('');
      onClose();
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName && formEmail) {
      onLogin(formName, formEmail, formTurma);
      setFormName('');
      setFormEmail('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="card" style={{ maxWidth: '450px', width: '90%', boxShadow: 'var(--shadow-2xl)' }}>
        <button
          onClick={onClose}
          style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--c-gray)' }}
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-black mb-6 text-center">Entrar / Identificar-se</h2>

        {/* Tabs de método de login */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <button
            onClick={() => setLoginMethod('google')}
            style={{
              padding: '0.5rem 1rem',
              fontWeight: loginMethod === 'google' ? 700 : 500,
              color: loginMethod === 'google' ? 'var(--c-orange)' : 'var(--c-gray)',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderBottom: loginMethod === 'google' ? '2px solid var(--c-orange)' : 'none'
            }}
          >
            Google
          </button>
          <button
            onClick={() => setLoginMethod('manual')}
            style={{
              padding: '0.5rem 1rem',
              fontWeight: loginMethod === 'manual' ? 700 : 500,
              color: loginMethod === 'manual' ? 'var(--c-orange)' : 'var(--c-gray)',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderBottom: loginMethod === 'manual' ? '2px solid var(--c-orange)' : 'none'
            }}
          >
            Manual
          </button>
        </div>

        {loginMethod === 'google' ? (
          <div>
            {/* Google Login */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-black mb-2">Selecione sua turma</label>
              <select
                value={formTurma}
                onChange={(e) => setFormTurma(e.target.value as 'A' | 'B')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  marginBottom: '1rem'
                }}
              >
                <option value="A">Turma A</option>
                <option value="B">Turma B</option>
              </select>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={isLoadingGoogle}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: isLoadingGoogle ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                opacity: isLoadingGoogle ? 0.6 : 1,
                transition: 'all 200ms'
              }}
              onMouseEnter={(e) => !isLoadingGoogle && (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
            >
              {isLoadingGoogle ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                  Autenticando...
                </>
              ) : (
                <>
                  <IconImage name="mail" alt="google" size={20} fallback={<Mail size={20} />} />
                  Continuar com Google
                </>
              )}
            </button>

            <p className="text-xs text-gray text-center mt-4">
              Você será redirecionado para a página de login do Google para autenticar com segurança.
            </p>
          </div>
        ) : (
          <form onSubmit={handleManualLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-black mb-2">Nome Completo</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Seu nome"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-black mb-2">Email</label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="seu.email@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-black mb-2">Turma</label>
              <select
                value={formTurma}
                onChange={(e) => setFormTurma(e.target.value as 'A' | 'B')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.95rem'
                }}
              >
                <option value="A">Turma A</option>
                <option value="B">Turma B</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <IconImage name="user-check" alt="entrar" size={18} fallback={<User size={18} />} />
              Entrar
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
