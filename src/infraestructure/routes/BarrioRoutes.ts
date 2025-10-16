import { Router } from "express";
import { BarrioController } from "../controller/BarrioController.js";

const router = Router();
const barrioController = new BarrioController();

router.get("/buscar", (req, res) => barrioController.buscarBarrio(req, res));

export default router;
