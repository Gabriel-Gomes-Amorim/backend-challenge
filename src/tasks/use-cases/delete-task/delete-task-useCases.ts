import { AppError } from "@/shared/errors/AppError";
import { TasksRepository } from "@/tasks/infra/repositories/tasks-repository";
import { Task } from "@prisma/client";

interface DeleteTaskUseCaseRequest {
  id: string;
}

export class DeleteTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskUseCaseRequest): Promise<void> {
    const task: Task | null = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada!", 404, "TASK_NOT_FOUND");
    }

    await this.tasksRepository.delete(id);
  }
}
