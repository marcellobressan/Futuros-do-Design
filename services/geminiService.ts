import { RegisteredSolution, UserProfile } from "../types";

// Client-side service that proxies to server-side Netlify Function
// The Gemini API key is stored server-side in GEMINI_API_KEY env var

let chatHistory: any[] = [];
let userProfileContext: UserProfile | undefined;

export const initializeGemini = async (apiKey: string, userProfile?: UserProfile) => {
  // This function is called from App.tsx but no longer uses the apiKey on the client
  // Just store the user profile for context in chat messages
  userProfileContext = userProfile;
  chatHistory = [];
  console.log("Gemini initialized (server-side via Netlify Function)");
};

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
    try {
        const response = await fetch('/.netlify/functions/genai?action=generateImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Image generation error:", errorBody);
            throw new Error(`Image generation failed. Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.imageUrl) {
            return data.imageUrl;
        }

        throw new Error("No image URL in response");
    } catch (e) {
        console.error("Error generating illustration:", e);
        throw e;
    }
}

export const sendMessage = async (
  message: string,
  onChunk: (text: string) => void,
  onFunctionCall?: (name: string, args: any) => void
): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/genai?action=chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            userProfile: userProfileContext,
            chatHistory: chatHistory
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Chat error response:", errorBody);
        throw new Error(`Chat failed. Status: ${response.status}`);
    }

    const data = await response.json();
    const fullResponse = data.response || "";

    // Call onChunk to update UI
    onChunk(fullResponse);

    // Process function calls from the response
    if (data.functionCalls && Array.isArray(data.functionCalls)) {
        for (const fc of data.functionCalls) {
            if (onFunctionCall) {
                onFunctionCall(fc.name, fc.args);
            }
        }
    }

    // Add to chat history for context
    chatHistory.push({ role: "user", parts: [{ text: message }] });
    chatHistory.push({ role: "model", parts: [{ text: fullResponse }] });

    return fullResponse;
  } catch (e: any) {
    console.error("sendMessage error:", e);
    const errorMessage = e instanceof Error ? e.message : String(e);
    const errorResp = `[Ocorreu um erro: ${errorMessage}. Por favor, tente novamente.]`;
    onChunk(errorResp);
    throw e;
  }
};