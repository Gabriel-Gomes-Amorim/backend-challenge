import { Status } from "@prisma/client";

export interface IUpdateTaskDTO {
  id: string;
  title?: string;
  description?: string;
  status?: Status;
}
