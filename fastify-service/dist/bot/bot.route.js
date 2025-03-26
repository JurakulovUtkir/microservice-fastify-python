"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gemini_service_1 = require("../services/gemini.service");
const geminiService = new gemini_service_1.GeminiService();
async function botRoutes(fastify) {
    fastify.post("/api/bot/analyse", async (request, reply) => {
        const { question, userId } = request.body;
        if (!question || !userId) {
            return reply.code(400).send({ error: "Invalid request" });
        }
        try {
            const answer = await geminiService.generateContent(question);
            return { answer };
        }
        catch (error) {
            console.error("Error generating content:", error);
            return reply.code(500).send({
                error: "Failed to generate content",
            });
        }
    });
}
exports.default = botRoutes;
