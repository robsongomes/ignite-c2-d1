import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userAlreadyExists = this.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User();
    Object.assign(user, {
      name: name,
      email: email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new Error("User not found");

    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    if (userIndex < 0) throw new Error("User not found");

    this.users[userIndex] = {
      ...this.users[userIndex],
      admin: true,
      updated_at: new Date(),
    };

    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
