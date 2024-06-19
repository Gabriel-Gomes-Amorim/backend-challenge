import { Prisma, User } from "@prisma/client";
import { prisma } from "@/shared/infra/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user: User | null = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }
}
