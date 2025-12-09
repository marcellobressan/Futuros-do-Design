import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION, BASE_IMAGE_STYLE } from "../../constants";
import { UserProfile } from "../../types";

// --- Function Declarations (same as frontend) ---

const refinarDescricaoSolucaoFunc: FunctionDeclaration = {
  name: "refinarDescricaoSolucao",
  description: "Refina e padroniza a descrição da solução de acordo com as normas do portal.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      texto_bruto: { type: Type.STRING },
      cenarios_relacionados: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
    required: ["texto_bruto", "cenarios_relacionados"],
  },
};

const apresentarRascunhoParaRevisaoFunc: FunctionDeclaration = {
  name: "apresentarRascunhoParaRevisao",
  description: "Apresenta os dados coletados para revisão do usuário antes do registro final.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      nome_da_solucao: { type: Type.STRING },
      participantes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            nome_completo: { type: Type.STRING },
            email: { type: Type.STRING },
          },
          required: ["nome_completo", "email"],
        },
      },
      turma: { type: Type.STRING, enum: ["A", "B"] },
      cenarios_relacionados: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      descricao_refinada: {
        type: Type.OBJECT,
        properties: {
          resumo: { type: Type.STRING },
          problema_que_resolve: { type: Type.STRING },
          como_funciona: { type: Type.STRING },
          relacao_com_os_cenarios: { type: Type.STRING },
        },
        required: [
          "resumo",
          "problema_que_resolve",
          "como_funciona",
          "relacao_com_os_cenarios",
        ],
      },
      imagem: {
        type: Type.OBJECT,
        properties: {
          tipo: { type: Type.STRING, enum: ["upload", "url"] },
          url: { type: Type.STRING },
        },
      },
    },
    required: [
      "nome_da_solucao",
      "participantes",
      "turma",
      "cenarios_relacionados",
      "descricao_refinada",
    ],
  },
};

const registrarSolucaoFunc: FunctionDeclaration = {
  name: "registrarSolucao",
  description: "Registra a solução completa enviada pelo estudante ou professor no banco de dados.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      nome_da_solucao: { type: Type.STRING },
      participantes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            nome_completo: { type: Type.STRING },
            email: { type: Type.STRING },
          },
          required: ["nome_completo", "email"],
        },
      },
      turma: { type: Type.STRING, enum: ["A", "B"] },
      cenarios_relacionados: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      descricao_refinada: {
        type: Type.OBJECT,
        properties: {
          resumo: { type: Type.STRING },
          problema_que_resolve: { type: Type.STRING },
          como_funciona: { type: Type.STRING },
          relacao_com_os_cenarios: { type: Type.STRING },
        },
        required: [
          "resumo",
          "problema_que_resolve",
          "como_funciona",
          "relacao_com_os_cenarios",
        ],
      },
      imagem: {
        type: Type.OBJECT,
        properties: {
          tipo: { type: Type.STRING, enum: ["upload", "url"] },
          url: { type: Type.STRING },
        },
        required: ["url"],
      },
      data_submissao: { type: Type.STRING },
    },
    required: [
      "nome_da_solucao",
      "participantes",
      "turma",
      "cenarios_relacionados",
      "descricao_refinada",
      "imagem",
      "data_submissao",
    ],
  },
};

const tools: Tool[] = [
  { functionDeclarations: [refinarDescricaoSolucaoFunc, apresentarRascunhoParaRevisaoFunc, registrarSolucaoFunc] },
];

// --- Initialize Gemini with server-side API key ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("⚠️  GEMINI_API_KEY not set in environment. GenAI endpoints will fail.");
}

const client = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- Netlify Handler ---
export default async (req: Request) => {
  const method = req.method;

  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    // POST /genai?action=generateImage
    if (method === 'POST' && action === 'generateImage') {
      if (!client) {
        return new Response(JSON.stringify({ error: 'GenAI client not initialized. Missing GEMINI_API_KEY.' }), {
          status: 500,
          headers
        });
      }

      const { prompt } = await req.json();
      if (!prompt) {
        return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400, headers });
      }

      try {
        const fullPrompt = `${BASE_IMAGE_STYLE} Descrição específica: ${prompt}`;

        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: fullPrompt }],
          }
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
              return new Response(JSON.stringify({ imageUrl: `data:image/png;base64,${part.inlineData.data}` }), {
                status: 200,
                headers
              });
            }
          }
        }

        throw new Error("No image data found in response");
      } catch (e) {
        console.error('Error generating illustration:', e);
        return new Response(JSON.stringify({ error: 'Failed to generate image', details: String(e) }), {
          status: 500,
          headers
        });
      }
    }

    // POST /genai?action=chat
    if (method === 'POST' && action === 'chat') {
      if (!client) {
        return new Response(JSON.stringify({ error: 'GenAI client not initialized. Missing GEMINI_API_KEY.' }), {
          status: 500,
          headers
        });
      }

      const { message, userProfile, chatHistory } = await req.json();
      if (!message) {
        return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400, headers });
      }

      try {
        let instructions = SYSTEM_INSTRUCTION;
        if (userProfile) {
          instructions += `\n\nCONTEXTO DO USUÁRIO ATUAL (LOGADO):\nNome: ${userProfile.name}\nEmail: ${userProfile.email}\nTurma: ${userProfile.turma}\n\nNota: Utilize estes dados para preencher automaticamente os campos de identificação.`;
        } else {
          instructions += `\n\nCONTEXTO DO USUÁRIO: ANÔNIMO (Não Logado). O usuário DEVE fazer login para cadastrar soluções.`;
        }

        const chatSession = client.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: instructions,
            tools: tools,
          },
          history: chatHistory && Array.isArray(chatHistory) ? chatHistory : undefined
        });

        let fullTextResponse = "";
        let accumulatedFunctionCalls: any[] = [];

        const resultStream = await chatSession.sendMessageStream({ message });

        for await (const chunk of resultStream) {
          if (chunk.text) {
            fullTextResponse += chunk.text;
          }
          if (chunk.functionCalls) {
            accumulatedFunctionCalls.push(...chunk.functionCalls);
          }
        }

        // Process function calls (simplified execution)
        let functionResults: any[] = [];
        if (accumulatedFunctionCalls.length > 0) {
          for (const fc of accumulatedFunctionCalls) {
            let result: any;
            if (fc.name === "refinarDescricaoSolucao") {
              const rawText = fc.args?.texto_bruto || "";
              result = {
                resumo: `(Refinado) ${rawText.slice(0, 50)}...`,
                problema_que_resolve: "Identificado a partir da descrição fornecida.",
                como_funciona: "Mecanismo base extraído do relato do usuário.",
                relacao_com_os_cenarios: `Conexão direta com: ${fc.args?.cenarios_relacionados?.join(", ")}`,
                observacoes: "Refinamento automático concluído com sucesso.",
              };
            } else if (fc.name === "apresentarRascunhoParaRevisao") {
              result = {
                status: "waiting_for_user_review",
                message: "Rascunho apresentado. Aguardando edição e confirmação do usuário.",
                data: fc.args
              };
            } else if (fc.name === "registrarSolucao") {
              // This will be handled by the frontend calling /solutions POST
              result = {
                status: "pending_frontend_registration",
                message: "Função será executada pelo frontend chamando a função de soluções."
              };
            }
            functionResults.push({ name: fc.name, args: fc.args, result });
          }

          // Send function results back to model for continuation
          const functionResponseParts = accumulatedFunctionCalls.map((fc, idx) => ({
            functionResponse: {
              name: fc.name,
              response: functionResults[idx]?.result || {},
            },
          }));

          const toolResultStream = await chatSession.sendMessageStream(functionResponseParts);
          for await (const chunk of toolResultStream) {
            if (chunk.text) {
              fullTextResponse += '\n\n' + chunk.text;
            }
          }
        }

        return new Response(JSON.stringify({
          response: fullTextResponse,
          functionCalls: accumulatedFunctionCalls.map(fc => ({ name: fc.name, args: fc.args }))
        }), { status: 200, headers });
      } catch (e) {
        console.error('Error in chat:', e);
        return new Response(JSON.stringify({ error: 'Chat processing failed', details: String(e) }), {
          status: 500,
          headers
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Unknown action or invalid endpoint' }), {
      status: 400,
      headers
    });
  } catch (error) {
    console.error('GenAI endpoint error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: String(error) }), {
      status: 500,
      headers
    });
  }
};
