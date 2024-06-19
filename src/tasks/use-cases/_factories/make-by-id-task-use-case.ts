import { PrismaTasksRepository } from "@/tasks/infra/repositories/prisma/prisma-tasks-repository";
import { FindAllTasksUseCase } from "../find-all-tasks/find-all-tasks-useCases";
import { FindByIdTaskUseCase } from "../find-by-id-task/find-by-id-task-useCases";

export function makeFindByIdTaskUseCase() {
  const tasksRepository = new PrismaTasksRepository();
  const findByIdTaskUseCase = new FindByIdTaskUseCase(tasksRepository);

  return findByIdTaskUseCase;
}
