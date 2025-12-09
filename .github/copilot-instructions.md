<!-- Instruções concisas para agentes de código que editam este repositório -->
# Copilot / Agente — Diretrizes rápidas (Futuros-do-Design)

Resumo rápido
- Projeto: SPA React + Netlify Functions + Neon (Drizzle ORM).
- Dev: Node 20.x (veja `package.json`). Rodar localmente: `npm install` → `npm run dev`.

Arquitetura (big-picture)
- Frontend: React + Vite. Entrada principal: `index.tsx` → `App.tsx`.
- Componentes importandes: `components/ChatInterface.tsx`, `StoryBoard.tsx`, `Sidebar.tsx`, `AIIllustration.tsx`.
- Serviço de IA: `services/geminiService.ts` — encapsula a integração com `@google/genai`, manutenção de sessão de chat, geração de imagens e execução simulada de "tools".
- Backend leve: Netlify Functions em `netlify/functions/*` (ex.: `solutions.ts`) que expõem endpoints acessíveis do frontend via `/.netlify/functions/solutions`.
- Banco: Drizzle ORM + Neon. Definição de tabela em `db/schema.ts`. Conexão em `db/index.ts` usa `process.env.DATABASE_URL`.

Fluxos importantes e convenções do projeto
- Autenticação da API Gemini: a app espera uma chave de API selecionada (ver `App.tsx`). Use a variável de build `VITE_GEMINI_API_KEY` para injetar a chave no bundle (ex.: setar `VITE_GEMINI_API_KEY` em Netlify Site settings → Build & deploy → Environment). O código faz fallback para `GEMINI_API_KEY` / `API_KEY` se presentes em tempo de build.
- Chat → Ações/DB: modelo pode solicitar execução de funções (tools). As funções declaradas em `services/geminiService.ts` (`refinarDescricaoSolucao`, `apresentarRascunhoParaRevisao`, `registrarSolucao`) são esperadas pelo frontend. O fluxo de confirmação do usuário está implementado em `components/ChatInterface.tsx` (busque o prompt que começa com `[CONFIRMAÇÃO DO USUÁRIO]`).
- Persistência: `netlify/functions/solutions.ts` aceita GET e POST. Mantenha o formato JSON compatível com `db/schema.ts` (campos complexos em `jsonb`). Não mude nomes de colunas (`nome_da_solucao`, `turma`, `participantes`, `descricao_refinada`, `imagem`, `data_submissao`).
- Geração de imagens: chamada a `generateIllustration(prompt)` em `services/geminiService.ts`. A UI (`AIIllustration.tsx`) espera um data URL ou URL retornado.
- Polling: `App.tsx` usa `getSolutions()` e faz polling a cada 5s — tenha cuidado ao modificar essa lógica para não gerar carga desnecessária.

Scripts e fluxos de desenvolvedor
- Rodar localmente: `npm install` && `npm run dev` (Vite).
- Build/preview: `npm run build`; `npm run preview`.
- TypeScript check: `npm run check`.
- Drizzle DB: `npm run db:generate`, `npm run db:migrate`, `npm run db:push`, `npm run db:studio`.
- Variáveis de ambiente críticas: `DATABASE_URL` (Neon/Netlify) e chave API Gemini (conforme README / `.env.local`).

Padrões de código e expectativas
- Tipagem: TypeScript com tipos centrais em `types.ts`. Prefira usar os tipos definidos ao alterar payloads.
- Formato de dados: campos compostos (participantes, cenarios_relacionados, descricao_refinada, imagem) são armazenados como JSONB — sempre serialize/deserialize exatamente como exemplo em `components/ChatInterface.tsx`.
- Serverless handlers: retornar `Response` com headers de CORS (veja `netlify/functions/solutions.ts`). Respeite o padrão `OPTIONS` → 204 e `Content-Type: application/json`.
- Não alterar nomes de rota front-end: o frontend faz fetch para `/.netlify/functions/solutions` — qualquer mudança exige ajuste no cliente.

O que procurar ao editar
- Mudanças na API do modelo (tools, nomes de função): atualize `services/geminiService.ts` e revise `ChatInterface.tsx` para garantir que as chamadas e o UI de revisão (DraftReviewCard) seguem o mesmo contrato.
- Alterações na schema DB: atualize `db/schema.ts` e inclua as migrations com `drizzle-kit` scripts (`db:migrate` / `db:generate`).
- Erros comuns: ausência de `DATABASE_URL` (lança erro em `db/index.ts`) ou chave de API ausente — o app mostra tela de seleção de chave (`App.tsx`).

Pequenos exemplos úteis
- Para salvar solução (sigam o contrato JSON):
  - POST para `/.netlify/functions/solutions` com body contendo `nome_da_solucao`, `turma`, `participantes` (array de objetos com `nome_completo` e `email`), `cenarios_relacionados` (array), `descricao_refinada` (obj com `resumo`, `problema_que_resolve`, `como_funciona`, `relacao_com_os_cenarios`), `imagem` (obj com `url`) e `data_submissao`.
- Ex.: o frontend chama `sendMessage` em `services/geminiService.ts` que, ao executar `registrarSolucao`, faz um POST para a função serverless.

Checklist rápido ao abrir um PR
- Verificar se `types.ts` e `db/schema.ts` foram atualizados em sincronia.
- Garantir que `netlify/functions/*` mantenha CORS e formato `Response`.
- Testar fluxo de cadastro: abrir app, selecionar chave (ou definir env), conversar com o agente, revisar rascunho e confirmar registro.

Perguntas/feedback
- Se algo aqui estiver ambíguo ou faltar exemplos (ex.: contratos de funções adicionais), diga o arquivo ou fluxo que você quer que eu documente com mais detalhes.

-- Fim do resumo específico do repositório