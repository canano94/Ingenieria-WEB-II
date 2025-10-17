import { User } from "../infraestructure/entities/User.js";
import type { UserPort } from "../domain/UserPort.js";

// Importa las dependencias utilizadas para la autenticación:
// bcrypt -> permite cifrar y comparar contraseñas.
// jsonwebtoken -> genera y valida tokens JWT para el manejo de sesiones.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envs from "../infraestructure/config/environment-vars.js";

// Define la estructura del DTO de respuesta para login de usuarios.
interface LoginDto {
    email: string;
    password: string;
}

// Realiza la lógica de negocio para los Favoritos.
// Utiliza el puerto (UserPort) para acceder a la capa de infraestructura 
// sin depender directamente de la implementación.
export class UserApplicationService {
  private readonly port: UserPort;
  // Constructor para inyectar la dependencia del puerto.
  constructor(port: UserPort) {
    this.port = port;
  }
  // Crea un nuevo usuario asegurando que el email no esté ya en uso.
  async createUser(user: Omit<User, "id">): Promise<User> {
    const existingUser = await this.port.getUserByEmail(user.email);
    if (existingUser) throw new Error("Este Email ya esta en uso.");
    return this.port.createUser(user);
  }
  // Obtiene un usuario por su ID.
  async getUserById(id: number): Promise<User | null> {
    return this.port.getUserById(id);
  }
  // Obtiene todos los usuarios.
  async getAllUsers(): Promise<User[]> {
    return this.port.getAllUsers();
  }
  // Actualiza un usuario asegurando que el email no esté en uso por otro usuario y cifrando la contraseña si se actualiza.
  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) throw new Error("Usuario no encontrado.");
    // Si se está actualizando el email, verificamos que no esté en uso por otro usuario.
    if (user.email) {
      const emailTaken = await this.port.getUserByEmail(user.email);
      if (emailTaken && emailTaken.id !== id)
        throw new Error("Este Email ya esta en uso.");
    }
    // Si se está actualizando la contraseña, la ciframos antes de guardarla.
    if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

    return this.port.updateUser(id, user);
  }
  // Elimina un usuario por su ID.
  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) throw new Error("Usuario no encontrado.");
    return this.port.deleteUser(id);
  }
  // Maneja el login de un usuario, verificando sus credenciales y generando un token JWT si son correctas.
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
