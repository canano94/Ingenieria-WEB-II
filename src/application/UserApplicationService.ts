import { User } from "../infraestructure/entities/User.js";
import type { UserPort } from "../domain/UserPort.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envs from "../infraestructure/config/environment-vars.js";

interface LoginDto {
    email: string;
    password: string;
}

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

    if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

    return this.port.updateUser(id, user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) throw new Error("Usuario no encontrado.");
    return this.port.deleteUser(id);
  }

  async loginUser(loginData: LoginDto): Promise<string | null> {
        const user = await this.port.getUserByEmail(loginData.email);
        if (!user) {
            return null; // Usuario no encontrado
        }

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            return null; // Contraseña incorrecta
        }

        // Si el usuario y la contraseña son correctos, generamos el token
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, envs.JWT_SECRET, {
            expiresIn: '1h' // El token expira en 1 hora
        });

        return token;
    }


}
