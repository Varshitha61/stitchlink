import { GoogleGenAI, Type } from "@google/genai";
import { Design } from "../types";

// Helper to initialize the client safely
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getDesignRecommendations = async (
  query: string,
  availableDesigns: Design[]
): Promise<string[]> => {
  const ai = getClient();
  if (!ai) {
    console.warn("Gemini API Key missing. Returning fallback.");
    // Fallback: Random designs if no API key
    return availableDesigns.slice(0, 3).map(d => d.id);
  }

  const designsContext = availableDesigns.map(d => ({
    id: d.id,
    title: d.title,
    description: d.description,
    tags: d.tags.join(", "),
    category: d.category
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        You are an intelligent assistant for an embroidery shop called 'StitchLink'.
        
        The user is looking for a design. 
        User Query: "${query}"

        Here is our catalog of designs:
        ${JSON.stringify(designsContext)}

        Analyze the user's request and match it to the most relevant designs from the catalog.
        Consider the style, tags, description, and category.
        
        Return the result as a JSON object containing an array of 'recommendedIds'.
        Select up to 3 best matches.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                recommendedIds: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        }
      }
    });

    const result = JSON.parse(response.text);
    return result.recommendedIds || [];

  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
};
