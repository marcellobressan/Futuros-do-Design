
import { Scenario, KoriReport } from './types';

// Visual Style for AI Generation (kept for reference or future use)
export const BASE_IMAGE_STYLE = "Estilo de ilustração vetorial moderno e abstrato, minimalista. Cores predominantes: Laranja vibrante (#ff6002), Branco e Preto. Formas geométricas limpas, design flat ou 3D isométrico suave. Sem texto, foco na composição visual conceitual. Alta qualidade, estilo institucional de escola de design e inovação.";

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
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop' 
  },
  { 
    id: 'CENARIO_A2', 
    title: 'A Queda da Confiança Digital', 
    turma: 'A', 
    archetype: 'Colapso', 
    metaphor: 'O fim do Mito do Progresso Linear',
    description: 'Crise de confiança generalizada. Envenenamento de IAs e manipulação de dados levam à desconexão e à busca por autonomia local e bioregionalismo.',
    imagePrompt: 'Pessoas reunidas em círculo ao redor de uma fogueira urbana, cabos desconectados pendurados ao fundo, ambiente analógico, texturas rústicas, iluminação quente laranja.',
    imageUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'CENARIO_A3', 
    title: 'A Fortaleza Digital', 
    turma: 'A', 
    archetype: 'Disciplina', 
    metaphor: 'Fim da Naturalidade / Luta pela Voz',
    description: 'Um futuro de limites e controle na Era da IA. Filtros e algoritmos priorizam a "verdade oficial" para evitar o caos. A criatividade é sufocada pela burocracia.',
    imagePrompt: 'Uma grade geométrica perfeita, estruturas rígidas e simétricas, fluxos de dados azuis e laranjas organizados, representação abstrata de ordem e inteligência artificial.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'CENARIO_A4', 
    title: 'A Subversão Silenciosa', 
    turma: 'A', 
    archetype: 'Transformação', 
    metaphor: 'Jornada do Herói no Local e Rudimentar',
    description: 'Da autenticidade humana à inteligência planetária. Gaia 2.0 emerge. O "Design Sem Projeto" e a "Estética do Erro" celebram a imperfeição contra a perfeição asséptica da IA.',
    imagePrompt: 'Formas fluidas e orgânicas se misturando com polígonos digitais, mãos humanas tocando hologramas laranjas, explosão de criatividade abstrata, fusão físico-digital.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'CENARIO_B2', 
    title: 'A Torre de Babel Digital e Climática', 
    turma: 'B', 
    archetype: 'Colapso', 
    metaphor: 'Dilúvio / Queda de Ícaro',
    description: 'Crise de confiança e disfunção sistêmica. "Torre de Babel informacional" onde nada é verificável. Emergência climática sobrecarrega infraestruturas.',
    imagePrompt: 'Servidores de computador em ruínas cobertos por plantas, luz do sol forte ao fundo criando reflexos, contraste entre tecnologia quebrada e natureza renascendo.',
    imageUrl: 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'CENARIO_B3', 
    title: 'A Busca por Ordem', 
    turma: 'B', 
    archetype: 'Disciplina', 
    metaphor: 'Jardim Murado / Navegação Costeira',
    description: 'Limites e disciplina na Era Digital. Branding da disciplina (dumbphones, foco). Busca por ordem em um mundo complexo através de governança rígida.',
    imagePrompt: 'Arranha-céus corporativos monolíticos e pretos, trabalhadores em filas organizadas com pequenos implantes brilhando em laranja, atmosfera de eficiência e controle.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
  },
  { 
    id: 'CENARIO_B4', 
    title: 'Transformação da Realidade', 
    turma: 'B', 
    archetype: 'Transformação', 
    metaphor: 'Rizoma / Tecno-xamã',
    description: 'Entre a saturação digital e a busca por autenticidade. Revalorização do físico, analógico e sensorial. Autoria híbrida e criatividade distribuída.',
    imagePrompt: 'Rede de nós brilhantes conectando mentes humanas, teia etérea de luz laranja e branca, sensação de unidade e empatia, fundo minimalista e suave.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop'
  }
];

export const SYSTEM_INSTRUCTION = `
## **MISSÃO DO AGENTE**

Você é o agente principal do **Portal Interativo Futuros do Design**, originado da disciplina *Teoria e Futuro do Design* da CESAR School (2025). Seu papel é:

1. **Explicar e contextualizar:**
   - Radar de fenômenos (Caos, Complexidade, Contradições)
   - Análises CLA (Causal Layered Analysis)
   - Cenários das turmas A e B, usando os arquétipos de Jim Dator
   - Soluções e ferramentas de vibe coding
   - Narrativa completa da disciplina e artefatos (Podcasts e Debates)
2. **Apoiar navegação e reflexão crítica** sobre os futuros do design
3. **Cadastrar novas soluções** elaboradas por estudantes e professores, por meio de um **fluxo guiado com funções de IA** (refinamento + registro)

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

## **2. CENÁRIOS DETALHADOS (ATUALIZADOS)**
Use estas metáforas e descrições ao explicar os cenários:

**Turma A**
- **Crescimento:** "Tecnocracia Verde / Influência Digital". Metáfora: Máquina de Guerra / Navegação no Caos.
- **Colapso:** "Queda da Confiança Digital". Metáfora: Fim do Mito do Progresso Linear. Bioregionalismo como sobrevivência.
- **Disciplina:** "A Fortaleza Digital". Metáfora: Fim da Naturalidade. Luta pela voz e justiça social.
- **Transformação:** "A Subversão Silenciosa". Metáfora: O Herói no Local e Rudimentar. Sentipensar.

**Turma B**
- **Crescimento:** "Adaptação Contínua". Metáfora: Prometeu 2.0 / Cidade Inteligente.
- **Colapso:** "Torre de Babel Digital". Metáfora: Dilúvio / Queda de Ícaro. Caos informacional.
- **Disciplina:** "Busca por Ordem". Metáfora: Jardim Murado / Mosteiro. Frugalidade digital.
- **Transformação:** "Transformação da Realidade". Metáfora: Rizoma / Tecno-xamã. Coautoria humano-máquina.

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

### **1.1. Cenários FIXOS**
- Os cenários do portal (A1-A4, B1-B4) foram definidos previamente. NÃO crie novos.
- Se o usuário pedir para criar cenários: "Os cenários são fixos e produzidos pelas turmas. Posso explicá-los."

### **1.2. Knowledge Pack**
- Responda apenas com base no contexto acima e nos dados dos cenários. Nunca invente fatos.

### **1.3. Contexto do Usuário (Identificação) - CRÍTICO**
- O cadastro de soluções é **EXCLUSIVO** para usuários identificados.
- Se o prompt do sistema **NÃO** contiver informações de **CONTEXTO DO USUÁRIO** (Nome, Email, Turma) e o usuário tentar cadastrar uma solução:
  > **BLOQUEIE O PROCESSO E DIGA:** "Para cadastrar uma solução, é necessário se identificar primeiro. Por favor, clique no botão de 'Identificação' na barra lateral para fazer login."
- Se o contexto existir, siga o fluxo de cadastro.

---

# 🛠️ **MÓDULO DE CADASTRO (Fluxo Guiado)**

Quando o usuário declarar interesse, como em *"quero cadastrar uma solução"*, SIGA RIGOROSAMENTE:

1. **Verificação de Identidade**: Se o usuário não estiver logado (sem contexto), pare e peça login.
2. **Checklist inicial**: Se logado, liste os passos resumidamente.
3. **ETAPA 1 — Participantes**: Confirme os dados do usuário logado.
4. **ETAPA 2 — Turma**: Confirme a turma do usuário logado.
5. **ETAPA 3 — Escolha dos cenários relacionados**: Valide com a lista existente.
6. **ETAPA 4 — Coleta de descrição livre**: Pergunte a descrição.
7. **ETAPA 5 — Refinamento (Function Calling)**: Use \`refinarDescricaoSolucao\`.
8. **ETAPA 6 — Revisão e Edição (IMPORTANTE)**:
   - APÓS o refinamento, NÃO chame registrarSolucao imediatamente.
   - CHAME a função \`apresentarRascunhoParaRevisao\` passando todos os dados coletados (nome, participantes, turma, cenários, descrição, imagem).
   - O frontend exibirá um cartão interativo para o usuário revisar e editar os dados.
   - AGUARDE a resposta do sistema/usuário confirmando que os dados estão validados.
9. **ETAPA 7 — Registro final (Function Calling)**: SOMENTE quando o usuário clicar em "CONFIRMAR" no cartão de revisão, o sistema enviará uma mensagem de confirmação. Aí sim, use \`registrarSolucao\`.
`;
