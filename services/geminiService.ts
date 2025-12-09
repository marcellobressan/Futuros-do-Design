import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION, BASE_IMAGE_STYLE } from "../constants";
import { RegisteredSolution, UserProfile } from "../types";

// --- Function Declarations ---

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

// --- Service Logic ---

let client: GoogleGenAI | null = null;
let chatSession: any = null;

export const initializeGemini = async (apiKey: string, userProfile?: UserProfile) => {
  // Preserve history if session exists
  let previousHistory = [];
  if (chatSession) {
    try {
      previousHistory = await chatSession.getHistory();
    } catch (e) {
      console.warn("Could not retrieve previous history", e);
    }
  }

  client = new GoogleGenAI({ apiKey });
  
  let instructions = SYSTEM_INSTRUCTION;
  if (userProfile) {
    instructions += `\n\nCONTEXTO DO USUÁRIO ATUAL (LOGADO):\nNome: ${userProfile.name}\nEmail: ${userProfile.email}\nTurma: ${userProfile.turma}\n\nNota: Utilize estes dados para preencher automaticamente os campos de identificação.`;
  } else {
    instructions += `\n\nCONTEXTO DO USUÁRIO: ANÔNIMO (Não Logado). O usuário DEVE fazer login para cadastrar soluções.`;
  }

  chatSession = client.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: instructions,
      tools: tools,
    },
    history: previousHistory.length > 0 ? previousHistory : undefined
  });
};

// Now fetch from Serverless API instead of in-memory array
export const getSolutions = async (): Promise<RegisteredSolution[]> => {
  try {
    const response = await fetch('/.netlify/functions/solutions');
    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Serverless function error response:", errorBody);
        throw new Error(`Failed to fetch solutions. Status: ${response.status}`);
    }
    const data = await response.json();
    return data as RegisteredSolution[];
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return [];
  }
};

export const generateIllustration = async (prompt: string): Promise<string> => {
    if (!client) throw new Error("Gemini not initialized");

    const fullPrompt = `${BASE_IMAGE_STYLE} Descrição específica: ${prompt}`;

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            }
        });

        // The response for image generation contains the image in inlineData
        // We iterate to find it.
        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
            }
        }
        
        throw new Error("No image data found in response");
    } catch (e) {
        console.error("Error generating illustration:", e);
        throw e;
    }
}

// Executing the "Backend" logic for the tools on the client side (calls API)
const executeFunction = async (name: string, args: any): Promise<any> => {
  console.log(`[System] Executing tool: ${name}`, args);

  if (name === "refinarDescricaoSolucao") {
    // Simulate an AI refinement process or just structure the data
    const rawText = args.texto_bruto || "";
    return {
      resumo: `(Refinado) ${rawText.slice(0, 50)}...`,
      problema_que_resolve: "Identificado a partir da descrição fornecida.",
      como_funciona: "Mecanismo base extraído do relato do usuário.",
      relacao_com_os_cenarios: `Conexão direta com: ${args.cenarios_relacionados?.join(
        ", "
      )}`,
      observacoes: "Refinamento automático concluído com sucesso.",
    };
  }

  if (name === "apresentarRascunhoParaRevisao") {
    // Just pass the data through to the frontend to render the card
    return {
        status: "waiting_for_user_review",
        message: "Rascunho apresentado. Aguardando edição e confirmação do usuário.",
        data: args
    };
  }

  if (name === "registrarSolucao") {
    // Call the serverless API to save to DB
    try {
        const response = await fetch('/.netlify/functions/solutions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(args)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Serverless function error on POST:", errorBody);
            throw new Error(`Database insertion failed. Status: ${response.status}`);
        }

        const result = await response.json();
        
        return {
            status: "success",
            message: "Solução registrada no banco de dados oficial (Netlify DB/Neon).",
            id: result.id,
        };
    } catch (e) {
        console.error("DB Error", e);
        return {
            status: "error",
            message: "Falha ao registrar no banco de dados."
        };
    }
  }

  throw new Error(`Function ${name} not found`);
};

export const sendMessage = async (
  message: string,
  onChunk: (text: string) => void,
  onFunctionCall?: (name: string, args: any) => void
): Promise<string> => {
  if (!chatSession) throw new Error("Gemini not initialized");

  let fullTextResponse = "";

  try {
    const result = await chatSession.sendMessageStream({ message });

    for await (const chunk of result) {
      if (chunk.text) {
        fullTextResponse += chunk.text;
        onChunk(fullTextResponse);
      }
    }

    const history = await chatSession.getHistory();
    const lastMsg = history[history.length - 1];
    
    // NOTE: The `parts` property is not in the public types but exists on the object.
    const toolCalls: any[] = lastMsg?.parts?.filter((p: any) => p.functionCall) || [];
    
    if (toolCalls.length > 0) {
      const functionResponseParts = [];

      for (const part of toolCalls) {
        const fc = part.functionCall;
        if (onFunctionCall) onFunctionCall(fc.name, fc.args);
        
        const functionResult = await executeFunction(fc.name, fc.args);
        
        // This is the corrected structure for the function response.
        functionResponseParts.push({
          functionResponse: {
            name: fc.name,
            response: { result: functionResult },
          },
        });
      }
      
      // Send the function response back to the model and stream the new reply.
      const toolResultStream = await chatSession.sendMessageStream(functionResponseParts);
      
      for await (const chunk of toolResultStream) {
        if (chunk.text) {
          fullTextResponse += chunk.text;
          onChunk(fullTextResponse);
        }
      }
    }
  } catch (e: any) {
    console.error("sendMessage error:", e);
    onChunk(fullTextResponse + "\n\n[Ocorreu um erro. Por favor, tente novamente.]");
  }

  return fullTextResponse;
};
