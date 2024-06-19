import { Task } from "@prisma/client";
import { prisma } from "@/shared/infra/prisma";
import { TasksRepository } from "../tasks-repository";

export interface FindAllOptions {
  skip?: number;
  take?: number;
}

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Task): Promise<Task> {
    const task: Task = await prisma.task.create({
      data,
    });

    return task;
  }

  async update(data: Task): Promise<Task> {
    const task: Task = await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });

    return task;
  }

  async findById(id: string): Promise<Task | null> {
    const task: Task | null = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async findAll(options?: FindAllOptions): Promise<Task[]> {
    const tasks: Task[] = await prisma.task.findMany({
      ...options,
    });

    return tasks;
  }

  async countAll(): Promise<number> {
    const totalTasks: number = await prisma.task.count();
    return totalTasks;
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
