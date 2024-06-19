import { expect, describe, it, beforeEach } from "vitest";
import { Task, Status } from "@prisma/client";
import { InMemoryTasksRepository } from "@/tasks/infra/repositories/in-memory/in-memory-tasks-repository";
import { IUpdateTaskDTO } from "@/tasks/dtos/IUpdateTaskDTO";
import { AppError } from "@/shared/errors/AppError";
import { randomUUID } from "crypto";
import { UpdateTaskUseCase } from "./update-task-useCase";

let tasksRepository: InMemoryTasksRepository;
let sut: UpdateTaskUseCase;

describe("Update Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskUseCase(tasksRepository);
  });

  it("should update a task", async () => {
    const createdTask: Task = await tasksRepository.create({
      id: randomUUID(),
      title: "Task 1",
      description: "Task 1 description",
      status: Status.pending,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const updatedTaskData: IUpdateTaskDTO = {
      id: createdTask.id,
      title: "Updated Task 1",
      description: "Updated Task 1 description",
      status: Status.completed,
    };

    const updatedTask: Task = await sut.execute(updatedTaskData);

    expect(updatedTask.id).toEqual(createdTask.id);
    expect(updatedTask.title).toEqual(updatedTaskData.title);
    expect(updatedTask.description).toEqual(updatedTaskData.description);
    expect(updatedTask.status).toEqual(updatedTaskData.status);
  });

  it("should throw an error if task does not exist", async () => {
    const nonExistingId: string = randomUUID(); // Generate a random non-existing ID

    const updateTaskData: IUpdateTaskDTO = {
      id: nonExistingId,
      title: "Updated Task",
      description: "Updated Task description",
      status: Status.completed,
    };

    await expect(sut.execute(updateTaskData)).rejects.toBeInstanceOf(AppError);
  });
});
