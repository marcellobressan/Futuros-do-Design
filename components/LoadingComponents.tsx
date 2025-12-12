import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Carregando...', 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <p style={{ 
          fontSize: '1.125rem', 
          fontWeight: 600, 
          color: 'var(--c-charcoal)',
          fontFamily: 'var(--font-display)'
        }}>
          {message}
        </p>
        <div className="loading-dots">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
      </div>
    </div>
  );
};

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '8px',
  className = ''
}) => {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
};

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="card"
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          aria-hidden="true"
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton width="60px" height="60px" borderRadius="50%" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton width="60%" height="24px" />
              <Skeleton width="40%" height="16px" />
            </div>
          </div>
          <Skeleton width="100%" height="12px" />
          <Skeleton width="90%" height="12px" />
          <Skeleton width="80%" height="12px" />
        </div>
      ))}
    </>
  );
};

interface InlineLoaderProps {
  size?: number;
  color?: string;
  message?: string;
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({ 
  size = 20, 
  color = 'var(--c-orange)',
  message
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <Loader2 
        size={size} 
        style={{ color, animation: 'spin 1s linear infinite' }} 
        aria-hidden="true"
      />
      {message && (
        <span style={{ fontSize: '0.875rem', color: 'var(--c-neutral)', fontWeight: 500 }}>
          {message}
        </span>
      )}
    </div>
  );
};

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  height?: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  showLabel = true,
  height = '8px',
  color = 'var(--grad-orange-fire)'
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--c-slate)'
        }}>
          <span>Progresso</span>
          <span>{clampedProgress}%</span>
        </div>
      )}
      <div 
        className="progress-bar" 
        style={{ height }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${clampedProgress}%`,
            background: color
          }}
        />
      </div>
    </div>
  );
};
