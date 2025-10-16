import jwt from 'jsonwebtoken';
import envs from '../../infraestructure/config/environment-vars.js';
// Exportamos la clase directamente, en lugar de una instancia
export class UserController {
    userService;
    // Aceptamos el servicio a través del constructor (Inyección de dependencias)
    constructor(userService) {
        this.userService = userService;
    }
    // --- Métodos del controlador ---
    createUser = async (req, res) => {
        try {
            const newUser = await this.userService.createUser(req.body);
            // Excluimos la contraseña de la respuesta por seguridad
            const userResponse = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                status: newUser.status
            };
            return res.status(201).json(userResponse);
        }
        catch (error) {
            if (error.message.includes('ya existe')) {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
        }
    };
    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await this.userService.getUserByEmail(email);
            if (user && await user.comparePassword(password)) {
                const token = jwt.sign({ id: user.id, email: user.email }, envs.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login exitoso", token });
            }
            else {
                return res.status(401).json({ error: "Credenciales inválidas." });
            }
        }
        catch (error) {
            return res.status(500).json({ error: "Error interno del servidor.", details: error.message });
        }
    };
    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
        }
    };
    getUserById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(id);
            if (user) {
                return res.status(200).json(user);
            }
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        catch (error) {
            return res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
        }
    };
    updateUser = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await this.userService.updateUser(id, req.body);
            if (success) {
                return res.status(200).json({ message: 'Usuario actualizado correctamente.' });
            }
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        catch (error) {
            if (error.message.includes('no encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
        }
    };
    deleteUser = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await this.userService.deleteUser(id);
            if (success) {
                return res.status(200).json({ message: 'Usuario eliminado correctamente.' });
            }
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        catch (error) {
            if (error.message.includes('no encontrado')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
        }
    };
}
//# sourceMappingURL=UserController.js.map