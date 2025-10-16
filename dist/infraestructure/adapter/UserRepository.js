import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
// Esta clase es el "adaptador" que implementa la interfaz (puerto) de dominio.
// Se encarga de la comunicación directa con la base de datos usando TypeORM.
export class UserRepository {
    repository;
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    async createUser(user) {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }
    async getUserById(id) {
        return await this.repository.findOneBy({ id });
    }
    async getUserByEmail(email) {
        return await this.repository.findOneBy({ email });
    }
    async updateUser(id, user) {
        const result = await this.repository.update(id, user);
        return result.affected !== 0;
    }
    async deleteUser(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
    async getAllUsers() {
        return await this.repository.find();
    }
}
//# sourceMappingURL=UserRepository.js.map