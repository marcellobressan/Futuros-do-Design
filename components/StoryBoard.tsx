import React from 'react';
import { ArrowRight, Zap, Layers, Globe, Cpu, Users, Eye, Mic, ExternalLink, Headphones } from 'lucide-react';
import { AppView } from '../types';
import { HERO_IMAGE_URL } from '../constants';

interface StoryBoardProps {
  onNavigate: (view: AppView) => void;
}

const StoryBoard: React.FC<StoryBoardProps> = ({ onNavigate }) => {
  
  const sectionStyle: React.CSSProperties = { padding: '6rem 1.5rem' };
  const containerStyle: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto' };

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: 'var(--c-bg-page)' }}>
      
      {/* 1. Hero Section */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2rem' }}>
        {/* Decorative Circles */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'rgba(255,96,2,0.05)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'rgba(0,0,0,0.02)', borderRadius: '50%', filter: 'blur(80px)' }}></div>

        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            
            <div className="flex flex-col gap-6">
                <div style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '99px', background: '#fff7ed', border: '1px solid #ffedd5', color: 'var(--c-orange)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CESAR School 2025 • Teoria e Futuro do Design
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--c-black)', lineHeight: 1.1 }}>
                    Explore os <br/>
                    <span style={{ color: 'var(--c-orange)' }}>Futuros do Design</span>
                </h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--c-gray)', lineHeight: 1.6, fontWeight: 300 }}>
                    Um laboratório de imaginação, crítica e criação. Navegue por fenômenos, cenários e ferramentas criadas para um mundo em constante transformação.
                </p>
                <div className="flex gap-4 pt-2">
                    <button 
                    onClick={() => onNavigate(AppView.CHAT)}
                    className="btn btn-primary"
                    style={{ 
                        padding: '1rem 2rem', 
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(255, 96, 2, 0.15)'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(255, 96, 2, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(255, 96, 2, 0.15)';
                    }}
                    title="Converse com nosso assistente IA para explorar ideias e registrar soluções"
                    >
                    ✨ Conversar com o Agente
                    <ArrowRight size={20} />
                    </button>
                    <button 
                    onClick={() => onNavigate(AppView.KNOWLEDGE)}
                    className="btn btn-secondary"
                    style={{ 
                        padding: '1rem 2rem', 
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        border: '2px solid var(--c-black)'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--c-black)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--c-black)';
                    }}
                    title="Explore cenários e arquétipos do projeto"
                    >
                    📚 Ver Cenários
                    </button>
                </div>
            </div>

            {/* Hero Visual */}
            <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', transform: 'rotate(1deg)', backgroundColor: 'white' }}>
                    <img 
                      src={HERO_IMAGE_URL} 
                      alt="Futuros do Design Hero" 
                      style={{ width: '100%', height: 'auto', display: 'block' }} 
                    />
                </div>
            </div>

        </div>
      </section>

      {/* 2. Sobre e Contexto */}
      <section style={{ ...sectionStyle, backgroundColor: 'white', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-extrabold text-black">
              Por que estudar <br/>os futuros do design?
            </h2>
            <p className="text-lg text-gray">
              O design já não opera mais apenas sobre “problemas a serem resolvidos”. Ele atua em ecologias vastas, lidando com incertezas, ambiguidades e paradoxos.
            </p>
            <ul className="flex flex-col gap-3 pt-2">
              {[
                { icon: "⚡", text: "Lidar com incertezas e choques sistêmicos" },
                { icon: "🔊", text: "Tencionar narrativas dominantes de tecnologia" },
                { icon: "🎯", text: "Preparar habilidades para transições profundas" },
                { icon: "🛠️", text: "Criar ferramentas de agência e adaptação" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium hover:translate-x-1 transition-transform" title={item.text}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ color: 'var(--c-gray)' }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ backgroundColor: '#f9fafb', border: '1px solid #f3f4f6' }}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-black">
              <Users className="text-orange" />
              A Disciplina
            </h3>
            <p className="text-gray mb-8">
              Estudantes do 6º período de Design conduziram um processo investigativo profundo:
            </p>
            <div className="flex flex-col gap-4">
              {[
                  { phase: 'Fase 1', text: 'Leitura crítica do pensamento emergente' },
                  { phase: 'Fase 2', text: 'Prospecção de futuros plausíveis (Cenários)' },
                  { phase: 'Fase 3', text: 'Criação de ferramentas (Vibe Coding)' }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200">
                    <span className="badge" style={{ backgroundColor: '#fff7ed', color: '#ff6002' }}>{step.phase}</span>
                    <p className="font-bold text-sm text-black">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metodologia Grid */}
      <section style={{ ...sectionStyle }}>
        <div style={{ ...containerStyle, textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-3xl font-extrabold text-black mb-4">Nossa Metodologia</h2>
          <p className="text-lg text-neutral" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Do debate teórico à prototipagem de futuros, utilizamos um mix de ferramentas de foresight e design estratégico.
          </p>
        </div>

        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: Users, title: 'Strateegia', desc: 'Debates estruturados e divergências produtivas.', color: '#9333ea', bg: '#f3e8ff' },
            { icon: Eye, title: 'Kori & Varredura', desc: 'Sinais fracos e motores de mudança (3, 7, 15 anos).', color: '#0891b2', bg: '#ecfeff' },
            { icon: Zap, title: 'Radar dos 3Cs', desc: 'Caos, Complexidade e Contradições da Pós-Normalidade.', color: '#ef4444', bg: '#fef2f2' },
            { icon: Layers, title: 'CLA', desc: 'Causal Layered Analysis: do sintoma ao mito.', color: '#059669', bg: '#ecfdf5' },
            { icon: Globe, title: 'Cenários de Dator', desc: 'Crescimento, Colapso, Disciplina e Transformação.', color: '#2563eb', bg: '#eff6ff' },
            { icon: Cpu, title: 'Vibe Coding', desc: 'Ferramentas e protocolos sensíveis ao contexto.', color: '#ca8a04', bg: '#fefce8' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card hover:shadow-lg transition-all">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', backgroundColor: item.bg, color: item.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                <p className="text-sm text-gray" style={{ lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Produção Intelectual */}
      <section style={{ ...sectionStyle, backgroundColor: 'white', borderTop: '1px solid var(--c-border)' }}>
        <div style={{ ...containerStyle }}>
          <h2 className="text-3xl font-extrabold text-black mb-12 text-center">Produção Intelectual & Criativa</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            
            {/* Esquerda: Strateegia */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-black mb-2">
                 <div style={{ padding: '0.5rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '8px' }}>
                   <Mic size={24} />
                 </div>
                 <h3 className="text-2xl font-bold">Debates Estruturados</h3>
              </div>
              <p className="text-gray">
                As turmas A e B participaram de rodadas de debate na plataforma Strateegia, analisando e confrontando visões de autores da vanguarda do design contemporâneo.
              </p>
              
              <div style={{ backgroundColor: '#eef2ff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e0e7ff' }}>
                 <h4 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#3730a3' }}>Temas Principais</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Pós-normalidade', 'Design orientado por IA', 'Ontologias', 'Human-machine teaming', 'Ética e Afeto'].map(tag => (
                      <span key={tag} className="badge" style={{ backgroundColor: 'white', color: '#4f46e5', border: '1px solid #e0e7ff' }}>
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4">
                <a href="https://app.strateegia.digital/dashboard/public-link/boyoaM" target="_blank" className="btn btn-secondary flex-1" style={{ fontSize: '0.875rem' }}>
                  Turma A <ExternalLink size={14} />
                </a>
                <a href="https://app.strateegia.digital/dashboard/public-link/afrnxv" target="_blank" className="btn btn-secondary flex-1" style={{ fontSize: '0.875rem' }}>
                   Turma B <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Direita: Podcasts */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-black mb-2">
                 <div style={{ padding: '0.5rem', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '8px' }}>
                   <Headphones size={24} />
                 </div>
                 <h3 className="text-2xl font-bold">Podcasts</h3>
              </div>
              <p className="text-gray">
                Como síntese criativa, cada turma produziu um podcast que capturou suas tensões, esperanças e provocações sobre a era da inteligência artificial.
              </p>

              <div className="flex flex-col gap-3">
                <a href="https://open.spotify.com/show/5jdYWrY0SbEHk1OcN6qt4l?si=d6b357d69efc4b0c" target="_blank" className="card flex justify-between items-center hover:shadow-md">
                    <div>
                      <h4 className="text-lg font-bold text-black">IAgora Designers?</h4>
                      <p className="text-xs font-bold text-neutral mt-1 uppercase">Turma A • Spotify</p>
                    </div>
                    <ExternalLink size={16} className="text-neutral" />
                </a>

                <a href="https://open.spotify.com/show/6SIZ5HFIib1UdSDTfxetNz?si=67f5f91e6a014d2b" target="_blank" className="card flex justify-between items-center hover:shadow-md">
                    <div>
                      <h4 className="text-lg font-bold text-black">PodIA ser design?</h4>
                      <p className="text-xs font-bold text-neutral mt-1 uppercase">Turma B • Spotify</p>
                    </div>
                    <ExternalLink size={16} className="text-neutral" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Chamada Final */}
      <section style={{ padding: '8rem 1.5rem', backgroundColor: 'var(--c-off-white)' }}>
        <div style={{ ...containerStyle, backgroundColor: 'white', padding: '4rem', borderRadius: '2rem', border: '1px solid var(--c-border)', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <h2 className="text-4xl font-extrabold text-black mb-6">
            O futuro não é um lugar onde vamos,<br/> é um lugar que <span className="text-orange">criamos</span>.
          </h2>
          <p className="text-lg text-gray mb-10" style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Explore os cenários, cadastre suas soluções e contribua para o repositório vivo da disciplina.
          </p>
          <div className="flex justify-center gap-4">
             <button onClick={() => onNavigate(AppView.CHAT)} className="btn btn-primary">
                Explorar com IA
             </button>
             <button onClick={() => onNavigate(AppView.SOLUTIONS)} className="btn btn-secondary">
                Ver Soluções
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem', borderTop: '1px solid var(--c-border)', backgroundColor: 'white', textAlign: 'center' }}>
        <p className="text-xs font-bold text-neutral uppercase tracking-widest">
          © 2025 CESAR School • Disciplina Teoria e Futuro do Design
        </p>
      </footer>
    </div>
  );
};

export default StoryBoard;