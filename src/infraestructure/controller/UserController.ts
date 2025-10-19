import { Request, Response } from "express";
import { UserApplicationService } from "../../application/UserApplicationService.js";
// Importamos el tipo AuthRequest que extiende Request para incluir la información del usuario autenticado
import { AuthRequest } from "../web/middleware/authMiddleware.js";

// Controlador para la ruta /api/users.
export class UserController {
// Inyectamos el servicio de usuario a través del constructor
  constructor(private readonly service: UserApplicationService) {}

  // Metodo para manejar la creacion de un usuario
  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.service.createUser(req.body);
      res.status(201).json({ message: "Usuario creado correctamente", user });
    } catch (error) {
      
      res.status(400).json({
        error: error instanceof Error ? error.message : "Error al crear usuario",
      });
    }
  };
  // Metodo para manejar el login de un usuario
  loginUser = async (req: Request, res: Response) => {
        try {
            const token = await this.service.loginUser(req.body);
            if (!token) {
                return res.status(401).json({ error: "Contraseña inválidas." });
            }
            res.status(200).json({ message: "Login exitoso", token });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor." });
        }
    };
    // Metodo para manejar la obtencion de todos los usuarios
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.service.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener usuarios." });
        }
    };
    // Metodo para manejar la obtencion de un usuario por id
    getUserById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const user = await this.service.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado." });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener usuario." });
        }
    };
    // Metodo para manejar la actualizacion de un usuario
    updateUser = async (req: AuthRequest, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            // Un usuario solo puede modificarse a sí mismo
            if (req.user?.id !== id) {
                 return res.status(403).json({ error: "No tienes permiso para actualizar este usuario." });
            }
            await this.service.updateUser(id, req.body);
            res.status(200).json({ message: "Usuario actualizado correctamente." });
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Error al actualizar usuario",
            });
        }
    };
    // Metodo para manejar la eliminacion de un usuario
    deleteUser = async (req: AuthRequest, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            // Un usuario solo puede eliminarse a sí mismo
            if (req.user?.id !== id) {
                return res.status(403).json({ error: "No tienes permiso para eliminar este usuario." });
            }
            await this.service.deleteUser(id);
            res.status(204).send(); // 204 No Content
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Error al eliminar usuario",
            });
        }
    };
}
