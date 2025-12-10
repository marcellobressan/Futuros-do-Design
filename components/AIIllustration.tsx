import React, { useState } from 'react';
import { Image, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import IconImage from './IconImage';

interface AIIllustrationProps {
    prompt: string;
    className?: string;
    aspectRatio?: 'square' | 'video';
}

const AIIllustration: React.FC<AIIllustrationProps> = ({ prompt, className = '', aspectRatio = 'square' }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        // AI generation disabled in UI — use local placeholder instead.
        const PLACEHOLDER_SRC = '/images/placeholders/ai-placeholder.png';
        setImageUrl(PLACEHOLDER_SRC);
        setStatus('loaded');
    };

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: aspectRatio === 'square' ? '1/1' : '16/9',
    };

    return (
        <div style={containerStyle} className={className}>
            
            {status === 'idle' && (
                <div className="text-center p-6">
                        <div style={{ width: '64px', height: '64px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', boxShadow: 'var(--shadow-sm)' }}>
                        <IconImage name="image" alt="ilustração" size={24} fallback={<Image className="text-neutral" size={24} />} />
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleGenerate();
                        }}
                        className="btn btn-secondary"
                        style={{ borderRadius: '999px', fontSize: '0.875rem' }}
                    >
                        <IconImage name="sparkles" alt="visualizar" size={16} fallback={<Sparkles size={16} style={{ color: 'var(--c-orange)' }} />} />
                        Visualizar com IA
                    </button>
                    <p className="text-neutral mt-3" style={{ fontSize: '10px', maxWidth: '200px', margin: '0.75rem auto 0 auto' }}>
                        Gere uma ilustração exclusiva deste cenário usando o modelo Nano do Gemini.
                    </p>
                </div>
            )}

            {status === 'loading' && (
                <div className="flex flex-col items-center justify-center text-orange animate-pulse">
                    <IconImage name="loader2" alt="carregando" size={32} className="animate-spin mb-3" fallback={<Loader2 size={32} className="animate-spin mb-3" />} />
                    <span className="text-xs font-bold uppercase tracking-widest">Criando Arte...</span>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center p-4">
                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.75rem' }}>Falha na geração</p>
                    <button 
                        onClick={handleGenerate}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.75rem', color: '#ef4444', borderColor: '#fee2e2' }}
                    >
                        <IconImage name="refresh-cw" alt="tentar novamente" size={14} fallback={<RefreshCw size={14} />} />
                        Tentar Novamente
                    </button>
                </div>
            )}

            {status === 'loaded' && imageUrl && (
                <div className="relative w-full h-full fade-in">
                    <img src={imageUrl} alt="AI Generated Illustration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                         <span className="badge" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            Gerado por Gemini
                         </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIIllustration;