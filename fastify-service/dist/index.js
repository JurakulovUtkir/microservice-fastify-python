"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify = (0, fastify_1.default)({ logger: true });
fastify.get("/", async (request, reply) => {
    reply.type("application/json").code(200);
    return { message: "Hello, Fastify with TypeScript!" };
});
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log("Server running at http://localhost:3000");
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
