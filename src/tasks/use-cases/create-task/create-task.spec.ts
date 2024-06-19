import { expect, describe, it, beforeEach } from "vitest";
import { Task } from "@prisma/client";
import { InMemoryTasksRepository } from "@/tasks/infra/repositories/in-memory/in-memory-tasks-repository";
import { CreateTaskUseCase } from "./create-task-useCase";

let tasksRepository: InMemoryTasksRepository;
let sut: CreateTaskUseCase;

describe("Create Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CreateTaskUseCase(tasksRepository);
  });

  it("should to register", async () => {
    const task: Task = await sut.execute({
      title: "study programming",
      description: "Study programming",
      status: "in_progress",
    });

    expect(task.id).toEqual(expect.any(String));
  });
});
