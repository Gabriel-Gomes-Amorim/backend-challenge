import { AppError } from "@/shared/errors/AppError";
import { TasksRepository } from "@/tasks/infra/repositories/tasks-repository";
import { Task } from "@prisma/client";

interface FindByIdUseCaseRequest {
  id: string;
}

export class FindByIdTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: FindByIdUseCaseRequest): Promise<Task | null> {
    const task: Task | null = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada!", 404, "TASK_NOT_FOUND");
    }

    return {
      ...task,
    };
  }
}
