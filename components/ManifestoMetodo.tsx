import React, { useEffect, useRef } from 'react';
import { ArrowRight, Users, Zap, Layers, Sparkles, BookOpen, Compass } from 'lucide-react';
import { AppView } from '../types';

interface ManifestoMetodoProps {
  onNavigate: (view: AppView) => void;
}

const ManifestoMetodo: React.FC<ManifestoMetodoProps> = ({ onNavigate }) => {
  const sectionStyle: React.CSSProperties = { padding: '6rem 1.5rem' };
  const containerStyle: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto' };

  const stepsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = stepsRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.inf-step')) as HTMLElement[];

    if (prefersReduced) {
      items.forEach(it => it.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.18 });

    items.forEach(it => observer.observe(it));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: 'var(--c-bg-page)' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .inf-step { will-change: transform, opacity; opacity: 0; transform: translateY(12px); }
        .inf-step.visible { animation: fadeUp 520ms ease var(--delay, 0ms) both; }
        /* Connectors: horizontal for desktop, vertical for mobile */
        .connector-h { display: block; }
        .connector-v { display: none; position: absolute; left: 50%; transform: translateX(-50%); bottom: -36px; width: 2px; height: 48px; background: var(--c-border); opacity: 0.85; border-radius: 2px; }
        .connector-v::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%); bottom: -6px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--c-border); }
        @media (max-width: 720px) {
          .connector-h { display: none !important; }
          .connector-v { display: block !important; }
          /* make steps stack nicely on mobile */
          .inf-step { width: 100% !important; min-width: auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .inf-step { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
      
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

      {/* 3. Metodologia (Infográfico) */}
      <section style={{ ...sectionStyle }}>
        <div style={{ ...containerStyle, textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="text-4xl font-extrabold text-black mb-4">Como Funciona?</h2>
          <p className="text-lg text-gray" style={{ maxWidth: '760px', margin: '0 auto 2.5rem auto' }}>
            Utilizamos a metodologia Kori para varredura de horizonte e análise estruturada de futuros. Abaixo um resumo em formato infográfico com o fluxo principal.
          </p>
        </div>

        <div ref={stepsRef} style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            {
              icon: Sparkles,
              title: 'Varredura de Horizonte',
              description: 'Mapeamos sinais fracos em horizontes 3 / 7 / 15 anos.' ,
              color: 'var(--c-orange)'
            },
            {
              icon: Layers,
              title: 'Análise Estruturada (CLA)',
              description: 'Exploramos camadas de causa, discurso e metáforas para cada fenômeno.',
              color: '#3b82f6'
            },
            {
              icon: BookOpen,
              title: 'Cenários Plausíveis',
              description: 'Construímos narrativas que ilustram futuros possíveis e suas implicações.',
              color: '#10b981'
            },
            {
              icon: Zap,
              title: 'Ferramentas Criativas',
              description: 'Desenvolvemos protótipos e ferramentas (ex.: Vibe Coding) para experimentar soluções.',
              color: '#f59e0b'
            }
          ].map((step, i, arr) => {
            const Icon = step.icon;
            return (
              <div key={i} className="inf-step" style={{ flex: '1 1 220px', minWidth: '220px', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', ['--delay' as any]: `${i * 160}ms` }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: `${step.color}1A`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
                      <Icon size={28} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: step.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{i+1}</div>
                        <h4 className="text-lg font-bold text-black" style={{ margin: 0 }}>{step.title}</h4>
                      </div>
                      <p className="text-neutral" style={{ margin: 0, fontSize: '0.95rem' }}>{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Connectors: horizontal (desktop) + vertical (mobile) */}
                {i < arr.length - 1 && (
                  <>
                    <svg aria-hidden className="connector-h" style={{ position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '24%', minWidth: '100px', height: '28px', overflow: 'visible' }} viewBox="0 0 120 28" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="4" y1="14" x2="96" y2="14" stroke="var(--c-border)" strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" />
                      <polyline points="92,6 108,14 92,22" fill="none" stroke="var(--c-border)" strokeWidth="2" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div aria-hidden className="connector-v" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Contexto - Prospecção (Inspirado em ondas + marcas d'água) */}
      <section style={{ ...sectionStyle, backgroundColor: '#f9fafb', position: 'relative', overflow: 'hidden' }}>
        {/* Wave background (SVG) */}
        <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '40%', pointerEvents: 'none', zIndex: 0 }}>
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="waveGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f9fafb" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d="M0,120 C150,200 350,40 600,80 C850,120 1050,40 1200,80 L1200,200 L0,200 Z" fill="url(#waveGrad)" />
            <path d="M0,140 C200,80 400,160 600,120 C800,80 1000,160 1200,120 L1200,200 L0,200 Z" fill="#ffffff" opacity="0.06" />
          </svg>
        </div>

        <div style={{ ...containerStyle, position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-4xl font-extrabold text-black mb-4">Prospectar na Pós-Normalidade</h2>
            <p className="text-lg text-gray" style={{ maxWidth: '760px', margin: '0 auto' }}>
              Entendemos que o mundo mudou de forma irreversível. Aqui estão os princípios que guiam nosso trabalho — ilustrados com uma estética inspirada em ondas para sugerir varredura, marés e movimentos sistêmicos.
            </p>
          </div>

          {/* Watermarks (words behind content) */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: '-6%', top: '10%', fontSize: '96px', color: '#0f172a', opacity: 0.03, transform: 'rotate(-12deg)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              complexidade
            </div>
            <div style={{ position: 'absolute', right: '-8%', top: '38%', fontSize: '120px', color: '#0f172a', opacity: 0.03, transform: 'rotate(8deg)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              caos
            </div>
            <div style={{ position: 'absolute', left: '10%', bottom: '-6%', fontSize: '110px', color: '#0f172a', opacity: 0.03, transform: 'rotate(-6deg)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              contradições
            </div>
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
              <div key={i} className="card" style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', position: 'relative', zIndex: 3 }}>
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
