import { User } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: User): Promise<User> {
    const user: User = {
      ...data,
      id: randomUUID(),
    };
    this.items.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user: User | null | undefined = this.items.find(
      (item: User): boolean => item.username === username
    );
    return user !== undefined ? user : null;
  }
}
