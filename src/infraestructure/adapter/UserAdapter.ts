import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import type { UserPort } from '../../domain/UserPort.js';
import { Repository } from 'typeorm';

// Esta clase es el "adaptador" que implementa la interfaz (puerto) de dominio.
// Se encarga de la comunicación directa con la base de datos usando TypeORM.
export class UserRepository implements UserPort {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }

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
