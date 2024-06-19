import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AppError } from "@/shared/errors/AppError";
import { makeAuthenticateUseCase } from "../_factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  });

  try {
    const { username, password } = authenticateBodySchema.parse(request.body);
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ username, password });

    const token: string = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    });

    return reply.status(200).send({ token });
  } catch (err) {
    if (err instanceof AppError) {
      return reply.status(err.status).send({ message: err.message });
    }

    console.error("Unexpected error:", err);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
