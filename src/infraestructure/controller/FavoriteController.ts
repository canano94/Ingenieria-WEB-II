// Ubicación: src/infraestructure/controller/FavoriteController.ts

import { Response } from "express";
import { FavoriteService } from "../../application/FavoriteService.js";
import { FavoriteAdapter } from "../adapter/FavoriteAdapter.js";
import { AuthRequest } from "../web/middleware/authMiddleware.js";

export class FavoriteController {
    private readonly favoriteService: FavoriteService;

    constructor() {
        this.favoriteService = new FavoriteService(new FavoriteAdapter());
    }

    create = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const newFavorite = await this.favoriteService.createFavorite(userId, req.body);
            // Asegúrate de que el status sea 201 Created
            res.status(201).json(newFavorite);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    getAll = async (req: AuthRequest, res: Response) => {
        try {
            const userId = req.user!.id;
            const favorites = await this.favoriteService.getFavoritesByUserId(userId);
            res.status(200).json(favorites);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

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
            res.status(404).json({ error: "Favorito no encontrado." });
        }
    };
}