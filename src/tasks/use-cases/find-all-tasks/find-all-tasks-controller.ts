import { FastifyReply, FastifyRequest } from "fastify";
import { Task } from "@prisma/client";
import { makeFindAllTaskUseCase } from "../_factories/make-find-all-tasks-use-case";

interface QueryParams {
  page?: number;
  limit?: number;
}
export async function findAllTasks(
  request: FastifyRequest<{ Querystring: QueryParams }>,
  reply: FastifyReply
) {
  const { page = 1, limit = 10 } = request.query;

  const findAllTasksUseCase = makeFindAllTaskUseCase();

  const { tasks, totalTasks } = await findAllTasksUseCase.execute({
    page: Number(page),
    limit: Number(limit),
  });

  const totalPages = Math.ceil(totalTasks / limit);

  return reply.status(200).send({
    tasks,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPages,
      totalTasks,
    },
  });
}
