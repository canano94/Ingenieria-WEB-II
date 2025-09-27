import { Users } from "../infraestructure/entities/User.js";

export interface UserPort {
    createUser(user: Omit<Users, 'id'>): Promise<number>;
    getUserById(id: number): Promise<Users | null>;
    getuserByEmail(email: string): Promise<Users | null>;
    updateUser(id: number, user: Partial<Users>): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    getallUsers(): Promise<Users[]>;
}