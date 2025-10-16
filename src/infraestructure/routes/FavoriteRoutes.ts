// Ubicación: src/infraestructure/routes/FavoriteRoutes.ts

import { Router } from "express";
import { FavoriteController } from "../controller/FavoriteController.js";
import { authMiddleware } from "../web/middleware/authMiddleware.js";

const router = Router();
const favoriteController = new FavoriteController();

// TODAS las rutas de favoritos requieren que el usuario esté autenticado.
// Por eso, aplicamos el middleware a todas.
router.use(authMiddleware);

// POST /api/favorites -> Crear un nuevo favorito
router.post("/", favoriteController.create);

// GET /api/favorites -> Ver MIS favoritos
router.get("/", favoriteController.getAll);

// DELETE /api/favorites/123 -> Borrar uno de MIS favoritos
router.delete("/:id", favoriteController.delete);

export default router;