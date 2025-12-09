import { pgTable, text, jsonb, timestamp, uuid } from 'drizzle-orm/pg-core';

export const solutions = pgTable('solutions', {
  id: uuid('id').defaultRandom().primaryKey(),
  nome_da_solucao: text('nome_da_solucao').notNull(),
  turma: text('turma').notNull(),
  // We store complex objects as JSONB
  participantes: jsonb('participantes').notNull(), 
  cenarios_relacionados: jsonb('cenarios_relacionados').notNull(),
  descricao_refinada: jsonb('descricao_refinada').notNull(),
  imagem: jsonb('imagem').notNull(),
  data_submissao: timestamp('data_submissao').defaultNow(),
});

export type Solution = typeof solutions.$inferSelect;
export type NewSolution = typeof solutions.$inferInsert;