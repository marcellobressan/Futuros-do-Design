import React from 'react';
import { Image } from 'lucide-react';
import IconImage from './IconImage';

interface AIIllustrationProps {
    prompt: string;
    imageUrl?: string;
    className?: string;
    aspectRatio?: 'square' | 'video';
}

const AIIllustration: React.FC<AIIllustrationProps> = ({ prompt, imageUrl, className = '', aspectRatio = 'square' }) => {
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
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={prompt} 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                    }} 
                />
            ) : (
                <div className="text-center p-6">
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1rem auto'
                    }}>
                        <IconImage name="image" alt="ilustração" size={24} fallback={<Image className="text-neutral" size={24} />} />
                    </div>
                    <p className="text-neutral" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        Ilustração do Cenário
                    </p>
                    <p className="text-neutral mt-2" style={{ fontSize: '10px', maxWidth: '200px', margin: '0.5rem auto 0 auto', opacity: 0.7 }}>
                        Placeholder para visualização futura
                    </p>
                </div>
            )}
        </div>
    );
};

export default AIIllustration;