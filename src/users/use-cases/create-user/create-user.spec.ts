import { InMemoryUsersRepository } from "@/users/infra/repositories/in-memory/in-memory-user-repository";
import { compare } from "bcrypt";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateUserUseCase } from "./create-user-useCase";
import { User } from "@prisma/client";
import { AppError } from "@/shared/errors/AppError";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should to register", async () => {
    const user: User = await sut.execute({
      username: "John Doe",
      password: "@Teste123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const user: User = await sut.execute({
      username: "John Doe",
      password: "@Teste123",
    });

    const isPasswordCorrectlyHashed = await compare("@Teste123", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same username twice", async () => {
    const email = "johndoe";

    await sut.execute({
      username: "John Doe",
      password: "@Teste123",
    });

    await expect(() =>
      sut.execute({
        username: "John Doe",
        password: "@Teste123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
