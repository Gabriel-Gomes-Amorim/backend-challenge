import { FastifyReply, FastifyRequest } from "fastify";
import { Task } from "@prisma/client";
import { makeFindByIdTaskUseCase } from "../_factories/make-by-id-task-use-case";
import { z } from "zod";

export async function findByIdTask(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const findByIdParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = findByIdParamsSchema.parse(request.params);

  const findByIdTaskUseCase = makeFindByIdTaskUseCase();

  const task: Task | null = await findByIdTaskUseCase.execute({
    id,
  });

  return reply.status(200).send({
    task,
  });
}
