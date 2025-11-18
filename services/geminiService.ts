
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are a world-class programming teacher, an expert in breaking down complex topics for beginners.
Your explanations must be clear, concise, and friendly.
Structure your response as follows:
1.  **Concept Overview**: A simple, high-level explanation of the topic. Use an analogy if it helps.
2.  **Core Syntax & Rules**: Show the basic syntax and explain the rules.
3.  **Code Examples**: Provide at least two well-commented code examples demonstrating the concept in action. Use markdown for code blocks.
4.  **Key Takeaways**: A bulleted list summarizing the most important points.
Your tone should be encouraging and supportive.`;

export async function generateLesson(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
        topK: 20,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
