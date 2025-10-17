import { User } from "../infraestructure/entities/User.js";

//Puerto del dominio para la gestión de usuarios.
//Define la estructura que deben implementar los adaptadores de infraestructura
//para permitir las operaciones CRUD sobre la entidad Usuario.
 //Este puerto aísla la lógica de negocio del acceso a datos.

export interface UserPort {
    // Operaciones CRUD para la entidad Usuario
    createUser(user: Omit<User, 'id'>): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>; // Corregido: getUserByEmail
    updateUser(id: number, user: Partial<User>): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    getAllUsers(): Promise<User[]>; // Corregido: getAllUsers
}
