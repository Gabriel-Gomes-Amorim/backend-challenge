import { PrismaUsersRepository } from "@/users/infra/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate/authenticateUseCase";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
