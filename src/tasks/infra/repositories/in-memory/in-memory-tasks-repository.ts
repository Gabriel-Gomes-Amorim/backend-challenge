import { Task } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { TasksRepository } from "../tasks-repository";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(data: Task): Promise<Task> {
    const task: Task = {
      ...data,
      id: randomUUID(),
    };
    this.items.push(task);
    return task;
  }

  async update(data: Task): Promise<Task> {
    const index: number = this.items.findIndex(
      (task: Task): boolean => task.id === data.id
    );
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.items[index] = data;
    return data;
  }

  async findById(id: string): Promise<Task | null> {
    const task: Task | undefined = this.items.find(
      (task: Task): boolean => task.id === id
    );
    return task || null;
  }

  async findAll(): Promise<Task[]> {
    return this.items;
  }

  async countAll(): Promise<number> {
    return this.items.length;
  }

  async delete(id: string): Promise<void> {
    const index: number = this.items.findIndex((task: Task) => task.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
