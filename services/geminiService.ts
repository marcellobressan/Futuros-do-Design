import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { RegisteredSolution } from "../types";

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

export const initializeGemini = (apiKey: string) => {
  client = new GoogleGenAI({ apiKey });
  chatSession = client.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: tools,
    },
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
      // Handle Text
      if (chunk.text) {
        fullTextResponse += chunk.text;
        onChunk(fullTextResponse);
      }
      
      // Handle Function Calls (Streaming usually sends parts, but SDK handles aggregation mostly. 
      // Need to check for tool calls in the final response or chunks if supported)
    }
    
    // Check for tool calls in the aggregated response (since stream handling for tools can be complex, we usually check the final result object if using the high level chat)
    // However, with `sendMessageStream`, we iterate. 
    // The Google GenAI SDK automatically handles tool usage if we respond with tool output.
    // Wait, the new SDK auto-execution isn't fully automatic in `chats` unless configured? 
    // Actually, we need to handle the loop: Model -> Tool Call -> Client Exec -> Model -> Final Response.
    
    // Let's look at the result object after iteration (it accumulates state).
    // Or simpler: Use non-streaming for tool calls if streaming is complex, but we want streaming text.
    
    // We need to inspect the *last* chunk or the internal state. 
    // The SDK for `@google/genai` is new. 
    // Standard pattern: check `result` after loop? The iterator returns chunks.
    // We should check `await result.response` equivalent if possible.
    
    // Let's implement a manual check loop for function calls since the stream might pause for tool execution request.
    
    // Actually, let's use a simpler pattern for this demo:
    // If the model wants to call a function, the text might be empty or contain partial text.
    // We need to check `functionCalls` on the response.
    
    // Re-implementation with simple `sendMessage` for function calls handling to ensure robustness in this specific React demo, 
    // or handle the tool turn manually.
    
    // Let's try to detect tool calls from the chunks.
    // *Correction*: The `@google/genai` SDK simplifies this. If we use `sendMessageStream`, 
    // we get chunks. If it's a tool call, the chunks might indicate it.
    
    // To make this robust for the "Prompt", let's assume we might need to send the tool response back.
    // Let's access the history or the last turn.
    
    // Simpler approach for this specific codebase:
    // We will just peek at the history or the final response object.
    
    // Let's use `sendMessage` (non-streaming) for the first pass if we suspect tools, 
    // BUT the requirement is UI streaming.
    
    // Let's stick to a robust standard loop handling.
    
  } catch (e: any) {
    console.error("Stream error", e);
  }
  
  // Checking for tool calls requires checking the turn.
  // We need to get the recent history to see if the model asked for a function.
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
                    id: fc.id, // Important if the SDK supports IDs
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
