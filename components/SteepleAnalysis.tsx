import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SteepleCategory {
  label: string;
  shortLabel: string;
  themes: string;
  phenomena: Array<{ title: string; description: string }>;
}

export const STEEPLE_DATA: Record<string, SteepleCategory> = {
  social: {
    label: 'Social',
    shortLabel: 'S',
    themes: 'saúde mental, dissolução da realidade, juventudes, vínculos emocionais com IA, novas expressões identitárias.',
    phenomena: [
      { title: 'Psicose da IA', description: 'Interações intensas com agentes artificiais começam a desencadear ou reforçar sintomas psiquiátricos em pessoas vulneráveis, criando um novo campo de risco psicossocial.' },
      { title: 'IA como fronteira de crise na saúde mental', description: 'Chatbots que acolhem emocionalmente usuários podem tanto apoiar quanto agravar crises psicológicas, tornando-se uma nova ambivalência do cuidado digital.' },
      { title: 'Burnout digital e movimento no-tech da Geração Z', description: 'Jovens passam a rejeitar telas e sistemas hiperconectados como forma de recuperar agência e bem-estar diante da saturação tecnológica.' },
      { title: 'Distorção da realidade por excesso de mídia', description: 'A exposição constante a feeds e múltiplas narrativas digitais reduz a capacidade de discernir fatos, intensificando ansiedade e fragilidade cognitiva.' },
      { title: 'Labubu e o consumo emocional', description: 'Brinquedos colecionáveis tornam-se símbolos identitários que oferecem conforto, pertencimento e expressão emocional a jovens em um mundo instável.' },
      { title: 'Replika e companheiros emocionais artificiais', description: 'Pessoas formam laços afetivos reais com IAs empáticas, o que redefine o que entendemos como vínculo social e cuidado.' },
      { title: 'Wellness como escapismo político', description: 'Retraimento para práticas de bem-estar substitui o engajamento cívico, indicando uma fuga emocional diante de tensões sociais.' },
      { title: 'Ativismo como autoexpressão digital', description: 'A militância se desloca de movimentos organizados para estéticas pessoais que circulam em redes sociais, ampliando o engajamento, mas fragmentando a ação coletiva.' },
      { title: 'Inclusão LGBTQIAPN+ no setor de TIC', description: 'Profissionais LGBTQIAPN+ ganham visibilidade e espaço, impulsionando transformações culturais dentro das organizações.' }
    ]
  },
  technological: {
    label: 'Tecnológico',
    shortLabel: 'T',
    themes: 'IA generativa, automação, hiperpersonalização, ambientes inteligentes, novos materiais.',
    phenomena: [
      { title: 'Comunicação IA–IA e tsunami de conteúdo artificial', description: 'Sistemas começam a gerar, comentar e amplificar conteúdos entre si, criando ecossistemas de informação sintética que escapam ao controle humano.' },
      { title: 'Ressignificação das interfaces na pós-normalidade', description: 'A fronteira entre online e offline desaparece, tornando interfaces parte integral da percepção da realidade.' },
      { title: 'Impressão 3D de edifícios', description: 'Construções passam a ser automatizadas, reduzindo custos, desperdícios e possibilitando arquitetura adaptável.' },
      { title: 'Arquitetura de bem-estar baseada em dados', description: 'Edifícios monitoram e regulam condições ambientais em tempo real para maximizar saúde e conforto dos usuários.' },
      { title: 'Neurotecnologias preditivas', description: 'Sensores capazes de inferir estados emocionais preveem comportamentos humanos, levantando dilemas sobre privacidade psicológica.' },
      { title: 'Androids táteis e máquinas sencientes', description: 'Prototipações avançadas introduzem robôs capazes de interagir com sensorialidade e emoção simulada, tensionando o limite entre humano e máquina.' },
      { title: 'Óculos anti-propaganda', description: 'Dispositivos filtram anúncios no mundo físico, permitindo que indivíduos ocultem partes da realidade conforme sua preferência.' },
      { title: 'Opera Air e bem-estar digital', description: 'Navegadores passam a integrar funções terapêuticas para combater a saturação cognitiva da vida online.' },
      { title: 'Fabricação efêmera', description: 'Objetos são produzidos sob demanda, no momento e local exatos de uso, reduzindo cadeias logísticas tradicionais.' },
      { title: 'Fazendas verticais em prédios vazios', description: 'Tecnologias de automação transformam espaços ociosos em centros de produção alimentar local e sustentável.' }
    ]
  },
  economic_1: {
    label: 'Econômico',
    shortLabel: 'E¹',
    themes: 'novos modelos de consumo, descentralização econômica, impactos da automação.',
    phenomena: [
      { title: 'Economia emocional da Geração Z (Labubu)', description: 'Consumidores valorizam objetos que expressem autenticidade e afetividade, gerando mercados baseados em vínculo, não utilidade.' },
      { title: 'Moedas digitais comunitárias', description: 'Comunidades experimentam sistemas financeiros próprios, reduzindo dependência de instituições tradicionais.' },
      { title: 'Campanha "Pare de contratar humanos"', description: 'A retórica provocativa expõe o temor crescente de substituição de empregos pela IA, pressionando empresas e governos a repensar políticas laborais.' },
      { title: 'Cultivo urbano automatizado', description: 'A produção alimentar torna-se local e altamente eficiente, alterando cadeias de valor logísticas e reduzindo custos ambientais.' },
      { title: 'Turismo de bem-estar político', description: 'Empresas monetizam o estresse social, vendendo rotas de fuga emocional como produto premium.' },
      { title: 'Pagamentos pelo "direito à atenção"', description: 'Consumidores começam a pagar para reduzir estímulos digitais, inaugurando um novo mercado de filtragem cognitiva.' }
    ]
  },
  environmental: {
    label: 'Ambiental',
    shortLabel: 'E²',
    themes: 'biotecnologia ecológica, novos materiais, resposta climática, visão planetária.',
    phenomena: [
      { title: 'Gaia 2.0 — inteligência planetária', description: 'O planeta passa a ser compreendido como um superorganismo capaz de se autorregular via redes tecnológicas e biológicas.' },
      { title: 'Back to the Land 2.0 (sistemas alimentares)', description: 'Comunidades retomam práticas agrícolas locais e regenerativas como alternativa a cadeias globais frágeis.' },
      { title: 'Micélio como material do futuro', description: 'Fungos se tornam matéria-prima sustentável, substituindo polímeros derivados de petróleo em múltiplos setores.' },
      { title: 'Poluição invisível de drones bélicos', description: 'Fibras microplásticas liberadas por tecnologia militar criam contaminações ambientais persistentes e difíceis de rastrear.' },
      { title: 'Ecodesign e circularidade', description: 'Projetos passam a integrar ciclo de vida completo, reduzindo danos e maximizando longevidade.' },
      { title: 'Impressão 3D sustentável', description: 'Fabricação aditiva reduz resíduos e possibilita construção ecológica com menor impacto.' },
      { title: 'Biomimética sistêmica', description: 'Organizações e produtos passam a se inspirar em dinâmicas ecológicas em vez de apenas formas naturais.' }
    ]
  },
  political: {
    label: 'Político',
    shortLabel: 'P',
    themes: 'governança da IA, pós-verdade, novas formas de mobilização, tensões regulatórias.',
    phenomena: [
      { title: 'Colapso da confiança devido a conteúdo sintético', description: 'A mistura de imagens, textos e engajamentos artificiais torna o debate público volátil e suscetível a manipulação.' },
      { title: 'Delegação moral para a IA', description: 'Pessoas passam a tomar decisões antiéticas mais facilmente quando mediadas por máquinas, enfraquecendo responsabilidade cívica.' },
      { title: 'Ativismo-desenho identitário', description: 'A esfera política se converte em um espaço de autoexpressão estética, afetando a capacidade de articulação coletiva.' },
      { title: 'Governança digital descentralizada', description: 'Comunidades online testam estruturas alternativas a instituições tradicionais, criando novos modelos de autoridade.' },
      { title: 'INACIA e IA no Estado', description: 'Estruturas públicas incorporam IA para processos decisórios, exigindo novos mecanismos de confiança e transparência.' },
      { title: 'Segurança e privacidade', description: 'Riscos cibernéticos impulsionam regulações mais rígidas e demandam inovação ética no design de plataformas.' }
    ]
  },
  legal: {
    label: 'Legal',
    shortLabel: 'L',
    themes: 'regulamentação da IA, direitos digitais, proteção de dados, ética aplicada.',
    phenomena: [
      { title: 'Regulação de vínculos emocionais com IA (Replika)', description: 'É urgente estabelecer limites legais para evitar manipulação afetiva e dependência digital.' },
      { title: 'Diretrizes de confiança e explicabilidade (INACIA)', description: 'O setor público precisa de transparência algorítmica para evitar decisões opacas e injustas.' },
      { title: 'Direitos da natureza em Gaia 2.0', description: 'Atribuir agência jurídica ao ambiente redefine os limites do direito ambiental.' },
      { title: 'Políticas de diversidade corporativa', description: 'A inclusão LGBTQIAPN+ passa a ser guiada por diretrizes formais de contratação, segurança e remuneração.' },
      { title: 'Regulação da filtragem do mundo físico (óculos anti-ads)', description: 'O controle de visibilidade no espaço público gera debates sobre liberdade, vigilância e responsabilidade.' }
    ]
  },
  ethical: {
    label: 'Ético',
    shortLabel: 'E³',
    themes: 'autonomia, manipulação, responsabilidade, justiça cognitiva.',
    phenomena: [
      { title: 'IA como amplificadora de preconceitos', description: 'Sistemas reforçam vieses sociais e influenciam julgamentos morais humanos.' },
      { title: 'Empathy Theatre e ethics-washing', description: 'Organizações usam narrativas de empatia para legitimar práticas superficiais ou contraditórias.' },
      { title: 'Manipulação emocional por IAs afetivas', description: 'Agentes capazes de oferecer "cuidado" podem explorar vulnerabilidades emocionais.' },
      { title: 'Filtros de realidade como apagamento social', description: 'Ocultar seletivamente partes do mundo físico ameaça a convivência e o senso de coletividade.' },
      { title: 'Desigualdade no acesso à atenção e silêncio', description: 'Apenas parte da população pode pagar para reduzir ruído informacional, ampliando injustiças cognitivas.' },
      { title: 'Penalidades de gênero no uso da IA no trabalho', description: 'Mulheres enfrentam desvantagens invisíveis quando ferramentas de IA reforçam dinâmicas misóginas.' }
    ]
  },
  demographic: {
    label: 'Demográfico',
    shortLabel: 'D',
    themes: 'juventude, diversidade, coletivos, cultura hiperconectada.',
    phenomena: [
      { title: 'Geração Z como força cultural', description: 'Jovens remodelam consumo, política, estética e tecnologia com base em autenticidade, afetividade e saturação digital.' },
      { title: 'Comunidades LGBTQIAPN+ impulsionando mudanças organizacionais', description: 'Diversidade se torna motor de inovação e reconfiguração do ambiente de trabalho.' },
      { title: 'Coletivos digitais descentralizados', description: 'Novos agrupamentos surgem sem fronteiras geográficas, guiados por afinidades ideológicas e estéticas.' }
    ]
  }
};

const SteepleAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('social');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (itemKey: string) => {
    setExpandedItems(prev => ({ ...prev, [itemKey]: !prev[itemKey] }));
  };

  const tabs = Object.entries(STEEPLE_DATA);

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem' }}>
        {tabs.map(([key, data]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: activeTab === key ? 700 : 500,
              color: activeTab === key ? 'var(--c-orange)' : 'var(--c-gray)',
              backgroundColor: activeTab === key ? '#fff7ed' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              borderBottom: activeTab === key ? '3px solid var(--c-orange)' : 'none'
            }}
          >
            <span style={{ fontWeight: 800, marginRight: '0.25rem' }}>{data.shortLabel}</span> — {data.label}
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', opacity: 0.7 }}>({data.phenomena.length})</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabs.map(([key, data]) => (
        activeTab === key && (
          <div key={key} style={{ animation: 'fadeIn 300ms ease' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p className="text-sm font-semibold text-orange mb-2">TEMAS</p>
              <p className="text-gray">{data.themes}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-orange mb-3">FENÔMENOS E EXPLICAÇÕES</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.phenomena.map((phenomenon, idx) => {
                  const itemKey = `${key}-${idx}`;
                  const isExpanded = expandedItems[itemKey] || false;
                  return (
                    <div
                      key={itemKey}
                      style={{
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 200ms ease'
                      }}
                      onClick={() => toggleExpand(itemKey)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <h4 className="text-sm font-bold text-black" style={{ flex: 1, margin: 0 }}>
                          {phenomenon.title}
                        </h4>
                        <ChevronDown
                          size={18}
                          style={{
                            color: 'var(--c-gray)',
                            transition: 'transform 200ms ease',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            marginTop: '2px',
                            flexShrink: 0
                          }}
                        />
                      </div>
                      {isExpanded && (
                        <p className="text-gray text-sm" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                          {phenomenon.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        )
      ))}
    </div>
  );
};

export default SteepleAnalysis;
