import { register } from "@/tasks/use-cases/create-task/create-task-controller";
import { deleteTask } from "@/tasks/use-cases/delete-task/delete-task-controller";
import { findAllTasks } from "@/tasks/use-cases/find-all-tasks/find-all-tasks-controller";
import { findByIdTask } from "@/tasks/use-cases/find-by-id-task/find-by-id-task-controller";
import { updateTask } from "@/tasks/use-cases/update-task/update-task-controller";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verify-jwt";

export async function tasksRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/tasks", register);
  app.get("/tasks/:id", findByIdTask);
  app.get("/tasks", findAllTasks);
  app.put("/tasks/:id", updateTask);
  app.delete("/tasks/:id", deleteTask);
}
