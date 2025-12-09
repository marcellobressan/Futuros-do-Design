import React, { useState } from 'react';
import { generateIllustration } from '../services/geminiService';
import { Image, Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface AIIllustrationProps {
    prompt: string;
    className?: string;
    aspectRatio?: 'square' | 'video';
}

const AIIllustration: React.FC<AIIllustrationProps> = ({ prompt, className = '', aspectRatio = 'square' }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        setStatus('loading');
        try {
            const url = await generateIllustration(prompt);
            setImageUrl(url);
            setStatus('loaded');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className={`relative overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center group ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'} rounded-2xl ${className}`}>
            
            {status === 'idle' && (
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Image className="text-cesar-neutral" size={24} />
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleGenerate();
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-cesar-orange text-sm font-bold rounded-full hover:bg-cesar-orange hover:text-white transition-all shadow-sm mx-auto"
                    >
                        <Sparkles size={16} />
                        Visualizar com IA
                    </button>
                    <p className="text-[10px] text-cesar-neutral mt-3 max-w-[200px] mx-auto leading-tight">
                        Gere uma ilustração exclusiva deste cenário usando o modelo Nano do Gemini.
                    </p>
                </div>
            )}

            {status === 'loading' && (
                <div className="flex flex-col items-center justify-center text-cesar-orange animate-pulse">
                    <Loader2 size={32} className="animate-spin mb-3" />
                    <span className="text-xs font-bold uppercase tracking-widest">Criando Arte...</span>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center p-4">
                    <p className="text-xs text-red-500 font-bold mb-3">Falha na geração</p>
                    <button 
                        onClick={handleGenerate}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <RefreshCw size={14} />
                        Tentar Novamente
                    </button>
                </div>
            )}

            {status === 'loaded' && imageUrl && (
                <div className="relative w-full h-full">
                    <img src={imageUrl} alt="AI Generated Illustration" className="w-full h-full object-cover animate-in fade-in duration-700" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded border border-white/20">
                            Gerado por Gemini
                         </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIIllustration;