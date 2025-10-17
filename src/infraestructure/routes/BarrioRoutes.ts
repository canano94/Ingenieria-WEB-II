import { Router } from "express";
import { BarrioController } from "../controller/BarrioController.js";

// Creamos una nueva instancia del router de Express.
// Maneja las rutas de BArrio
const router = Router();
const barrioController = new BarrioController();

// Buscar todos los barrios
router.get("/", (req, res) => barrioController.getAll(req, res));

// Buscar barrio por coordenadas
router.get("/buscar", (req, res) => barrioController.buscarBarrio(req, res));

// Buscar barrio por ID
router.get("/:id", (req, res) => barrioController.getById(req, res));

// Crear Barrio
router.post("/", (req, res) => barrioController.create(req, res));

// Actualizar un barrio por ID
router.put("/:id", (req, res) => barrioController.update(req, res));

// Borrar un barrio por ID
router.delete("/:id", (req, res) => barrioController.delete(req, res));

export default router;