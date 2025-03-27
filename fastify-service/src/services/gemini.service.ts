import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment.");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });
  }

  async generateContent(prompt: string, question: string): Promise<string> {
    try {
      const result = await this.model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt + question }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.1,
        },
      });
      return result.response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate content from Gemini API");
    }
  }
}
