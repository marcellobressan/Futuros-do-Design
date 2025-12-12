import React from 'react';
import { Search, Package, FileX, Inbox, AlertCircle } from 'lucide-react';
import IconImage from './IconImage';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action 
}) => {
  const defaultIcon = <Inbox size={60} />;

  return (
    <div className="empty-state fade-in" role="status">
      <div className="empty-state-icon">
        {icon || defaultIcon}
      </div>
      <div>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: 'var(--c-black)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)'
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--c-neutral)',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          {description}
        </p>
      </div>
      {action && (
        <button 
          onClick={action.onClick} 
          className="btn btn-primary hover-scale"
          style={{ marginTop: '1rem' }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

interface NoResultsStateProps {
  searchQuery: string;
  onClear: () => void;
}

export const NoResultsState: React.FC<NoResultsStateProps> = ({ searchQuery, onClear }) => {
  return (
    <div className="empty-state fade-in">
      <div className="empty-state-icon">
        <Search size={60} />
      </div>
      <div>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: 'var(--c-black)',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)'
        }}>
          Nenhum resultado encontrado
        </h3>
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--c-neutral)',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          Não encontramos resultados para "<strong>{searchQuery}</strong>". 
          Tente usar palavras-chave diferentes ou limpar a busca.
        </p>
      </div>
      <button 
        onClick={onClear} 
        className="btn btn-secondary hover-scale"
        style={{ marginTop: '1rem' }}
      >
        Limpar busca
      </button>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Algo deu errado', 
  message, 
  onRetry 
}) => {
  return (
    <div className="empty-state fade-in">
      <div className="empty-state-icon" style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fef3c7 100%)' }}>
        <AlertCircle size={60} style={{ color: '#ef4444' }} />
      </div>
      <div>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          color: '#ef4444',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-display)'
        }}>
          {title}
        </h3>
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--c-neutral)',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          {message}
        </p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn btn-primary hover-scale"
          style={{ marginTop: '1rem' }}
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

interface NoSolutionsStateProps {
  onCreateNew: () => void;
}

export const NoSolutionsState: React.FC<NoSolutionsStateProps> = ({ onCreateNew }) => {
  return (
    <EmptyState
      icon={<Package size={60} />}
      title="Nenhuma solução registrada ainda"
      description="Comece criando sua primeira solução de design. Explore cenários futuros e registre suas ideias inovadoras."
      action={{
        label: 'Criar primeira solução',
        onClick: onCreateNew
      }}
    />
  );
};

interface NoScenariosStateProps {
  turma?: string;
}

export const NoScenariosState: React.FC<NoScenariosStateProps> = ({ turma }) => {
  return (
    <EmptyState
      icon={<FileX size={60} />}
      title={turma ? `Nenhum cenário para Turma ${turma}` : 'Nenhum cenário disponível'}
      description={
        turma 
          ? `Não há cenários disponíveis para a Turma ${turma} no momento. Verifique novamente mais tarde.`
          : 'Não há cenários disponíveis no momento. Aguarde novas atualizações.'
      }
    />
  );
};
