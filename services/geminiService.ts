import { GoogleGenAI, Type } from "@google/genai";
import type { TarotCardDetails } from '../types';
import { API_KEY } from '../config'; // Se importa desde el nuevo config.ts

export const isApiKeyConfigured = (): boolean => {
  return API_KEY !== "TU_API_KEY_AQUI" && API_KEY !== "";
};

const ai = new GoogleGenAI({ apiKey: API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: 'Nombre de la carta de Tarot en español.' },
    description: { type: Type.STRING, description: "Un resumen simple y de un párrafo para principiantes en español." },
    story: { type: Type.STRING, description: "Una historia o alegoría atractiva que representa el viaje de la carta en español." },
    keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Una lista de palabras clave asociadas con la carta en español."
    },
    uprightMeaning: { type: Type.STRING, description: "Significado detallado cuando la carta está al derecho en español." },
    reversedMeaning: { type: Type.STRING, description: "Significado detallado cuando la carta está invertida en español." },
    quiz: {
      type: Type.ARRAY,
      description: "Un breve cuestionario de opción múltiple de 2 preguntas para evaluar la comprensión en español.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          correctAnswer: { type: Type.STRING, description: "La cadena de texto exacta de la opción correcta." }
        },
        required: ["question", "options", "correctAnswer"]
      }
    }
  },
  required: ["name", "description", "story", "keywords", "uprightMeaning", "reversedMeaning", "quiz"]
};

export const getCardDetails = async (cardName: string): Promise<TarotCardDetails> => {
    if (!isApiKeyConfigured()) {
        throw new Error("API Key no configurada. Por favor, sigue las instrucciones en la página de inicio.");
    }
    
    const prompt = `Genera una lección detallada y gamificada para la carta del Tarot: "${cardName}".`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                systemInstruction: "Eres un experto mundial en Tarot y un educador. Tus explicaciones son claras, profundas y atractivas para principiantes. Creas contenido en un formato educativo y gamificado. Responde SIEMPRE en español y SOLO con el formato JSON definido en el esquema de respuesta."
            },
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);

        if (!data.name || !data.quiz || data.quiz.length === 0) {
            throw new Error("Invalid data structure received from API");
        }

        return data as TarotCardDetails;
    } catch (error) {
        console.error(`Error fetching details for ${cardName}:`, error);
        throw new Error("Failed to generate card content from AI service.");
    }
};
