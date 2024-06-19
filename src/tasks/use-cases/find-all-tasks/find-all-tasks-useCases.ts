import { Task } from "@prisma/client";
import { TasksRepository } from "@/tasks/infra/repositories/tasks-repository";

interface FindAllTasksParams {
  page: number;
  limit: number;
}

interface FindAllTasksResponse {
  tasks: Task[];
  totalTasks: number;
}

export class FindAllTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(params: FindAllTasksParams): Promise<FindAllTasksResponse> {
    const { page, limit } = params;
    const offset = (page - 1) * limit;

    const tasks: Task[] | null = await this.tasksRepository.findAll({
      skip: offset,
      take: limit,
    });

    const totalTasks: number = await this.tasksRepository.countAll();

    return { tasks: tasks || [], totalTasks };
  }
}
