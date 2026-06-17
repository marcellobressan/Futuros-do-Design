import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, Zap, Layers, Sparkles, BookOpen, Compass, ChevronDown } from 'lucide-react';
import IconImage from './IconImage';
import SteepleAnalysis from './SteepleAnalysis';
import { AppView } from '../types';

interface ManifestoMetodoProps {
  onNavigate: (view: AppView) => void;
}

interface SteepleCategory {
  label: string;
  shortLabel: string;
  themes: string;
  phenomena: Array<{ title: string; description: string }>;
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

      {/* Navigation Bar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255, 96, 2, 0.14)', padding: '1rem 1.5rem', backdropFilter: 'blur(20px)', backgroundColor: 'rgba(6, 6, 10, 0.92)' }}>
        <div style={{ ...containerStyle, display: 'flex', gap: '2rem', overflowX: 'auto', scrollBehavior: 'smooth' }}>
          <a href="#hero" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(237,232,223,0.45)', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-orange-cesar)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,232,223,0.45)')}>Manifesto</a>
          <a href="#por-que" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(237,232,223,0.45)', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-orange-cesar)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,232,223,0.45)')}>Por Que?</a>
          <a href="#como-funciona" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(237,232,223,0.45)', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-orange-cesar)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,232,223,0.45)')}>Como Funciona</a>
          <a href="#prospeccao" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(237,232,223,0.45)', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-orange-cesar)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,232,223,0.45)')}>Prospecção</a>
          <a href="#podcasts" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--c-orange-cesar)', textDecoration: 'none', whiteSpace: 'nowrap', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s ease', textShadow: '0 0 12px rgba(255,96,2,0.4)' }}>Podcasts</a>
        </div>
      </nav>
      
      {/* 1. Hero - Manifesto */}
      <section id="hero" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2rem' }}>
        {/* Decorative neon circles */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(255,96,2,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,119,34,0.08) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}></div>

        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="flex flex-col gap-6">
            <div style={{ display: 'inline-block', padding: '0.35rem 0.9rem', borderRadius: '4px', background: 'rgba(255,96,2,0.1)', border: '1px solid rgba(255,96,2,0.3)', color: 'var(--c-orange-cesar)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 auto' }}>
              MANIFESTO &amp; MÉTODO
            </div>
            
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--c-text-primary)', lineHeight: 1.1, margin: '0 auto', maxWidth: '800px' }}>
              O futuro não é um lugar <br/>onde vamos,<br/>
              <span style={{ color: 'var(--c-orange-cesar)', textShadow: '0 0 40px rgba(255,96,2,0.35)' }}>é um lugar que criamos</span>
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: 'rgba(237,232,223,0.62)', lineHeight: 1.6, fontWeight: 300, margin: '0 auto', maxWidth: '700px' }}>
              Este é um laboratório de imaginação, crítica e criação onde você vai explorar os futuros possíveis do design em um mundo em constante transformação.
            </p>
            
            <div className="flex gap-4 pt-4 justify-center flex-wrap">
              <button 
                onClick={() => onNavigate(AppView.KNOWLEDGE)}
                className="btn btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1rem' }}
              >
                Explorar Cenários
                <IconImage name="arrow-right" alt="seguir" size={20} fallback={<ArrowRight size={20} />} />
              </button>
              <button 
                onClick={() => onNavigate(AppView.CHAT)}
                className="btn btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '0.85rem', borderColor: 'rgba(237,232,223,0.25)', color: 'rgba(237,232,223,0.75)' }}
              >
                Conversar com IA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Por que Futuros do Design? */}
      <section id="por-que" style={{ ...sectionStyle, backgroundColor: 'rgba(10,10,16,0.6)', borderTop: '1px solid rgba(255,96,2,0.1)', borderBottom: '1px solid rgba(255,96,2,0.1)' }}>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--c-text-primary)' }}>
              Por que estudar<br/>os futuros do design?
            </h2>
            <p className="text-lg" style={{ color: 'rgba(237,232,223,0.62)' }}>
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
                  <span style={{ color: 'rgba(237,232,223,0.62)' }}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ border: '1px solid rgba(255,96,2,0.14)' }}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--c-text-primary)' }}>
              <IconImage name="users" alt="disciplina" size={20} fallback={<Users className="text-orange" />} />
              A Disciplina
            </h3>
            <p style={{ color: 'rgba(237,232,223,0.55)', marginBottom: '2rem' }}>
              Estudantes do 6º período de Design conduziram um processo investigativo profundo:
            </p>
            <div className="flex flex-col gap-4">
              {[
                { phase: 'Fase 1', text: 'Leitura crítica do pensamento emergente' },
                { phase: 'Fase 2', text: 'Prospecção de futuros plausíveis (Cenários)' },
                { phase: 'Fase 3', text: 'Criação de ferramentas (Vibe Coding)' }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-4" style={{ borderRadius: '8px', border: '1px solid rgba(255,96,2,0.12)', backgroundColor: 'rgba(255,96,2,0.05)' }}>
                  <span className="badge" style={{ backgroundColor: 'rgba(255,96,2,0.12)', color: 'var(--c-orange-cesar)', border: '1px solid rgba(255,96,2,0.3)', borderRadius: '4px' }}>{step.phase}</span>
                  <p className="font-bold text-sm" style={{ color: 'var(--c-text-primary)' }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metodologia (Infográfico) */}
      <section id="como-funciona" style={{ ...sectionStyle }}>
        <div style={{ ...containerStyle, textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--c-text-primary)' }}>Como Funciona?</h2>
          <p className="text-lg" style={{ color: 'rgba(237,232,223,0.62)', maxWidth: '760px', margin: '0 auto 2.5rem auto' }}>
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
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: `${step.color}1A`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={`/images/manifesto/step-${i+1}.png`}
                        alt={`${step.title} illustration`}
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        onLoad={(e) => { /* image loaded — keep it visible */ }}
                      />
                      {/* If image is missing the icon fallback can remain visible via CSS/DOM — we keep the Icon component as a hidden fallback for screen-readers */}
                      <span style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden>
                        <Icon size={28} />
                      </span>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: step.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{i+1}</div>
                        <h4 className="text-lg font-bold" style={{ margin: 0, color: 'var(--c-text-primary)' }}>{step.title}</h4>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(237,232,223,0.55)' }}>{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Connectors: horizontal (desktop) + vertical (mobile) */}
                {i < arr.length - 1 && (
                  <>
                    <svg aria-hidden className="connector-h" style={{ position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '24%', minWidth: '100px', height: '28px', overflow: 'visible' }} viewBox="0 0 120 28" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="4" y1="14" x2="96" y2="14" stroke="rgba(255,96,2,0.25)" strokeWidth="1.5" strokeOpacity="0.9" strokeLinecap="round" />
                      <polyline points="92,6 108,14 92,22" fill="none" stroke="rgba(255,96,2,0.4)" strokeWidth="1.5" strokeOpacity="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div aria-hidden className="connector-v" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Contexto - Prospecção */}
      <section id="prospeccao" style={{ ...sectionStyle, backgroundColor: 'rgba(10,10,16,0.55)', position: 'relative', overflow: 'hidden' }}>
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
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--c-text-primary)' }}>Prospectar Futuros na Pós-Normalidade</h2>
            <p className="text-lg" style={{ color: 'rgba(237,232,223,0.62)', maxWidth: '760px', margin: '0 auto' }}>
              Entendemos que o mundo mudou de forma irreversível. Aqui estão os princípios que guiam nosso trabalho — ilustrados com uma estética inspirada em ondas para sugerir varredura, marés e movimentos sistêmicos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
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
              <div key={i} className="card" style={{ border: '1px solid rgba(255,96,2,0.12)', position: 'relative', zIndex: 3 }}>
                <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="prospect-placeholder" style={{ fontSize: '2.5rem' }}>{item.icon}</div>
                  <img
                    src={`/images/manifesto/prospect-${i+1}.png`}
                    alt={`${item.title} illustration`}
                    style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', position: 'absolute', top: '4px', left: '4px' }}
                    onLoad={(e) => { const prev = e.currentTarget.previousElementSibling as HTMLElement; if (prev) prev.style.display = 'none'; }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--c-text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'rgba(237,232,223,0.55)', fontSize: '0.9rem' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Podcasts Section */}
      <section id="podcasts" style={{ padding: '6rem 1.5rem', backgroundColor: 'transparent', borderTop: '1px solid rgba(255,96,2,0.1)' }}>
        <div style={{ ...containerStyle }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: 'var(--c-text-primary)' }}>Podcasts</h2>
            <p className="text-lg" style={{ color: 'rgba(237,232,223,0.62)', maxWidth: '760px', margin: '0 auto', textAlign: 'left' }}>
              Podcasts-ensaio realizados com estudantes da CESAR School em 7 episódios, mediados por duas IAs da plataforma Strateegia: <strong>CESAR</strong> e <strong>Nix</strong>. A cada conversa, investigamos o design como prática situada e em transformação — do metaprojeto e do design sistêmico aos “wicked problems”, passando por teorias decoloniais, Teoria Crítica e os impactos da IA generativa em UI/UX. Sem tecnossoluções fáceis, o programa debate ética, contexto e colaboração interdisciplinar para reimaginar como projetamos, ensinamos e decidimos.
            </p>
            <p className="text-sm" style={{ color: 'rgba(237,232,223,0.42)', maxWidth: '760px', margin: '0.75rem auto 0', textAlign: 'left', fontWeight: 600 }}>
              Produção: CESAR School • NIX Lab • Strateegia.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>
            {/* Podcast 1: podIA ser design? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 className="text-xl font-bold" style={{ color: 'var(--c-text-primary)' }}>podIA ser design?</h3>
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/show/6SIZ5HFIib1UdSDTfxetNz?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            {/* Podcast 2: IAgora, Designers? */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 className="text-xl font-bold" style={{ color: 'var(--c-text-primary)' }}>IAgora, Designers?</h3>
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/show/5jdYWrY0SbEHk1OcN6qt4l?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            {/* Podcast 3: Bressando */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 className="text-xl font-bold" style={{ color: 'var(--c-text-primary)' }}>Bressando</h3>
              <p className="text-sm" style={{ color: 'rgba(237,232,223,0.62)', lineHeight: '1.6' }}>
                Podcast produzido por estudantes da graduação em Design da CESAR School, vinculado ao NIX – Laboratório de Design de Narrativas, Imaginação e Experiência. A produção articula um debate sobre autores contemporâneos, decolonialidade e práticas emergentes para repensar o design em suas dimensões teóricas e metodológicas. O programa é parte integrante da disciplina Teoria e Futuro do Design, desenvolvida no ecossistema de inovação do Porto Digital, em Recife. O material oferece uma perspectiva crítica voltada a estudantes, pesquisadores e profissionais da área criativa.
              </p>
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/show/033zVQBs38AwAIkX623A1R?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section style={{ padding: '8rem 1.5rem', backgroundColor: 'transparent' }}>
        <div style={{ ...containerStyle, background: 'rgba(255,96,2,0.06)', border: '1px solid rgba(255,96,2,0.2)', padding: '4rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 0 60px rgba(255,96,2,0.08), 0 20px 60px rgba(0,0,0,0.5)' }}>
          <IconImage name="sparkles" alt="destaque" size={48} fallback={<Sparkles size={48} style={{ color: 'var(--c-orange-cesar)', margin: '0 auto 2rem' }} />} />
          <h2 className="text-4xl font-extrabold mb-6" style={{ color: 'var(--c-text-primary)' }}>
            Pronto para explorar?
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(237,232,223,0.6)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Navegue pelos cenários, contribua com suas soluções e participe de um repositório vivo de futuros possíveis.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button onClick={() => onNavigate(AppView.KNOWLEDGE)} className="btn btn-primary">
              📚 Explorar Cenários
            </button>
            <button onClick={() => onNavigate(AppView.CHAT)} className="btn btn-secondary" style={{ borderColor: 'rgba(237,232,223,0.2)', color: 'rgba(237,232,223,0.7)' }}>
              💬 Conversar com IA
            </button>
            <button onClick={() => onNavigate(AppView.DASHBOARD)} className="btn btn-secondary" style={{ borderColor: 'rgba(237,232,223,0.2)', color: 'rgba(237,232,223,0.7)' }}>
              📊 Ver Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem', borderTop: '1px solid rgba(255,96,2,0.1)', backgroundColor: 'transparent', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(237,232,223,0.3)' }}>
          © 2025 CESAR School • Disciplina Teoria e Futuro do Design
        </p>
      </footer>
    </div>
  );
};

export default ManifestoMetodo;
