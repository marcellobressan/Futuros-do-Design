export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isStreaming?: boolean;
  timestamp: Date;
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
  turma: 'A' | 'B';
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
  turma: 'A' | 'B';
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
  data_submissao: string;
}

export enum AppView {
  HOME = 'HOME',
  CHAT = 'CHAT',
  SOLUTIONS = 'SOLUTIONS',
  KNOWLEDGE = 'KNOWLEDGE'
}