CREATE TABLE IF NOT EXISTS "solutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome_da_solucao" text NOT NULL,
	"turma" text NOT NULL,
	"participantes" jsonb NOT NULL,
	"cenarios_relacionados" jsonb NOT NULL,
	"descricao_refinada" jsonb NOT NULL,
	"imagem" jsonb NOT NULL,
	"link_solucao" text,
	"data_submissao" timestamp DEFAULT now()
);
