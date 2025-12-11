

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isStreaming?: boolean;
  timestamp: Date;
  error?: boolean;
  functionCall?: {
    name: string;
    args: any;
  };
}

export interface Scenario {
  id: string;
  title: string;
  turma: 'A' | 'B';
  description: string;
  archetype: string;
  metaphor?: string; // Added from PDF data
  imagePrompt?: string;
  imageUrl: string; 
}

export interface UserProfile {
  name: string;
  email: string;
  turma: 'A' | 'B' | 'PROFESSOR';
  isSuperUser?: boolean;
}

export interface KoriReport {
  id: string;
  turma: 'A' | 'B';
  filename: string;
  size: string;
  date: string;
  url: string; // Placeholder for logic
}

export interface RegisteredSolution {
  id: string;
  nome_da_solucao: string;
  participantes: { nome_completo: string; email: string }[];
  turma: 'A' | 'B' | 'PROFESSOR';
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
  turma: 'A' | 'B' | 'PROFESSOR';
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
  HOME = 'HOME', // Manifesto
  SOLUTION_REGISTRATION = 'SOLUTION_REGISTRATION', // Cadastro de Soluções
  USER_PROFILE = 'USER_PROFILE', // Perfil do Usuário
}