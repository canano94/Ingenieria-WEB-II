import { Router } from 'express';
import { UserRepository } from '../adapter/UserRepository.js';
import { UserApplicationService } from '../../application/UserApplicationService.js';
import { UserController } from '../controller/UserController.js';
import { authMiddleware } from '../web/middleware/authMiddleware.js';
// Inyección manual de dependencias
const userRepository = new UserRepository();
const userService = new UserApplicationService(userRepository);
const userController = new UserController(userService);
const router = Router();
// Rutas públicas
router.post('/register', userController.createUser);
router.post('/login', userController.login);
// Rutas protegidas con middleware
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
export default router;
//# sourceMappingURL=user.routes.js.map