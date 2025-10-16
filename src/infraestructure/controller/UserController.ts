import { Request, Response } from "express";
import { UserApplicationService } from "../../application/UserApplicationService.js";
import { AuthRequest } from "../web/middleware/authMiddleware.js";

export class UserController {
  constructor(private readonly service: UserApplicationService) {}

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

  loginUser = async (req: Request, res: Response) => {
        try {
            const token = await this.service.loginUser(req.body);
            if (!token) {
                return res.status(401).json({ error: "Credenciales inválidas." });
            }
            res.status(200).json({ message: "Login exitoso", token });
        } catch (error) {
            res.status(500).json({ error: "Error interno del servidor." });
        }
    };

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.service.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener usuarios." });
        }
    };

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

    updateUser = async (req: AuthRequest, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            // Opcional: un usuario solo puede modificarse a sí mismo
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

    deleteUser = async (req: AuthRequest, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            // Opcional: un usuario solo puede eliminarse a sí mismo
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
