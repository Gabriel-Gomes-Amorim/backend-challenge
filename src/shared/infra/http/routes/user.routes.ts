import { authenticate } from "@/auth/use-cases/authenticate/authenticateController";
import { register } from "@/users/use-cases/create-user/create-user-controller";
import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);
}
