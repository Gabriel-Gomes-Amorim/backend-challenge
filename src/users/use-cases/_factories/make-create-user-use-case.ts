import { PrismaUsersRepository } from "@/users/infra/repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../create-user/create-user-useCase";

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
