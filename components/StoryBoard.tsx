import React from 'react';
import { ArrowRight, Zap, Layers, Globe, Cpu, Users, Eye, Mic, ExternalLink, Headphones } from 'lucide-react';
import { AppView } from '../types';

interface StoryBoardProps {
  onNavigate: (view: AppView) => void;
}

const StoryBoard: React.FC<StoryBoardProps> = ({ onNavigate }) => {
  return (
    <div className="h-full overflow-y-auto bg-slate-950 text-slate-100 scroll-smooth">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-4">
            CESAR School 2025 • Teoria e Futuro do Design
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] leading-tight text-white">
            Explore os <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Futuros do Design</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Um laboratório de imaginação, crítica e criação. Navegue por fenômenos, cenários e ferramentas criadas para um mundo em constante transformação.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={() => onNavigate(AppView.CHAT)}
              className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2 group"
            >
              Conversar com o Agente
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate(AppView.KNOWLEDGE)}
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors backdrop-blur-sm"
            >
              Ver Cenários
            </button>
          </div>
        </div>
      </section>

      {/* 2. Sobre e Contexto */}
      <section className="py-24 px-6 bg-slate-950 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
              Por que estudar <br/>os futuros do design?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              O design já não opera mais apenas sobre “problemas a serem resolvidos”. Ele atua em ecologias vastas, lidando com incertezas, ambiguidades e paradoxos.
            </p>
            <ul className="space-y-4">
              {[
                "Lidar com incertezas e choques sistêmicos",
                "Tencionar narrativas dominantes de tecnologia",
                "Preparar habilidades para transições profundas",
                "Criar ferramentas de agência e adaptação"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-cyan-400" />
              A Disciplina
            </h3>
            <p className="text-slate-400 mb-6">
              Estudantes do 6º período de Design conduziram um processo investigativo profundo:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700/50">
                <span className="text-xs font-bold text-purple-400 uppercase">Fase 1</span>
                <p className="font-medium text-slate-200">Leitura crítica do pensamento emergente</p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700/50">
                <span className="text-xs font-bold text-cyan-400 uppercase">Fase 2</span>
                <p className="font-medium text-slate-200">Prospecção de futuros plausíveis (Cenários)</p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700/50">
                <span className="text-xs font-bold text-emerald-400 uppercase">Fase 3</span>
                <p className="font-medium text-slate-200">Criação de ferramentas (Vibe Coding)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metodologia Grid */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">Nossa Metodologia</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Do debate teórico à prototipagem de futuros, utilizamos um mix de ferramentas de foresight e design estratégico.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Strateegia</h3>
            <p className="text-sm text-slate-400">
              Debates estruturados e divergências produtivas sobre a vanguarda do design contemporâneo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <Eye size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Kori & Varredura</h3>
            <p className="text-sm text-slate-400">
              Levantamento de sinais fracos e motores de mudança em horizontes de 3, 7 e 15 anos.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-red-400 group-hover:text-red-300 transition-colors">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Radar dos 3Cs</h3>
            <p className="text-sm text-slate-400">
              Classificação dos fenômenos em Caos, Complexidade e Contradições da Pós-Normalidade.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors">
              <Layers size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">CLA</h3>
            <p className="text-sm text-slate-400">
              Causal Layered Analysis: explorando do sintoma (Litany) ao Mito e Metáfora profunda.
            </p>
          </div>

           {/* Card 5 */}
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
              <Globe size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cenários de Dator</h3>
            <p className="text-sm text-slate-400">
              Arquétipos de futuro: Crescimento, Colapso, Disciplina e Transformação.
            </p>
          </div>

           {/* Card 6 */}
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Vibe Coding</h3>
            <p className="text-sm text-slate-400">
              Criação de ferramentas e protocolos sensíveis ao contexto futuro.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Produção Intelectual (NEW) */}
      <section className="py-24 px-6 bg-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-12 text-center">Produção Intelectual & Criativa</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Esquerda: Strateegia */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-indigo-400 mb-2">
                 <Mic size={28} />
                 <h3 className="text-2xl font-bold text-white">Debates Estruturados</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                As turmas A e B participaram de rodadas de debate na plataforma Strateegia, analisando e confrontando visões de autores da vanguarda do design contemporâneo.
              </p>
              
              <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-800">
                 <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide mb-3">Temas Principais</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Pós-normalidade', 'Design orientado por IA', 'Ontologias', 'Human-machine teaming', 'Ética e Afeto'].map(tag => (
                      <span key={tag} className="text-xs bg-indigo-950 text-indigo-300 px-2 py-1 rounded border border-indigo-900/50">
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
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition-colors group"
                >
                  <span className="font-semibold">Turma A</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                </a>
                <a 
                  href="https://app.strateegia.digital/dashboard/public-link/afrnxv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition-colors group"
                >
                   <span className="font-semibold">Turma B</span>
                   <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                </a>
              </div>
            </div>

            {/* Direita: Podcasts */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-emerald-400 mb-2">
                 <Headphones size={28} />
                 <h3 className="text-2xl font-bold text-white">Podcasts</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Como síntese criativa, cada turma produziu um podcast que capturou suas tensões, esperanças e provocações sobre a era da inteligência artificial.
              </p>

              <div className="space-y-4 pt-2">
                {/* Podcast Card A */}
                <a 
                  href="https://open.spotify.com/show/5jdYWrY0SbEHk1OcN6qt4l?si=d6b357d69efc4b0c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all hover:bg-slate-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">IAgora Designers?</h4>
                      <p className="text-sm text-slate-500 mt-1">Turma A • Spotify</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </a>

                {/* Podcast Card B */}
                <a 
                  href="https://open.spotify.com/show/6SIZ5HFIib1UdSDTfxetNz?si=67f5f91e6a014d2b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all hover:bg-slate-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">PodIA ser design?</h4>
                      <p className="text-sm text-slate-500 mt-1">Turma B • Spotify</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Chamada Final */}
      <section className="py-32 px-6 bg-slate-950">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-3xl p-8 md:p-16 border border-slate-800 text-center backdrop-blur-sm">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-white">
            O futuro não é um lugar onde vamos,<br/> é um lugar que criamos.
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Explore os cenários, cadastre suas soluções e contribua para o repositório vivo da disciplina.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button 
                onClick={() => onNavigate(AppView.CHAT)}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-900/20"
             >
                Explorar com IA
             </button>
             <button 
                onClick={() => onNavigate(AppView.SOLUTIONS)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-lg font-bold transition-colors"
             >
                Ver Soluções
             </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 bg-slate-950 text-center">
        <p className="text-xs text-slate-600">
          © 2025 CESAR School • Disciplina Teoria e Futuro do Design
        </p>
      </footer>
    </div>
  );
};

export default StoryBoard;