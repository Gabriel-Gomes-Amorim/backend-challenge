import { AppError } from "@/shared/errors/AppError";
import { UsersRepository } from "@/users/infra/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";

interface AuthenticateUseCaseRequest {
  username: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user: User | null = await this.usersRepository.findByUsername(
      username
    );

    if (!user) {
      throw new AppError("Credenciais inválidas.", 401, "INVALID_CREDENTIAL");
    }

    const doestPasswordMatches = await compare(password, user.password);

    if (!doestPasswordMatches) {
      throw new AppError("Credenciais inválidas.", 401, "INVALID_CREDENTIAL");
    }

    return {
      user,
    };
  }
}
