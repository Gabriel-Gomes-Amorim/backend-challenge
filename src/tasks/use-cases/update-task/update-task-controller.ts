import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateTaskUseCase } from "../_factories/make-update-task-use-case";
import { Status, Task } from "@prisma/client";

export async function updateTask(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.string(),
  });

  const updateBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.nativeEnum(Status).optional(),
  });

  const { id } = updateParamsSchema.parse(request.params);
  const { title, description, status } = updateBodySchema.parse(request.body);

  const updateTaskUseCase = makeUpdateTaskUseCase();

  const task: Task = await updateTaskUseCase.execute({
    id,
    title,
    description,
    status,
  });

  return reply.status(200).send({
    task,
  });
}
