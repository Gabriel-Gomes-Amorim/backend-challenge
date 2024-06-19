import { expect, describe, it, beforeEach } from "vitest";
import { Task } from "@prisma/client";
import { InMemoryTasksRepository } from "@/tasks/infra/repositories/in-memory/in-memory-tasks-repository";
import { FindByIdTaskUseCase } from "./find-by-id-task-useCases";
import { randomUUID } from "crypto";

let taskRepository: InMemoryTasksRepository;
let sut: FindByIdTaskUseCase;

describe("Find By Id Task Use Case", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTasksRepository();
    sut = new FindByIdTaskUseCase(taskRepository);
  });

  it("should be able to find task profile by ID", async () => {
    const createdTask: Task = await taskRepository.create({
      id: randomUUID(),
      title: "study programming",
      description: "Study programming",
      status: "in_progress",
      created_at: new Date(),
      updated_at: new Date(),
    });

    const task: Task | null = await sut.execute({ id: createdTask.id });

    if (task) {
      expect(task.title).toEqual("study programming");
    } else {
      throw new Error("Task not found");
    }
  });
});
