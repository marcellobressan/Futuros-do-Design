import React from 'react';
import { ArrowRight, Zap, Layers, Globe, Cpu, Users, Eye, Mic, ExternalLink, Headphones } from 'lucide-react';
import { AppView } from '../types';
import { HERO_IMAGE_URL } from '../constants';

interface StoryBoardProps {
  onNavigate: (view: AppView) => void;
}

const StoryBoard: React.FC<StoryBoardProps> = ({ onNavigate }) => {
  return (
    <div className="h-full overflow-y-auto bg-cesar-off-white text-cesar-gray scroll-smooth">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden bg-cesar-off-white">
        {/* Decorative Circles */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
            
            <div className="space-y-8 text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold tracking-widest text-cesar-orange uppercase mb-4">
                    CESAR School 2025 • Teoria e Futuro do Design
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-cesar-black tracking-tight leading-[1.1]">
                    Explore os <br/>
                    <span className="text-cesar-orange">Futuros do Design</span>
                </h1>
                <p className="text-lg md:text-xl text-cesar-gray/80 max-w-xl leading-relaxed font-light">
                    Um laboratório de imaginação, crítica e criação. Navegue por fenômenos, cenários e ferramentas criadas para um mundo em constante transformação.
                </p>
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button 
                    onClick={() => onNavigate(AppView.CHAT)}
                    className="px-8 py-4 bg-cesar-orange text-white rounded-xl font-bold hover:bg-cesar-orange-deep transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group"
                    >
                    Conversar com o Agente
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                    onClick={() => onNavigate(AppView.KNOWLEDGE)}
                    className="px-8 py-4 bg-white border border-gray-200 text-cesar-black rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                    Ver Cenários
                    </button>
                </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-200 to-transparent rounded-[2.5rem] blur-xl opacity-50"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 bg-white">
                    <img 
                      src={HERO_IMAGE_URL} 
                      alt="Futuros do Design Hero" 
                      className="w-full h-auto object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
            </div>

        </div>
      </section>

      {/* 2. Sobre e Contexto */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-cesar-black tracking-tight">
              Por que estudar <br/>os futuros do design?
            </h2>
            <p className="text-cesar-gray text-lg leading-relaxed">
              O design já não opera mais apenas sobre “problemas a serem resolvidos”. Ele atua em ecologias vastas, lidando com incertezas, ambiguidades e paradoxos.
            </p>
            <ul className="space-y-4 pt-2">
              {[
                "Lidar com incertezas e choques sistêmicos",
                "Tencionar narrativas dominantes de tecnologia",
                "Preparar habilidades para transições profundas",
                "Criar ferramentas de agência e adaptação"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-cesar-gray font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-cesar-orange"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cesar-off-white p-8 md:p-12 rounded-3xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-cesar-black">
              <Users className="text-cesar-orange" />
              A Disciplina
            </h3>
            <p className="text-cesar-gray mb-8">
              Estudantes do 6º período de Design conduziram um processo investigativo profundo:
            </p>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-center">
                <span className="text-[10px] font-black text-cesar-orange uppercase bg-orange-50 px-2 py-1 rounded">Fase 1</span>
                <p className="font-bold text-cesar-black text-sm">Leitura crítica do pensamento emergente</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-center">
                <span className="text-[10px] font-black text-cesar-orange uppercase bg-orange-50 px-2 py-1 rounded">Fase 2</span>
                <p className="font-bold text-cesar-black text-sm">Prospecção de futuros plausíveis (Cenários)</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-center">
                <span className="text-[10px] font-black text-cesar-orange uppercase bg-orange-50 px-2 py-1 rounded">Fase 3</span>
                <p className="font-bold text-cesar-black text-sm">Criação de ferramentas (Vibe Coding)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metodologia Grid */}
      <section className="py-24 px-6 bg-cesar-off-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-cesar-black mb-4 tracking-tight">Nossa Metodologia</h2>
          <p className="text-cesar-neutral max-w-2xl mx-auto text-lg">
            Do debate teórico à prototipagem de futuros, utilizamos um mix de ferramentas de foresight e design estratégico.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Component */}
          {[
            { icon: Users, title: 'Strateegia', desc: 'Debates estruturados e divergências produtivas sobre a vanguarda do design contemporâneo.', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: Eye, title: 'Kori & Varredura', desc: 'Levantamento de sinais fracos e motores de mudança em horizontes de 3, 7 e 15 anos.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
            { icon: Zap, title: 'Radar dos 3Cs', desc: 'Classificação dos fenômenos em Caos, Complexidade e Contradições da Pós-Normalidade.', color: 'text-red-500', bg: 'bg-red-50' },
            { icon: Layers, title: 'CLA', desc: 'Causal Layered Analysis: explorando do sintoma (Litany) ao Mito e Metáfora profunda.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: Globe, title: 'Cenários de Dator', desc: 'Arquétipos de futuro: Crescimento, Colapso, Disciplina e Transformação.', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Cpu, title: 'Vibe Coding', desc: 'Criação de ferramentas e protocolos sensíveis ao contexto futuro.', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.bg} ${item.color}`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-cesar-black mb-3">{item.title}</h3>
              <p className="text-sm text-cesar-gray leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Produção Intelectual */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-cesar-black mb-12 text-center tracking-tight">Produção Intelectual & Criativa</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Esquerda: Strateegia */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-cesar-black mb-2">
                 <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                   <Mic size={24} />
                 </div>
                 <h3 className="text-2xl font-bold">Debates Estruturados</h3>
              </div>
              <p className="text-cesar-gray leading-relaxed">
                As turmas A e B participaram de rodadas de debate na plataforma Strateegia, analisando e confrontando visões de autores da vanguarda do design contemporâneo.
              </p>
              
              <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                 <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-3">Temas Principais</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Pós-normalidade', 'Design orientado por IA', 'Ontologias', 'Human-machine teaming', 'Ética e Afeto'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold bg-white text-indigo-600 px-2 py-1 rounded border border-indigo-100">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <a 
                  href="https://app.strateegia.digital/dashboard/public-link/boyoaM" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl transition-colors group font-bold text-sm"
                >
                  <span className="">Turma A</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                </a>
                <a 
                  href="https://app.strateegia.digital/dashboard/public-link/afrnxv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-xl transition-colors group font-bold text-sm"
                >
                   <span className="">Turma B</span>
                   <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                </a>
              </div>
            </div>

            {/* Direita: Podcasts */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-cesar-black mb-2">
                 <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                   <Headphones size={24} />
                 </div>
                 <h3 className="text-2xl font-bold">Podcasts</h3>
              </div>
              <p className="text-cesar-gray leading-relaxed">
                Como síntese criativa, cada turma produziu um podcast que capturou suas tensões, esperanças e provocações sobre a era da inteligência artificial.
              </p>

              <div className="space-y-4 pt-2">
                {/* Podcast Card A */}
                <a 
                  href="https://open.spotify.com/show/5jdYWrY0SbEHk1OcN6qt4l?si=d6b357d69efc4b0c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white border border-gray-200 hover:border-emerald-200 rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-cesar-black group-hover:text-emerald-600 transition-colors">IAgora Designers?</h4>
                      <p className="text-xs font-bold text-cesar-neutral mt-1 uppercase">Turma A • Spotify</p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </a>

                {/* Podcast Card B */}
                <a 
                  href="https://open.spotify.com/show/6SIZ5HFIib1UdSDTfxetNz?si=67f5f91e6a014d2b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white border border-gray-200 hover:border-emerald-200 rounded-xl p-5 transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-cesar-black group-hover:text-emerald-600 transition-colors">PodIA ser design?</h4>
                      <p className="text-xs font-bold text-cesar-neutral mt-1 uppercase">Turma B • Spotify</p>
                    </div>
                    <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Chamada Final */}
      <section className="py-32 px-6 bg-cesar-off-white">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-12 md:p-16 border border-gray-100 shadow-xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-cesar-black tracking-tight leading-tight">
            O futuro não é um lugar onde vamos,<br/> é um lugar que <span className="text-cesar-orange">criamos</span>.
          </h2>
          <p className="text-lg text-cesar-gray mb-10 max-w-2xl mx-auto">
            Explore os cenários, cadastre suas soluções e contribua para o repositório vivo da disciplina.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button 
                onClick={() => onNavigate(AppView.CHAT)}
                className="px-6 py-4 bg-cesar-orange hover:bg-cesar-orange-deep text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
             >
                Explorar com IA
             </button>
             <button 
                onClick={() => onNavigate(AppView.SOLUTIONS)}
                className="px-6 py-4 bg-white hover:bg-gray-50 text-cesar-black border border-gray-200 rounded-xl font-bold transition-colors"
             >
                Ver Soluções
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-white text-center">
        <p className="text-xs font-bold text-cesar-neutral uppercase tracking-widest">
          © 2025 CESAR School • Disciplina Teoria e Futuro do Design
        </p>
      </footer>
    </div>
  );
};

export default StoryBoard;