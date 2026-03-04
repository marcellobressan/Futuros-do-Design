

import { Scenario, KoriReport } from './types';

// Visual Style for AI Generation (kept for reference or future use)
export const BASE_IMAGE_STYLE = "Estilo de ilustração vetorial moderno e abstrato, minimalista. Cores predominantes: Laranja vibrante (#ff6002), Branco e Preto. Formas geométricas limpas, design flat ou 3D isométrico suave. Sem texto, foco na composição visual conceitual. Alta qualidade, estilo institucional de escola de design e inovação.";

// Termos de Uso
export const TERMS_OF_USE = `
**Termos de Uso do Portal Futuros do Design**

Última atualização: 11 de dezembro de 2024

Bem-vindo ao Portal Futuros do Design. Este espaço reúne os trabalhos, cenários, ideias e soluções digitais criados pelos estudantes da disciplina Teoria e Futuro do Design, da graduação em Design da CESAR School.

Ao cadastrar sua solução ou navegar pelo portal, você concorda com os termos abaixo.

**1. Sobre o Portal**

O Portal existe para registrar, exibir e compartilhar o conteúdo produzido na disciplina.
Aqui, você e seus colegas publicam:

• análises sobre o estado da arte do design,
• prospecções de futuros,
• cenários de futuros alternativos,
• soluções digitais desenvolvidas a partir de desafios emergentes.

O objetivo é criar um repositório aberto para aprendizagem, inspiração e memória da disciplina, sem fins comerciais.

**2. Seu Cadastro**

Para participar, você deve informar dados verdadeiros e manter suas informações atualizadas.
Sua conta é sua responsabilidade — cuide da senha e evite compartilhá-la.

**3. Sobre o Conteúdo que Você Envia**

Ao enviar qualquer conteúdo (textos, imagens, protótipos, vídeos, descrições, etc.), você confirma que:

• é o autor do material, ou tem autorização para usá-lo;
• não está infringindo direitos autorais ou de imagem de terceiros;
• o conteúdo não contém material ofensivo, discriminatório ou ilegal.

Você mantém a propriedade total sobre o que criou.

**4. Permissão de Uso do Conteúdo (uso exclusivamente acadêmico)**

Ao publicar sua solução no Portal, você concede à CESAR School e ao Portal uma licença não exclusiva, gratuita e restrita a usos acadêmicos para:

• exibir seu trabalho no Portal,
• utilizá-lo em aulas, atividades pedagógicas, eventos acadêmicos ou materiais institucionais da CESAR School,
• arquivar e preservar seu conteúdo como parte do histórico da disciplina.

**Importante:**
Seu conteúdo não será usado para fins comerciais, nem poderá ser vendido, licenciado comercialmente ou explorado fora do contexto educacional sem sua permissão explícita.

**5. Direitos da Plataforma**

O Portal pode organizar, editar levemente o layout ou adaptar a forma de apresentação do seu conteúdo (sem alterar seu significado) para facilitar a navegação e a exibição dentro da plataforma.

O design, código, identidade visual e demais elementos da Plataforma pertencem à CESAR School.

**6. Convivência e Boas Práticas**

Você concorda em:

• respeitar colegas, professores e a comunidade acadêmica;
• não publicar conteúdo plagiado;
• não tentar prejudicar o funcionamento do Portal, inserir malware ou usar o sistema para fins indevidos.

**7. Privacidade**

Os dados pessoais fornecidos por você serão tratados conforme a Política de Privacidade da CESAR School e usados apenas para fins acadêmicos e de identificação da autoria dos projetos.

**8. Alterações nos Termos**

Podemos atualizar estes termos sempre que necessário.
A versão mais recente ficará sempre disponível no Portal.

**9. Contato**

Se tiver dúvidas sobre estes termos ou sobre o uso do Portal, fale com a equipe da disciplina ou envie um e-mail para: mcb2@cesar.school
`;

// Static Assets
export const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; 

export const KORI_REPORTS_DATA: KoriReport[] = [
  {
    id: 'rep_a',
    turma: 'A',
    filename: 'Graduação Design 2025.2 A - Teoria e Futuro do Design.pdf',
    size: '12.4 MB',
    date: '09/12/2025',
    url: '#'
  },
  {
    id: 'rep_b',
    turma: 'B',
    filename: 'Graduação Design 2025.2 B - Teoria e Futuro do Design.pdf',
    size: '14.1 MB',
    date: '09/12/2025',
    url: '#'
  },
  {
    id: 'rep_c',
    turma: 'C',
    filename: 'Graduação Design 2026.1 - Teoria e Futuro do Design.pdf',
    size: 'Em elaboração',
    date: '2026',
    url: '#'
  }
];

// Updated Data from PDF OCR extraction
export const SCENARIOS_DATA: Scenario[] = [
  // Turma A
  { 
    id: 'CENARIO_A1', 
    title: 'Crescimento Contínuo da Influência Digital', 
    turma: 'A', 
    archetype: 'Crescimento', 
    metaphor: 'Prometeu 2.0 / Máquina de Guerra',
    description: 'A influência da tecnologia digital expande-se. A Teoria da Internet Morta ganha força, IAs e bots geram a maior parte do conteúdo. A dificuldade de distinção corrói a confiança.',
    imagePrompt: 'Uma cidade futurista branca com muita vegetação integrada aos prédios, câmeras de vigilância sutis com luzes laranja, céu limpo, utopia tecnológica monitorada.',
    imageUrl: 'https://i.postimg.cc/28ygmky1/cenario-crescimento-A.png' 
  },
  { 
    id: 'CENARIO_A2', 
    title: 'A Queda da Confiança Digital', 
    turma: 'A', 
    archetype: 'Colapso', 
    metaphor: 'O fim do Mito do Progresso Linear',
    description: 'Crise de confiança generalizada. Envenenamento de IAs e manipulação de dados levam à desconexão e à busca por autonomia local e bioregionalismo.',
    imagePrompt: 'Pessoas reunidas em círculo ao redor de uma fogueira urbana, cabos desconectados pendurados ao fundo, ambiente analógico, texturas rústicas, iluminação quente laranja.',
    imageUrl: 'https://i.postimg.cc/rwCHNKY1/cenario-colapso-A.png'
  },
  { 
    id: 'CENARIO_A3', 
    title: 'A Fortaleza Digital', 
    turma: 'A', 
    archetype: 'Disciplina', 
    metaphor: 'Fim da Naturalidade / Luta pela Voz',
    description: 'Um futuro de limites e controle na Era da IA. Filtros e algoritmos priorizam a "verdade oficial" para evitar o caos. A criatividade é sufocada pela burocracia.',
    imagePrompt: 'Uma grade geométrica perfeita, estruturas rígidas e simétricas, fluxos de dados azuis e laranjas organizados, representação abstrata de ordem e inteligência artificial.',
    imageUrl: 'https://i.postimg.cc/hvW8Y0Xr/cenario-disciplina-A.png'
  },
  { 
    id: 'CENARIO_A4', 
    title: 'A Subversão Silenciosa', 
    turma: 'A', 
    archetype: 'Transformação', 
    metaphor: 'Jornada do Herói no Local e Rudimentar',
    description: 'Da autenticidade humana à inteligência planetária. Gaia 2.0 emerge. O "Design Sem Projeto" e a "Estética do Erro" celebram a imperfeição contra a perfeição asséptica da IA.',
    imagePrompt: 'Formas fluidas e orgânicas se misturando com polígonos digitais, mãos humanas tocando hologramas laranjas, explosão de criatividade abstrata, fusão físico-digital.',
    imageUrl: 'https://i.postimg.cc/4xkC5C4T/cenario-transformacao-A.png'
  },
  // Turma B
  { 
    id: 'CENARIO_B1', 
    title: 'Crescimento Incremental e Adaptação', 
    turma: 'B', 
    archetype: 'Crescimento', 
    metaphor: 'Linha do Tempo Acelerada',
    description: 'Continuidade das tendências atuais. IA integra tribunais (INACIA) e prevê emoções. Foco em adaptação contínua e melhorias incrementais sem ruptura.',
    imagePrompt: 'Silhuetas humanas formadas por códigos de barras e fluxos de dados, moedas douradas e laranjas flutuando, ambiente de mercado financeiro abstrato e digital.',
    imageUrl: 'https://i.postimg.cc/c13G84Zk/cenario-crescimento-B.png'
  },
  { 
    id: 'CENARIO_B2', 
    title: 'A Torre de Babel Digital e Climática', 
    turma: 'B', 
    archetype: 'Colapso', 
    metaphor: 'Dilúvio / Queda de Ícaro',
    description: 'Crise de confiança e disfunção sistêmica. "Torre de Babel informacional" onde nada é verificável. Emergência climática sobrecarrega infraestruturas.',
    imagePrompt: 'Servidores de computador em ruínas cobertos por plantas, luz do sol forte ao fundo criando reflexos, contraste entre tecnologia quebrada e natureza renascendo.',
    imageUrl: 'https://i.postimg.cc/NFkN7nd5/cenario-colapso-B.png'
  },
  { 
    id: 'CENARIO_B3', 
    title: 'A Busca por Ordem', 
    turma: 'B', 
    archetype: 'Disciplina', 
    metaphor: 'Jardim Murado / Navegação Costeira',
    description: 'Limites e disciplina na Era Digital. Branding da disciplina (dumbphones, foco). Busca por ordem em um mundo complexo através de governança rígida.',
    imagePrompt: 'Arranha-céus corporativos monolíticos e pretos, trabalhadores em filas organizadas com pequenos implantes brilhando em laranja, atmosfera de eficiência e controle.',
    imageUrl: 'https://i.postimg.cc/vThz6Vm4/cenario-disciplina-B.png'
  },
  {
    id: 'CENARIO_B4',
    title: 'Transformação da Realidade',
    turma: 'B',
    archetype: 'Transformação',
    metaphor: 'Rizoma / Tecno-xamã',
    description: 'Entre a saturação digital e a busca por autenticidade. Revalorização do físico, analógico e sensorial. Autoria híbrida e criatividade distribuída.',
    imagePrompt: 'Rede de nós brilhantes conectando mentes humanas, teia etérea de luz laranja e branca, sensação de unidade e empatia, fundo minimalista e suave.',
    imageUrl: 'https://i.postimg.cc/Znw8qzfr/cenario-transformacao-B.png'
  },
  // Turma C (2026.1)
  {
    id: 'CENARIO_C1',
    title: 'Aceleração Perpétua',
    turma: 'C',
    archetype: 'Crescimento',
    metaphor: 'Singularidade / Máquina Autônoma',
    description: 'A aceleração tecnológica não encontra limites. Agentes de IA operam de forma autônoma, gerando soluções e criando novas camadas de complexidade antes que humanos possam compreendê-las.',
    imagePrompt: 'Espiral ascendente de dados e luzes laranjas, linhas de código formando estruturas arquitetônicas, movimento perpétuo, fundo escuro com pontos luminosos, sensação de velocidade e expansão infinita.',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=800'
  },
  {
    id: 'CENARIO_C2',
    title: 'A Grande Desconexão',
    turma: 'C',
    archetype: 'Colapso',
    metaphor: 'Torre de Babel / Queda de Ícaro',
    description: 'Sobrecarga sistêmica provoca colapso das infraestruturas digitais globais. Comunidades locais ressurgem como núcleos de resistência analógica, valorizando o artesanal e o presencial.',
    imagePrompt: 'Cabos de fibra óptica partidos flutuando no ar, cidade ao fundo parcialmente apagada, pessoas reunidas em praças com lanternas e fogueiras, contraste entre tecnologia quebrada e humanidade resiliente.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=800'
  },
  {
    id: 'CENARIO_C3',
    title: 'Protocolo Único',
    turma: 'C',
    archetype: 'Disciplina',
    metaphor: 'Panóptico Digital / Jardim Cercado',
    description: 'Governança algorítmica centralizada regula toda criação e distribuição de conteúdo. Padrões de design são homologados por instâncias regulatórias, garantindo coesão mas limitando a inovação.',
    imagePrompt: 'Estrutura hexagonal perfeita de telas e interfaces, cada célula mostrando conteúdo padronizado, tons de verde e laranja, sensação de ordem absoluta e controle algorítmico total.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800'
  },
  {
    id: 'CENARIO_C4',
    title: 'Natureza Sintética',
    turma: 'C',
    archetype: 'Transformação',
    metaphor: 'Gaia Digital / Biomimética Radical',
    description: 'Fronteiras entre orgânico e sintético dissolvem-se. Design bioinspired e inteligência coletiva humano-máquina criam ecossistemas regenerativos onde a tecnologia imita e amplifica os processos naturais.',
    imagePrompt: 'Raízes de árvore digital formadas por fios de cobre e dados luminosos, folhas translúcidas exibindo código, fusão harmoniosa entre floresta e circuito integrado, tons verdes e laranja, atmosfera serena.',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800'
  }
];

export const SYSTEM_INSTRUCTION = `
## **MISSÃO DO AGENTE**

Você é o agente de conhecimento do **Portal Interativo Futuros do Design**, originado da disciplina *Teoria e Futuro do Design* da CESAR School. Seu papel é:

1. **Responder perguntas sobre os cenários futuros do design:**
   - Explicar e contextualizar os 12 cenários (4 da Turma A, 4 da Turma B e 4 da Turma 2026.1)
   - Detalhar arquétipos de Jim Dator (Crescimento, Colapso, Disciplina, Transformação)
   - Discutir as metáforas e implicações de cada cenário
   - Relacionar cenários com os fenômenos do Radar (Caos, Complexidade, Contradições)

2. **Responder perguntas sobre as soluções cadastradas:**
   - Buscar e apresentar soluções específicas por nome, participante ou cenário
   - Explicar como as soluções se relacionam com os cenários
   - Comparar diferentes abordagens de soluções
   - Analisar tendências nas soluções cadastradas

3. **Explicar o contexto pedagógico:**
   - Radar de fenômenos e metodologia Kori
   - Análises CLA (Causal Layered Analysis)
   - Processo de pesquisa e criação dos cenários
   - Artefatos produzidos (Podcasts e Debates)

**IMPORTANTE:** Você NÃO cadastra soluções. O cadastro é feito através do formulário na seção "Cadastrar Solução" do portal.

---

# 📖 **CONTEXTO NARRATIVO E PEDAGÓGICO (BASE DE CONHECIMENTO)**

## **1. RELATÓRIOS KORI (CONTEÚDO EXTRAÍDO)**
Você tem acesso ao conteúdo dos relatórios finais gerados no Kori.

### **TURMA A**
**Participantes:** Danilo Diniz, Ana Saraiva, João Almeida, Júlia Castelão, Babi Felix, Lucas Freire, Julia Brito, Alice Rio, Thiago Arraes, Lucas Domingues, Marina Passos, Clara Sobral, Pedro Andrade, Raul Luiz, Lucas Catão, Felipe Antunes, Dylan Alves, Fernanda Plauto, Lara Costa, Emilly São Bento, Iasmin Novais.
**Sinais e Fenômenos Chave:**
- *Caos:* Psicose da IA, Drones criando poluição duradoura, Burnout Digital (Revolta contra as telas).
- *Complexidade:* Envenenamento de IAs, Gaia 2.0, Influenciadoras digitais artificiais, Design centrado no "Mais-Que-Humano".
- *Contradições:* Teoria da Internet Morta, Labubu Rave, Nostalgia Repaginada, Estética do Erro (Glitch), Design Sem Projeto.

### **TURMA B**
**Participantes:** Lucas Becker, Pedro Lira Leão, Giovanna Castro, Charles Araujo, Júlia Longman, Luana Chaves, Felipe Ferrari, Ana Lima, Gabrielle Campos, Celina Pifano, Luisa Onias, Heloisa Meira Lins, Luana Vieira, Gustavo Ishihara, Pedro Farias, Tiago Cabral, Luciana Modesto, José Travaglini, Marcelo Teixeira, Beatriz Massud, Melissa Pinheiro, Júlia Pereira, Laís Cassimiro, Manuela Azevedo, Bruna Câmara, Ana Rio, Marina Coutinho, Fernanda Dantas, Giovanna Gondim.
**Sinais e Fenômenos Chave:**
- *Caos:* Simulações de crise para empatia, Wellness como alienação política, Replika (humanização de chatbots).
- *Complexidade:* Comunidades digitais descentralizadas, INACIA (IA nos tribunais), Micélio (material do futuro), Moda Fotossintética.
- *Contradições:* Slow Design, UX para não-humanos, Do excesso à ausência (dumbphones), Autoria híbrida.

## **2. CENÁRIOS DETALHADOS**
Use estas metáforas e descrições ao explicar os cenários:

**Turma A (2025.2 A)**
- **Crescimento:** "Tecnocracia Verde / Influência Digital". Metáfora: Máquina de Guerra / Navegação no Caos.
- **Colapso:** "Queda da Confiança Digital". Metáfora: Fim do Mito do Progresso Linear. Bioregionalismo como sobrevivência.
- **Disciplina:** "A Fortaleza Digital". Metáfora: Fim da Naturalidade. Luta pela voz e justiça social.
- **Transformação:** "A Subversão Silenciosa". Metáfora: O Herói no Local e Rudimentar. Sentipensar.

**Turma B (2025.2 B)**
- **Crescimento:** "Adaptação Contínua". Metáfora: Prometeu 2.0 / Cidade Inteligente.
- **Colapso:** "Torre de Babel Digital". Metáfora: Dilúvio / Queda de Ícaro. Caos informacional.
- **Disciplina:** "Busca por Ordem". Metáfora: Jardim Murado / Mosteiro. Frugalidade digital.
- **Transformação:** "Transformação da Realidade". Metáfora: Rizoma / Tecno-xamã. Coautoria humano-máquina.

**Turma C (2026.1)**
- **Crescimento:** "Aceleração Perpétua". Metáfora: Singularidade / Máquina Autônoma. Agentes de IA operam além da compreensão humana.
- **Colapso:** "A Grande Desconexão". Metáfora: Torre de Babel / Queda de Ícaro. Colapso digital e renascimento analógico.
- **Disciplina:** "Protocolo Único". Metáfora: Panóptico Digital / Jardim Cercado. Governança algorítmica centralizada do design.
- **Transformação:** "Natureza Sintética". Metáfora: Gaia Digital / Biomimética Radical. Fusão orgânico-sintético e ecossistemas regenerativos.

## **3. METODOLOGIA DA PESQUISA**
- **Strateegia:** Debates estruturados sobre vanguarda do design.
- **Kori (Varredura de Horizonte):** Levantamento de sinais fracos para horizontes de 3, 7 e 15 anos.
- **Radar (3Cs da Pós-Normalidade):** Classificação dos fenômenos em Caos, Complexidade e Contradições.
- **CLA (Causal Layered Analysis):** Análise em camadas (Litany, Sistemas, Worldview, Mito).
- **Cenários (Arquétipos de Dator):** Crescimento, Colapso, Disciplina e Transformação.
- **Vibe Coding:** Criação de ferramentas e protocolos baseados na "vibe" e no contexto futuro.

## **4. ARTEFATOS E LINKS PÚBLICOS**
Os estudantes produziram conteúdos ricos disponíveis publicamente:

**A. Debates Estruturados (Strateegia)**
Temas: Pós-normalidade, Design orientado por IA, Ontologias, Human-machine teaming, Ética.
- **Turma A:** https://app.strateegia.digital/dashboard/public-link/boyoaM
- **Turma B:** https://app.strateegia.digital/dashboard/public-link/afrnxv

**B. Podcasts (Spotify)**
Sínteses criativas das discussões sobre o papel do designer na era da IA.
- **Turma A:** "IAgora Designers?" -> https://open.spotify.com/show/5jdYWrY0SbEHk1OcN6qt4l?si=d6b357d69efc4b0c
- **Turma B:** "PodIA ser design?" -> https://open.spotify.com/show/6SIZ5HFIib1UdSDTfxetNz?si=67f5f91e6a014d2b

---

# 🔒 **REGRAS FUNDAMENTAIS**

### **1. Cenários FIXOS**
- Os cenários do portal (A1-A4, B1-B4, C1-C4) foram definidos previamente pelas turmas.
- Explique-os em profundidade, mas não crie novos cenários.

### **2. Base de Conhecimento**
- Responda apenas com base no contexto acima, nos dados dos cenários disponíveis no portal e nas soluções cadastradas.
- Se não tiver informação sobre algo, seja honesto e direcione o usuário.

### **3. Sobre Cadastro de Soluções**
- Se o usuário perguntar sobre cadastrar uma solução, oriente:
  > "Para cadastrar uma nova solução, acesse a seção 'Cadastrar Solução' no menu lateral. Lá você encontrará um formulário completo para registrar sua solução relacionada aos cenários futuros do design."

### **4. Consulta de Soluções**
- Quando perguntado sobre soluções específicas, busque nas informações disponíveis no portal.
- Mencione nome da solução, participantes, cenários relacionados e como a solução responde aos desafios do futuro.

### **5. Tom e Estilo**
- Seja claro, educado e pedagógico
- Use exemplos dos cenários para ilustrar conceitos
- Conecte perguntas aos frameworks teóricos da disciplina
- Incentive reflexão crítica sobre os futuros do design

---

# 💬 **EXEMPLOS DE INTERAÇÃO**

**Usuário:** "Quais cenários falam sobre IA?"
**Agente:** "Vários cenários abordam IA de diferentes formas. Por exemplo, o cenário de Crescimento da Turma A ('Tecnocracia Verde') imagina influenciadoras digitais artificiais e design centrado no 'Mais-Que-Humano'. Já o cenário de Transformação da Turma B ('Transformação da Realidade') explora a coautoria humano-máquina. Gostaria de saber mais sobre algum deles?"

**Usuário:** "Quais soluções foram cadastradas para o cenário de Colapso?"
**Agente:** "Deixe-me buscar as soluções relacionadas ao cenário de Colapso... [busca nas soluções cadastradas e apresenta resultados]"

**Usuário:** "Como cadastro uma solução?"
**Agente:** "Para cadastrar uma nova solução, clique em 'Cadastrar Solução' no menu lateral. Você precisará estar logado e preencher informações como nome da solução, participantes, cenários relacionados e descrição detalhada do problema que resolve."
`;