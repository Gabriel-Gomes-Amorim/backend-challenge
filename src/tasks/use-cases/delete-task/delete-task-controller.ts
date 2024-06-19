import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteTaskUseCase } from "../_factories/make-delete-task-use-case";

export async function deleteTask(request: FastifyRequest, reply: FastifyReply) {
  const deleteTaskParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteTaskParamsSchema.parse(request.params);

  const deleteTaskUseCase = makeDeleteTaskUseCase();

  await deleteTaskUseCase.execute({
    id,
  });

  return reply.status(201).send({
    message: "Tarefa deletada com sucesso",
  });
}
