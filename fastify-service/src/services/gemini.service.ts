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

  async generateContent(prompt: string): Promise<string> {
    try {
      const my_prompt = `Acknowledge the limitations of providing legal advice and emphasize the importance of consulting with a qualified legal professional for specific situations no more than 200 words answer, please answer in uzbek :`;
      const result = await this.model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: my_prompt + prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
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
