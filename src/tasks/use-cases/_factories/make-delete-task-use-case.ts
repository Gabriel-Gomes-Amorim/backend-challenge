import { PrismaTasksRepository } from "@/tasks/infra/repositories/prisma/prisma-tasks-repository";
import { DeleteTaskUseCase } from "../delete-task/delete-task-useCases";

export function makeDeleteTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);

  return deleteTaskUseCase;
}
