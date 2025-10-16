// src/infraestructure/routes/UserRoutes.ts
import { Router } from "express";
import { UserRepository } from "../adapter/UserAdapter.js";
import { UserApplicationService } from "../../application/UserApplicationService.js";
import { UserController } from "../controller/UserController.js";
import { authMiddleware } from "../web/middleware/authMiddleware.js"; // Importamos el middleware

// Inyección manual de dependencias
const userRepository = new UserRepository();
const userService = new UserApplicationService(userRepository);
const userController = new UserController(userService);

const router = Router();

// --- Rutas Públicas (no requieren token) ---
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

// --- Rutas Protegidas (requieren token) ---
// El middleware se ejecuta antes de llegar al controlador.
// Si el token es válido, 'next()' permite continuar. Si no, devuelve un error 401/403.
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

export default router;