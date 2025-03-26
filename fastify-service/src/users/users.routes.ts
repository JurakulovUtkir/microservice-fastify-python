import { FastifyInstance } from "fastify";
import { UserDto } from "./dto/create.user-dto";
import { User } from "./entities/user.entity";
import { AppDataSource } from "../data-source";

async function user_routes(fastify: FastifyInstance) {
  // getting repository from entity
  const userRepository = AppDataSource.getRepository(User);

  fastify.post("/api/users/register", async (request, reply) => {
    try {
      const { chat_id, username, fullname } = request.body as UserDto;

      // local validation
      if (!chat_id || !fullname || !username) {
        return reply.code(400).send({ error: "Missing required fields" });
      }

      const user_exists = await userRepository.findOne({ where: { chat_id } });
      if (user_exists) {
        return user_exists;
      }

      // Create new user
      const user = new User();
      user.chat_id = chat_id;
      user.username = username;
      user.fullname = fullname;

      // Save to database
      const savedUser = await userRepository.save(user);
      return savedUser;
    } catch (error) {
      reply.code(500).send({ error: "Failed to register user" });
    }
  });

  //   // Get user by chat_id
  //   fastify.get("/api/users/:chatId", async (request, reply) => {
  //     try {
  //       const { chatId } = request.params as { chatId: string };
  //       const user = await userRepository.findOne({ where: { chat_id: chatId } });

  //       if (!user) {
  //         return reply.code(404).send({ error: "User not found" });
  //       }

  //       return user;
  //     } catch (error) {
  //       reply.code(500).send({ error: "Failed to fetch user" });
  //     }
  //   });
}

export default user_routes;
