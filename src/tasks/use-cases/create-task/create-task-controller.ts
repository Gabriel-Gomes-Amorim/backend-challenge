import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateTaskUseCase } from "../_factories/make-create-task-use-case";
import { Status, Task } from "@prisma/client";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.nativeEnum(Status),
  });

  const { title, description, status } = registerBodySchema.parse(request.body);

  const createTaskUseCase = makeCreateTaskUseCase();

  const task: Task = await createTaskUseCase.execute({
    title,
    description,
    status,
  });

  return reply.status(201).send({
    task,
  });
}
