import { Response } from "express";
import { FavoriteService } from "../../application/FavoriteService.js";
import { FavoriteAdapter } from "../adapter/FavoriteAdapter.js";
// Importamos el tipo AuthRequest que extiende Request para incluir la información del usuario autenticado
import { AuthRequest } from "../web/middleware/authMiddleware.js";

// Controlador para la ruta /api/favorites.
export class FavoriteController {
    private readonly favoriteService: FavoriteService;

    constructor() {
        this.favoriteService = new FavoriteService(new FavoriteAdapter());
    }
    // Metodo para manejar la creación de un favorito
    create = async (req: AuthRequest, res: Response) => {
        try {
            // Obtenemos el ID del usuario autenticado desde el request
            // Esto es posible por el middleware de autenticacion
            const userId = req.user!.id;
            const newFavorite = await this.favoriteService.createFavorite(userId, req.body);
            // Asegúrate de que el status sea 201 Created
            res.status(201).json(newFavorite);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
    // Metodo para manejar la obtención de todos los favoritos del usuario autenticado
    getAll = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const favorites = await this.favoriteService.getFavoritesByUserId(userId);
            res.status(200).json(favorites);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };
    // Metodo para manejar la eliminación de un favorito
    delete = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const favoriteId = parseInt(req.params.id);
            await this.favoriteService.deleteFavorite(userId, favoriteId);
            res.status(204).send();
        } catch (error: any) {
            // Si el error es de permisos, devolvemos 403 (Forbidden)
            if (error.message.includes("permiso")) {
                return res.status(403).json({ error: error.message });
            }
            // Para otros errores, devolvemos 404 (Not Found)
            res.status(404).json({ error: "Favorito no encontrado." });
        }
    };
}