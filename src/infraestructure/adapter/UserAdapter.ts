import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import type { UserPort } from '../../domain/UserPort.js';
import { Repository } from 'typeorm';

// Este adaptador se encarga de hablar con la tabla 'users'.
// Es la implementación real de las reglas definidas en UserPort.
export class UserRepository implements UserPort {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        // .create() prepara el objeto, .save() lo manda a la base de datos.
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }
    // .findOneBy() es la forma más directa de buscar por un campo.
    async getUserById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }
    // .update() y .delete() son más rápidos para estas tareas porque
    // no necesitan traer toda la info del usuario a la aplicación primero.
    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        const result = await this.repository.update(id, user);
        return result.affected !== 0;
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.repository.find();
    }
}
