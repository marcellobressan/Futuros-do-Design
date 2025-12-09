import React from 'react';
import { ArrowRight, Users, Zap, Layers, Sparkles, BookOpen, Compass } from 'lucide-react';
import { AppView } from '../types';

interface ManifestoMetodoProps {
  onNavigate: (view: AppView) => void;
}

const ManifestoMetodo: React.FC<ManifestoMetodoProps> = ({ onNavigate }) => {
  const sectionStyle: React.CSSProperties = { padding: '6rem 1.5rem' };
  const containerStyle: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto' };

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: 'var(--c-bg-page)' }}>
      
      {/* 1. Hero - Manifesto */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2rem' }}>
        {/* Decorative Circles */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'rgba(255,96,2,0.05)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'rgba(0,0,0,0.02)', borderRadius: '50%', filter: 'blur(80px)' }}></div>

        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="flex flex-col gap-6">
            <div style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '99px', background: '#fff7ed', border: '1px solid #ffedd5', color: 'var(--c-orange)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 auto' }}>
              MANIFESTO & MÉTODO
            </div>
            
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--c-black)', lineHeight: 1.1, margin: '0 auto', maxWidth: '800px' }}>
              O futuro não é um lugar <br/>onde vamos,<br/>
              <span style={{ color: 'var(--c-orange)' }}>é um lugar que criamos</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--c-gray)', lineHeight: 1.6, fontWeight: 300, margin: '0 auto', maxWidth: '700px' }}>
              Este é um laboratório de imaginação, crítica e criação onde você vai explorar os futuros possíveis do design em um mundo em constante transformação.
            </p>
            
            <div className="flex gap-4 pt-4 justify-center flex-wrap">
              <button 
                onClick={() => onNavigate(AppView.KNOWLEDGE)}
                className="btn btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1rem' }}
              >
                Explorar Cenários
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate(AppView.CHAT)}
                className="btn btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '1rem', border: '2px solid var(--c-black)' }}
              >
                Conversar com IA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Por que Futuros do Design? */}
      <section style={{ ...sectionStyle, backgroundColor: 'white', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-extrabold text-black">
              Por que estudar<br/>os futuros do design?
            </h2>
            <p className="text-lg text-gray">
              O design não opera mais apenas sobre "problemas a serem resolvidos". Ele atua em ecologias vastas, lidando com incertezas, ambiguidades e paradoxos.
            </p>
            <ul className="flex flex-col gap-3 pt-2">
              {[
                { icon: "⚡", text: "Lidar com incertezas e choques sistêmicos" },
                { icon: "🔊", text: "Tencionar narrativas dominantes de tecnologia" },
                { icon: "🎯", text: "Preparar habilidades para transições profundas" },
                { icon: "🛠️", text: "Criar ferramentas de agência e adaptação" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium hover:translate-x-1 transition-transform">
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

      {/* 3. Metodologia */}
      <section style={{ ...sectionStyle }}>
        <div style={{ ...containerStyle, textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-4xl font-extrabold text-black mb-6">Como Funciona?</h2>
          <p className="text-lg text-gray" style={{ maxWidth: '700px', margin: '0 auto 4rem auto' }}>
            Utilizamos a metodologia Kori para varredura de horizonte e análise estruturada de futuros.
          </p>
        </div>

        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            {
              icon: Sparkles,
              title: '🔍 Varredura de Horizonte',
              description: 'Organizamos fenômenos emergentes em 3, 7 e 15 anos, categorizando em Caos, Complexidade e Contradições.',
              color: 'var(--c-orange)'
            },
            {
              icon: Layers,
              title: '📊 Análise Estruturada (CLA)',
              description: 'Causal Layered Analysis aprofunda a compreensão das dinâmicas que sustentam cada cenário.',
              color: '#3b82f6'
            },
            {
              icon: BookOpen,
              title: '🎬 Cenários Plausíveis',
              description: 'Desenvolvemos narrativas futuras que exploram diferentes possibilidades e implicações.',
              color: '#10b981'
            },
            {
              icon: Zap,
              title: '🛠️ Ferramentas Criativas',
              description: 'Criamos recursos práticos como Vibe Coding para trazer os futuros para o presente.',
              color: '#f59e0b'
            }
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="card" style={{ border: `1px solid ${step.color}33`, transition: 'all 0.3s ease' }} 
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 24px ${step.color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: `${step.color}1A`, color: step.color, marginBottom: '1rem', display: 'inline-block' }}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
                <p className="text-gray">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Contexto - Prospecção */}
      <section style={{ ...sectionStyle, backgroundColor: '#f9fafb' }}>
        <div style={{ ...containerStyle }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-4xl font-extrabold text-black mb-4">Prospectar na Pós-Normalidade</h2>
            <p className="text-lg text-gray" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Entendemos que o mundo mudou de forma irreversível. Aqui estão os princípios que guiam nosso trabalho:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: 'Ecossistemas Instáveis',
                icon: '🌊',
                description: 'Sistemas sociotécnicos mudam rapidamente. Projetar requer compreender como essas dinâmicas evoluem e impactam pessoas e territórios.'
              },
              {
                title: 'Imaginar Alternativas',
                icon: '🧠',
                description: 'Cenários ajudam a escapar da dependência do presente, fortalecendo a criatividade, a criticidade e a responsabilidade ética.'
              },
              {
                title: 'Decisão no Presente',
                icon: '🎯',
                description: 'Reconhecer sinais fracos e antecipar riscos permite criar soluções mais robustas, adaptáveis e sensíveis às mudanças.'
              }
            ].map((item, i) => (
              <div key={i} className="card" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 className="text-lg font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      <section style={{ padding: '8rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ ...containerStyle, backgroundColor: 'var(--c-off-white)', padding: '4rem', borderRadius: '2rem', border: '1px solid var(--c-border)', textAlign: 'center' }}>
          <Sparkles size={48} style={{ color: 'var(--c-orange)', margin: '0 auto 2rem' }} />
          <h2 className="text-4xl font-extrabold text-black mb-6">
            Pronto para explorar?
          </h2>
          <p className="text-lg text-gray mb-10" style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Navegue pelos cenários, contribua com suas soluções e participe de um repositório vivo de futuros possíveis.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={() => onNavigate(AppView.KNOWLEDGE)} className="btn btn-primary">
              📚 Explorar Cenários
            </button>
            <button onClick={() => onNavigate(AppView.CHAT)} className="btn btn-secondary" style={{ border: '2px solid var(--c-black)' }}>
              💬 Conversar com IA
            </button>
            <button onClick={() => onNavigate(AppView.DASHBOARD)} className="btn btn-secondary" style={{ border: '2px solid var(--c-black)' }}>
              📊 Ver Dashboard
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

export default ManifestoMetodo;
