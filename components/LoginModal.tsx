import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Mail, User } from 'lucide-react';
import IconImage from './IconImage';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string, turma: 'A' | 'B' | 'PROFESSOR') => void;
}

// Função para decodificar o JWT do Google (payload base64)
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTurma, setFormTurma] = useState<'A' | 'B' | 'PROFESSOR'>('A');
  const [loginMethod, setLoginMethod] = useState<'manual' | 'google'>('google');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const userInfo = parseJwt(credentialResponse.credential);
      
      if (userInfo) {
        // Validar se é professor com email autorizado
        if (formTurma === 'PROFESSOR' && userInfo.email !== 'mcb2@cesar.school') {
          setValidationError('Apenas o email mcb2@cesar.school pode se cadastrar como Professor.');
          return;
        }
        
        setValidationError(null);
        onLogin(userInfo.name || 'Usuário Google', userInfo.email, formTurma);
        setFormName('');
        setFormEmail('');
        onClose();
      }
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    alert('Falha ao autenticar com Google. Tente novamente ou use o login manual.');
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se é professor com email autorizado
    if (formTurma === 'PROFESSOR' && formEmail !== 'mcb2@cesar.school') {
      setValidationError('Apenas o email mcb2@cesar.school pode se cadastrar como Professor.');
      return;
    }
    
    if (formName && formEmail) {
      setValidationError(null);
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
                onChange={(e) => { setFormTurma(e.target.value as 'A' | 'B' | 'PROFESSOR'); setValidationError(null); }}
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
                <option value="PROFESSOR">Professor</option>
              </select>
              {formTurma === 'PROFESSOR' && (
                <p className="text-xs" style={{ color: '#d97706', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
                  ⚠️ Apenas mcb2@cesar.school pode se cadastrar como Professor
                </p>
              )}
            </div>

            {validationError && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.875rem' }}>
                {validationError}
              </div>
            )}

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
                width="100%"
              />
            </div>

            <p className="text-xs text-gray text-center mt-4">
              Clique no botão acima para autenticar com sua conta Google de forma segura.
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
                onChange={(e) => { setFormTurma(e.target.value as 'A' | 'B' | 'PROFESSOR'); setValidationError(null); }}
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
                <option value="PROFESSOR">Professor</option>
              </select>
              {formTurma === 'PROFESSOR' && (
                <p className="text-xs" style={{ color: '#d97706', marginTop: '0.5rem' }}>
                  ⚠️ Apenas mcb2@cesar.school pode se cadastrar como Professor
                </p>
              )}
            </div>

            {validationError && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.875rem' }}>
                {validationError}
              </div>
            )}

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
