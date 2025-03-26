import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import botRoutes from "./bot/bot.route";
import userRoutes from "./users/users.routes";
import { AppDataSource } from "./data-source";

const app = Fastify({ logger: true }); // for logging

// Initialize database connection
const initializeDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

app.register(cors);
app.register(botRoutes);
app.register(userRoutes);

// Health check route
app.get("/health", async () => {
  return {
    status: "ok",
    database: AppDataSource.isInitialized ? "connected" : "disconnected",
  };
});

const start = async () => {
  try {
    await initializeDb();
    await app.listen({ port: 3000, host: "0.0.0.0" }); // change host to 127.0.0.1 for local development
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
