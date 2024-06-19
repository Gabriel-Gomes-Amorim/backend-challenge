import { Task } from "@prisma/client";
import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { IUpdateTaskDTO } from "../../dtos/IUpdateTaskDTO";
import { FindAllOptions } from "./prisma/prisma-tasks-repository";

export interface TasksRepository {
  create(task: ICreateTaskDTO): Promise<Task>;

  update(task: IUpdateTaskDTO): Promise<Task>;

  findById(id: string): Promise<Task | null>;

  findAll(options?: FindAllOptions): Promise<Task[]>;

  countAll(): Promise<number>;

  delete(id: string): Promise<void>;
}
