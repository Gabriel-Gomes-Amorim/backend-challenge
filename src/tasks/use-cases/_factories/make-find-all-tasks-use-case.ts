import { PrismaTasksRepository } from "@/tasks/infra/repositories/prisma/prisma-tasks-repository";
import { FindAllTasksUseCase } from "../find-all-tasks/find-all-tasks-useCases";

export function makeFindAllTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const findAllTasksUseCase = new FindAllTasksUseCase(tasksRepository);

  return findAllTasksUseCase;
}
