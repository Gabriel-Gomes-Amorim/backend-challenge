import { AppError } from "@/shared/errors/AppError";
import { ICreateUserDTO } from "@/users/dtos/ICreateUserDTO";
import { UsersRepository } from "@/users/infra/repositories/users-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ username, password }: ICreateUserDTO): Promise<User> {
    const userWithSameUsername: User | null =
      await this.usersRepository.findByUsername(username);

    if (userWithSameUsername) {
      throw new AppError("Username já está cadastrado.", 400, "USER_EXISTS");
    }

    const hashedPassword: string = await bcrypt.hash(password, 8);

    const user: User = await this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return {
      ...user,
    };
  }
}
