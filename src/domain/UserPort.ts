import { User } from "../infraestructure/entities/User.js";

export interface UserPort {
    // Cambiamos el tipo de retorno a Promise<User>
    createUser(user: Omit<User, 'id'>): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>; // Corregido: getUserByEmail
    updateUser(id: number, user: Partial<User>): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    getAllUsers(): Promise<User[]>; // Corregido: getAllUsers
}
