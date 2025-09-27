import type { UserPort } from "../domain/UserPort.js";
import type { Users } from "../domain/User.js";


export class UsserApplicationService {
    private port: UserPort;

    constructor(port: UserPort) {
        this.port = port;
    }
    async createUser(Users: Omit<Users, 'id'>): Promise<number> {
        const existingUser = await this.port.getuserByEmail(Users.email);
        if (!existingUser) {
            return this.port.createUser(Users);
        }   
        throw new Error('User with this email already exists'); 
    }
    async getuserById(id: number): Promise<Users | null> {
        return await this.port.getUserById(id);
    }
    async getuserByEmail(email: string): Promise<Users | null> {
        return await this.port.getuserByEmail(email);
    }
    async getallUsers(): Promise<Users[]> {
        return await this.port.getallUsers();
    }
    async updateUser(id: number, user: Partial<Users>): Promise<boolean> {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        if (user.email) {
            const emailTaken = await this.port.getuserByEmail(user.email);
            if (emailTaken && emailTaken.id !== id) {
                throw new Error('Email is already in use by another user');
            }

    }
    return await this.port.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<boolean> {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }   
        return await this.port.deleteUser(id);
    }
}