import { PrismaTasksRepository } from "@/tasks/infra/repositories/prisma/prisma-tasks-repository";
import { CreateTaskUseCase } from "../create-task/create-task-useCase";

export function makeCreateTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const createTaskUseCase = new CreateTaskUseCase(tasksRepository);

  return createTaskUseCase;
}
