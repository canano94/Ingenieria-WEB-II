import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UserApplicationService {
    port;
    constructor(port) {
        this.port = port;
    }
    async createUser(user) {
        const existingUser = await this.port.getUserByEmail(user.email);
        if (existingUser)
            throw new Error('Un usuario con este email ya existe.');
        return this.port.createUser(user);
    }
    async getUserById(id) {
        return this.port.getUserById(id);
    }
    async getUserByEmail(email) {
        return this.port.getUserByEmail(email);
    }
    async getAllUsers() {
        return this.port.getAllUsers();
    }
    async updateUser(id, user) {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser)
            throw new Error('Usuario no encontrado.');
        if (user.email) {
            const emailTaken = await this.port.getUserByEmail(user.email);
            if (emailTaken && emailTaken.id !== id)
                throw new Error('El email ya está en uso.');
        }
        return this.port.updateUser(id, user);
    }
    async deleteUser(id) {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser)
            throw new Error('Usuario no encontrado.');
        return this.port.deleteUser(id);
    }
    /**
     * Inicia sesión verificando las credenciales del usuario
     */
    async login(email, password) {
        // 1️⃣ Verificar si el usuario existe
        const user = await this.port.getUserByEmail(email);
        if (!user)
            throw new Error("Usuario no encontrado.");
        // 2️⃣ Verificar si la contraseña coincide
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new Error("Contraseña incorrecta.");
        // 3️⃣ Generar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secreto_temporal", { expiresIn: "1h" });
        return { message: "Login exitoso", token };
    }
}
//# sourceMappingURL=UserApplicationService.js.map