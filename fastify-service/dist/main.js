"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const bot_route_1 = __importDefault(require("./bot/bot.route"));
const app = (0, fastify_1.default)({ logger: true });
app.register(cors_1.default);
app.register(bot_route_1.default);
const start = async () => {
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
