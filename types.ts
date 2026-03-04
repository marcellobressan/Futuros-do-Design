
// =============================================================================
// FONTE DE VERDADE CENTRALIZADA DAS TURMAS
// Para adicionar uma nova turma, basta inserir uma nova entrada aqui.
// Todos os tipos e validações são derivados automaticamente desta estrutura.
// =============================================================================

export const TURMA_CONFIG = {
  A: { label: '2025.2 A', displayName: 'Turma 2025.2 A', color: 'var(--c-orange)', bgColor: '#fff7ed', borderColor: 'var(--c-orange)' },
  B: { label: '2025.2 B', displayName: 'Turma 2025.2 B', color: '#3b82f6',        bgColor: '#f0f9ff',  borderColor: '#3b82f6'         },
  C: { label: '2026.1',   displayName: 'Turma 2026.1',   color: '#10b981',        bgColor: '#f0fdf4',  borderColor: '#10b981'         },
} as const;

/** Identificador de turma de estudante: 'A' | 'B' | 'C' */
export type TurmaAluno = keyof typeof TURMA_CONFIG;

/** Identificador de turma de usuário (inclui PROFESSOR): 'A' | 'B' | 'C' | 'PROFESSOR' */
export type TurmaUsuario = TurmaAluno | 'PROFESSOR';

/** Array ordenado de turmas de alunos, útil para iteração em UI */
export const TURMAS_ALUNO_KEYS = Object.keys(TURMA_CONFIG) as TurmaAluno[];

// =============================================================================
// INTERFACES DO DOMÍNIO
// =============================================================================

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isStreaming?: boolean;
  timestamp: Date;
  error?: boolean;
  functionCall?: {
    name: string;
    args: unknown;
  };
}

export interface Scenario {
  id: string;
  title: string;
  turma: TurmaAluno;
  description: string;
  archetype: string;
  metaphor?: string;
  imagePrompt?: string;
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  email: string;
  turma: TurmaUsuario;
  isSuperUser?: boolean;
}

export interface KoriReport {
  id: string;
  turma: TurmaAluno;
  filename: string;
  size: string;
  date: string;
  url: string;
}

export interface RegisteredSolution {
  id: string;
  nome_da_solucao: string;
  participantes: { nome_completo: string; email: string }[];
  turma: TurmaUsuario;
  cenarios_relacionados: string[];
  descricao_refinada: {
    resumo: string;
    problema_que_resolve: string;
    como_funciona: string;
    relacao_com_os_cenarios: string;
  };
  imagem: {
    tipo: 'upload' | 'url';
    url: string;
  };
  link_solucao?: string;
  data_submissao: string;
}

export interface DraftSolution {
  nome_da_solucao: string;
  participantes: { nome_completo: string; email: string }[];
  turma: TurmaUsuario;
  cenarios_relacionados: string[];
  descricao_refinada: {
    resumo: string;
    problema_que_resolve: string;
    como_funciona: string;
    relacao_com_os_cenarios: string;
  };
  imagem?: {
    tipo: 'upload' | 'url';
    url: string;
  };
  link_solucao?: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  KNOWLEDGE = 'KNOWLEDGE',
  SOLUTIONS = 'SOLUTIONS',
  HOME = 'HOME',
  SOLUTION_REGISTRATION = 'SOLUTION_REGISTRATION',
  USER_PROFILE = 'USER_PROFILE',
}
