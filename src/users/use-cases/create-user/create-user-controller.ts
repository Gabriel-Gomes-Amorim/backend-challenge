import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "../_factories/make-create-user-use-case";
import { User } from "@prisma/client";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = registerBodySchema.parse(request.body);

  const cretaeUserUseCase = makeCreateUserUseCase();

  const user: User = await cretaeUserUseCase.execute({
    username,
    password,
  });

  return reply.status(201).send({
    message: "Usuário registrado com sucesso",
  });
}
