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
      const answer = await geminiService.generateContent(question);
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
