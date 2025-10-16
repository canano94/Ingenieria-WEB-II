import { Router } from "express";
import { UserRepository } from "../adapter/UserAdapter.js";
import { UserApplicationService } from "../../application/UserApplicationService.js";
import { UserController } from "../controller/UserController.js";

// Inyección manual de dependencias
const userRepository = new UserRepository();
const userService = new UserApplicationService(userRepository);
const userController = new UserController(userService);

const router = Router();

// Solo mantenemos el registro funcionando
router.post("/register", userController.createUser);

export default router;
