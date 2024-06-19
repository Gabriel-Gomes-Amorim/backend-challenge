import { ICreateUserDTO } from "@/users/dtos/ICreateUserDTO";
import { User } from "@prisma/client";

export interface UsersRepository {
  create(task: ICreateUserDTO): Promise<User>;

  findByUsername(username: string): Promise<User | null>;
}
