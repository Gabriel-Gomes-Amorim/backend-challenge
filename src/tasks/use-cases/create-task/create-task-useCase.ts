import { Task } from "@prisma/client";
import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { TasksRepository } from "@/tasks/infra/repositories/tasks-repository";

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ title, description, status }: ICreateTaskDTO): Promise<Task> {
    const task: Task = await this.tasksRepository.create({
      title,
      description,
      status,
    });

    return {
      ...task,
    };
  }
}
