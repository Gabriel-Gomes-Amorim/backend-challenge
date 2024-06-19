import { Status } from "@prisma/client";

export interface ICreateTaskDTO {
  title: string;
  description: string;
  status: Status;
}
