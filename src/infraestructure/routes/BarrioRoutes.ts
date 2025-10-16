// Ubicación: src/infraestructure/routes/BarrioRoutes.ts

import { Router } from "express";
import { BarrioController } from "../controller/BarrioController.js";

const router = Router();
const barrioController = new BarrioController();

// GET /api/barrios -> Obtener todos los barrios
router.get("/", (req, res) => barrioController.getAll(req, res));

// GET /api/barrios/buscar?cor_sn=X&cor_oo=Y -> búsqueda por coordenadas
router.get("/buscar", (req, res) => barrioController.buscarBarrio(req, res));

// GET /api/barrios/123 -> Obtener un barrio por su ID
router.get("/:id", (req, res) => barrioController.getById(req, res));

// POST /api/barrios -> Crear un nuevo barrio
router.post("/", (req, res) => barrioController.create(req, res));

// PUT /api/barrios/123 -> Actualizar un barrio existente
router.put("/:id", (req, res) => barrioController.update(req, res));

// DELETE /api/barrios/123 -> Eliminar un barrio
router.delete("/:id", (req, res) => barrioController.delete(req, res));

export default router;