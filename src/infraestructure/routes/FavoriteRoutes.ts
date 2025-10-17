import { Router } from "express";
import { FavoriteController } from "../controller/FavoriteController.js";
// Middleware para proteger las rutas con usuario autenticado
import { authMiddleware } from "../web/middleware/authMiddleware.js";

const router = Router();
const favoriteController = new FavoriteController();

// TODAS las rutas de favoritos requieren que el usuario esté autenticado.
// Por eso, aplicamos el middleware a todas.
// Si el usuario no tiene un token válido, el middleware lo detiene y no lo deja pasar al controlador.
router.use(authMiddleware);

// Crear un nuevo favorito con usuario autenticado
router.post("/", favoriteController.create);

// Obtener todos los favoritos del usuario autenticado
router.get("/", favoriteController.getAll);

// Borrar un favorito por ID para el usuario autenticado
router.delete("/:id", favoriteController.delete);

export default router;