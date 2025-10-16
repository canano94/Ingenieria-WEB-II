import { User } from "../infraestructure/entities/User.js";
import type { UserPort } from "../domain/UserPort.js";

export class UserApplicationService {
  private readonly port: UserPort;

  constructor(port: UserPort) {
    this.port = port;
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const existingUser = await this.port.getUserByEmail(user.email);
    if (existingUser) throw new Error("Un usuario con este email ya existe.");
    return this.port.createUser(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.port.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.port.getAllUsers();
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) throw new Error("Usuario no encontrado.");

    if (user.email) {
      const emailTaken = await this.port.getUserByEmail(user.email);
      if (emailTaken && emailTaken.id !== id)
        throw new Error("El email ya está en uso.");
    }

    return this.port.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) throw new Error("Usuario no encontrado.");
    return this.port.deleteUser(id);
  }
}
