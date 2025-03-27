import { FastifyInstance } from "fastify";
import { BotAnswerDto } from "./dtos/bot.dto";
import { GeminiService } from "../services/gemini.service";

const geminiService = new GeminiService();

async function botRoutes(fastify: FastifyInstance) {
  fastify.post("/api/bot/analyse", async (request, reply) => {
    const { question, userId } = request.body as BotAnswerDto;

    if (!question || !userId) {
      return reply.code(400).send({ error: "Invalid request" });
    }

    try {
      const prompt =
        "Please analyze the following legal text and provide a simplified summary of its key points. Aim for a reading level suitable for a general audience. The text is:";
      const answer = await geminiService.generateContent(prompt, question);
      return { answer };
    } catch (error) {
      console.error("Error generating content:", error);
      return reply.code(500).send({
        error: "Failed to generate content",
      });
    }
  });

  fastify.post("/api/bot/law", async (request, reply) => {
    const { question, userId } = request.body as BotAnswerDto;

    if (!question || !userId) {
      return reply.code(400).send({ error: "Invalid request" });
    }

    try {
      const prompt = `What are the possible legal consequences of ${question}?`;
      const answer = await geminiService.generateContent(prompt, "");
      return { answer };
    } catch (error) {
      console.error("Error generating content:", error);
      return reply.code(500).send({
        error: "Failed to generate content",
      });
    }
  });
}

export default botRoutes;
