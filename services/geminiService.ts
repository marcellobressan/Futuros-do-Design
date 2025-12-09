import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
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
  { functionDeclarations: [refinarDescricaoSolucaoFunc, registrarSolucaoFunc] },
];

// --- Service Logic ---

let client: GoogleGenAI | null = null;
let chatSession: any = null;

// Mock Database in memory
const solutionsDatabase: RegisteredSolution[] = [];

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

export const getSolutions = () => [...solutionsDatabase];

// Executing the "Backend" logic for the tools on the client side
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

  if (name === "registrarSolucao") {
    // Save to our in-memory array
    const newSolution: RegisteredSolution = {
      id: Math.random().toString(36).substring(7),
      ...args,
    };
    solutionsDatabase.push(newSolution);
    return {
      status: "success",
      message: "Solução registrada no banco de dados oficial.",
      id: newSolution.id,
    };
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
    let result = await chatSession.sendMessageStream({ message });

    for await (const chunk of result) {
      if (chunk.text) {
        fullTextResponse += chunk.text;
        onChunk(fullTextResponse);
      }
    }
  } catch (e: any) {
    console.error("Stream error", e);
  }
  
  // Checking for tool calls requires checking the turn.
  const history = await chatSession.getHistory();
  const lastMsg = history[history.length - 1];
  
  const toolCalls = lastMsg?.parts?.filter((p: any) => p.functionCall);
  
  if (toolCalls && toolCalls.length > 0) {
    for (const part of toolCalls) {
        const fc = part.functionCall;
        if (onFunctionCall) onFunctionCall(fc.name, fc.args);
        
        const functionResult = await executeFunction(fc.name, fc.args);
        
        // Send the result back to the model
        const toolResponse = {
            functionResponses: [
                {
                    id: fc.id, 
                    name: fc.name,
                    response: { result: functionResult }
                }
            ]
        };
        
        // Send tool response and stream the NEXT text
        const nextResult = await chatSession.sendMessageStream(toolResponse);
        
        for await (const chunk of nextResult) {
            if (chunk.text) {
                fullTextResponse += chunk.text;
                onChunk(fullTextResponse);
            }
        }
    }
  }

  return fullTextResponse;
};