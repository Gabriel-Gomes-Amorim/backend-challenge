import { Task } from "@prisma/client";
import { TasksRepository } from "@/tasks/infra/repositories/tasks-repository";
import { IUpdateTaskDTO } from "@/tasks/dtos/IUpdateTaskDTO";
import { AppError } from "@/shared/errors/AppError";

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
    title,
    description,
    status,
  }: IUpdateTaskDTO): Promise<Task> {
    const task: Task | null = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada!", 404, "TASK_NOT_FOUND");
    }

    const updatedTask: Task = await this.tasksRepository.update({
      id,
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
    });

    return updatedTask;
  }
}
