import { PrismaTasksRepository } from "@/tasks/infra/repositories/prisma/prisma-tasks-repository";
import { UpdateTaskUseCase } from "../update-task/update-task-useCase";

export function makeUpdateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository);

  return updateTaskUseCase;
}
